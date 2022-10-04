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
const MyListedItems = ({ marketplace, nftCon, account }) => {

  const [loading, setLoading] = useState(true)
  const [listedItems, setListedItems] = useState([])


  const loadListedItems = async () => {
    // Load all sold items that the user listed
    const itemCount = await marketplace.itemCount()
    let listedItems = []
    for (let indx = 1; indx <= itemCount; indx++) {
      const i = await marketplace.items(indx)
      if (i.seller.toLowerCase() === account) {
        // get uri url from nft contract
        const uri = await nftCon.tokenURI(i.tokenId)
        // use uri to fetch the nft metadata stored on ipfs 
        const response = await fetch(uri)
        const metadata = await response.json()
        // get total price of item (item price + fee)
        const totalPrice = await marketplace.getTotalPrice(i.itemId)
        // define listed item object
        const img = new Buffer.from(metadata.image.buffer).toString("base64")
        let item = {
          totalPrice,
          price: i.price,
          itemId: i.itemId,
          name: metadata.name,
          description: metadata.description,
          image: img
        }
        listedItems.push(item)
      }
    }
    setLoading(false)
    setListedItems(listedItems)
  }

  useEffect(() => {

    loadListedItems()
  }, []);
  if (loading) return (
    <main style={{ padding: "1rem 0" }}>
      <h2 style={{ marginTop: '120px', marginBottom: '120px' }}>Loading...</h2>
    </main>
  )

  return (
    <div className='row'>
      {listedItems.length > 0 ?
        <>
          {listedItems.map((item, idx) => (
            <div key={idx} className='d-item col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4'>
              <div className="nft__item m-0">
                <div className="nft__item_wrap" style={{ height: '18rem' }}>
                  <Outer>
                    <span>
                      <img style={{ maxHeight: '14rem' }} src={"data:image/png;base64," + item.image} className="lazy nft__item_preview" alt="" />
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
        : (<div style={{ padding: "1rem 0" }}>
          <h2 style={{ marginTop: '120px', marginBottom: '120px' }}>No listed assets</h2>
        </div>)

      }

    </div>
  );
};

export default MyListedItems;