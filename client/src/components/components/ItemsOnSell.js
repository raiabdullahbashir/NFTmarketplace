import React, { memo, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as selectors from '../../store/selectors';
import * as actions from '../../store/actions/thunks';
import { clearNfts, clearFilter } from '../../store/actions';
import NftCard from './NftCard';
import { shuffleArray } from '../../store/utils';
import { ethers } from "ethers"
import { Buffer } from 'buffer';
import styled from "styled-components";

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 8px;
`;
//react functional component
const ItemsOnSell = ({ marketplace, nft }) => {

  // const dispatch = useDispatch();
  // const nftItems = useSelector(selectors.nftItems);
  // const [height, setHeight] = useState(0);

  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const loadMarketplaceItems = async () => {
    // Load all unsold items
    const itemCount = await marketplace.itemCount()
    
    let items = []
    for (let i = 1; i <= itemCount; i++) {
      const item = await marketplace.items(i)
     console.log(item.tokenId) 
      if (!item.sold) {
        // get uri url from nft contract
        const uri = await nft.tokenURI(item.tokenId)
        // use uri to fetch the nft metadata stored on ipfs 
        const response = await fetch(uri)
        const metadata = await response.json()
        // get total price of item (item price + fee)
        const totalPrice = await marketplace.getTotalPrice(item.itemId)
        // Add item to items array
        const img = new Buffer.from(metadata.image.buffer).toString("base64")
        items.push({
          totalPrice,
          itemId: item.itemId,
          seller: item.seller,
          name: metadata.name,
          description: metadata.description,
          image: img
        })
      }
    }

    setItems(items)
    setLoading(false)
  }

  const buyMarketItem = async (item) => {
    await (await marketplace.purchaseItem(item.itemId, { value: item.totalPrice })).wait()
    loadMarketplaceItems()
  }

  useEffect(() => {

    loadMarketplaceItems()
  },[] );
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
                      <img style={{maxHeight: '14rem'}} src={"data:image/png;base64," + item.image} className="lazy nft__item_preview" alt="" />
                    </span>
                  </Outer>
                </div>

                <div className="nft__item_info">
                  <span >
                    <h4>{item.name}</h4>
                  </span>
                  {
                    <div className="nft__item_price">
                      {ethers.utils.formatEther(item.totalPrice)} ETH
                      <span onClick={()=> buyMarketItem(item) }>Buy</span>

                    </div>

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

export default ItemsOnSell;