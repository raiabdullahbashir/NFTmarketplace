import React, {  useEffect, useState } from 'react';
import { ethers } from "ethers"
import { Buffer } from 'buffer';
import styled from "styled-components";
import Clock from "./Clock";
import { navigate } from '@reach/router';
const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 8px;
`;
//react functional component
const ItemsOnAuction = ({ auction, nft }) => {

    const navigateTo = (link) => {
        navigate(link);
    }


    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [bidPrice, setBidPrice] = useState(0);

    const loadMarketplaceItems = async () => {
        // Load all unsold items
        const itemCount = await auction.itemCount()
        let items = []
        for (let i = 1; i <= itemCount; i++) {
            const item = await auction.items(i)

            const aucitem = await auction.getTokenAuctionDetails(item.nft, item.tokenID)
           

            if (aucitem.isActive) {
                // get uri url from nft contract
                const uri = await nft.tokenURI(item.tokenID)
                //console.log(item.tokenID)
                // // use uri to fetch the nft metadata stored on ipfs 
                const response = await fetch(uri)
                const metadata = await response.json()
                
                // // Add item to items array
                const img = new Buffer.from(metadata.image.buffer).toString("base64")
                let unix_timestamp = aucitem.duration;
                var date = new Date(unix_timestamp * 1000);
                
                items.push({
                    price: aucitem.price,
                    maxBid: aucitem.maxBid,
                    itemId: item.tokenID,
                    seller: aucitem.seller,
                    name: metadata.name,
                    description: metadata.description,
                    image: img,
                    duration: date
                })

            }
        }
        setLoading(false)
        setItems(items)
    }

    const makeABid = async(item)=>{

        console.log(item.price)
        if(bidPrice< ethers.utils.formatEther(item.price) ){
           console.log('low price')
            return
        }
        if( item.duration < Date.now() ){
            console.log("date")
           
            return
        }
       
     
        await auction.bid(nft.address,item.itemId,{value: ethers.utils.parseEther(bidPrice.toString())})
        setLoading(true) 
        loadMarketplaceItems()
    }
    const executeSale = async(item)=>{
        await auction.executeSale(nft.address,item.itemId)
        loadMarketplaceItems()

    }


    //will run when component unmounted
    useEffect(() => {
        
        loadMarketplaceItems()
    }, []);
    if (loading) return (
        <main style={{ padding: "1rem 0" }}>
            <h2 style={{ marginTop: '120px', marginBottom: '120px' }}>Loading...</h2>
        </main>
    )




    return (
        <div className='row'>
            {items.length > 0 ?
                <>
                    {items.map((item, idx) => (
                        <div key={idx} className='d-item col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4'>
                            <div className="nft__item m-0">

                                <div className="nft__item_wrap" style={{ height: '16rem' }}>
                                    <Outer>
                                        <span>
                                            <img src={"data:image/png;base64," + item.image} className="lazy nft__item_preview" alt="" />
                                        
                                        </span>
                                    </Outer>
                                </div>
                                {item.duration &&
                                    <div className="de_countdown">
                                        <Clock deadline={item.duration} />
                                    </div>
                                }

                                <div className="nft__item_info">
                                    <span >
                                        <h4>{item.name}</h4>
                                    </span>
                                    {
                                        <div className="nft__item_price">
                                            {ethers.utils.formatEther(item.price)} ETH
                                            {
                                                <span>/ {ethers.utils.formatEther(item.maxBid)}ETH</span>
                                                
                                            }
                                        </div>
                                    }
                                   {
                                    item.duration > Date.now() ? 
                                     <div className="nft__item_action">
                                    
                                    
                                     {
                                        <input onChange={(e) => setBidPrice(e.target.value)} type="number" placeholder='make a bid'/>
                                        
                                     }
                                      <br/>
                                      {
                                       
                                        <span onClick={() => makeABid(item)}>{  'Place a bid' }</span>
                                     }
                                         
                                     </div>
                                     : <div><span onClick={() => executeSale(item)}>{  'Sale Nft' }</span></div>
                                   }

                                    <div className="nft__item_like">
                                        <i className="fa fa-heart"></i><span>50</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </>
                : (<div></div>)

            }

        </div>
    );
};

export default ItemsOnAuction;