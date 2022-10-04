import React, { useEffect, useState } from "react";
import { ethers } from "ethers"
import { Buffer } from 'buffer';
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Clock from "./Clock";
import { carouselNew } from "./constants";

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
`;

const ItemsOnLiveAuction = ({ auction, nft }) => {

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

                if (date > Date.now()) {
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
        }
        setLoading(false)
        setItems(items)
    }

    const makeABid = async (item) => {

        console.log(item.price)
        if (bidPrice < ethers.utils.formatEther(item.price)) {
            console.log('low price')
            return
        }
        if (item.duration < Date.now()) {
            console.log("date")
            return
        }

        await auction.bid(nft.address, item.itemId, { value: ethers.utils.parseEther(bidPrice.toString()) })
        setLoading(true)
        loadMarketplaceItems()
    }

    useEffect(() => {

        loadMarketplaceItems()
    }, []);



    if (loading) return (
        <main style={{ padding: "1rem 0" }}>
            <h2 style={{ marginTop: '120px', marginBottom: '120px' }}>Loading...</h2>
        </main>
    )

    return (
        <div className="nft">
            <Slider {...carouselNew}>
                {items &&
                    items.map((nft, idx) => (

                        <div className="itm" key={idx} >
                            <div className="d-item">
                                <div className="nft__item">
                                    {nft.duration && (
                                        <div className="de_countdown">
                                            <Clock deadline={nft.duration} />
                                        </div>
                                    )}

                                    <br />
                                    <br />
                                    <div
                                        className="nft__item_wrap"
                                        style={{ height: '10rem' }}
                                    >
                                        <Outer>
                                            <span>
                                                <img
                                                    src={"data:image/png;base64," + nft.image}
                                                    className="lazy nft__item_preview"

                                                    alt=""
                                                />
                                            </span>
                                        </Outer>
                                    </div>
                                    <div className="nft__item_info">
                                        <div className="d-flex" >
                                            <span >
                                                <h4>{nft.name}</h4>
                                            </span>
                                            <div className="nft__item_like pt-3" style={{ float: "right", marginLeft: "auto" }}>
                                                <i style={{ color: "red" }} className="fa fa-heart"></i><span>50</span>
                                            </div>
                                        </div>
                                        <div className="d-flex bid">
                                            <div className="nft__item_price">
                                                {ethers.utils.formatEther(nft.price)} ETH
                                                <span>
                                                    /{ethers.utils.formatEther(nft.maxBid)}
                                                </span>
                                            </div>
                                            <div className="nft__item_action mb-3">
                                                <span>
                                                    <input style={{ borderRadius: '5px', margin: '2px', maxWidth: '6rem' }} onChange={(e) => setBidPrice(e.target.value)} type="number" placeholder='make a bid' />

                                                </span>
                                                <br />
                                                <span
                                                    onClick={() => makeABid(nft)}
                                                    className="bidd"
                                                >
                                                    Place bid
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    ))}
            </Slider>
        </div>
    );
};

export default ItemsOnLiveAuction;
