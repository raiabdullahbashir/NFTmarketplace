import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import ColumnNewRedux from "../components/ColumnNewRedux";
import * as selectors from '../../store/selectors';
import { fetchHotCollections } from "../../store/actions/thunks";
import api from "../../core/api";

import NFT from '../../core/nft/nft.json'
import Marketplace from '../../core/nft/marketplace.json'
import Auction from '../../core/nft/auction.json'
import { ethers } from "ethers"
import MyListedItems from "../components/myListedItems";
import ItemsOnSell from '../components/ItemsOnSell';
import ItemsOnAuction from '../components/ItemsOnAuction';

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: #fff;
  }
  @media only screen and (max-width: 1199px) {
    .navbar{
      background: #403f83;
    }
    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
      background: #111;
    }
    .item-dropdown .dropdown a{
      color: #111 !important;
    }
  }
`;

const Colection = function ({ collectionId = 1 }) {
  const [openMenu, setOpenMenu] = React.useState(true);
  const [openMenu1, setOpenMenu1] = React.useState(false);

  const [account, setAccount] = useState(null)
  const [nftCon, setNFT] = useState({})
  const [marketplace, setMarketplace] = useState({})
  const [auction, setAuction] = useState({})
  const [loading, setLoading] = useState(true)
  const [data, setdata] = useState({
    address: "sample",
    Balance: null,
  });
  

  const handleBtnClick = () => {
    setOpenMenu(!openMenu);
    setOpenMenu1(false);
    document.getElementById("Mainbtn").classList.add("active");
    document.getElementById("Mainbtn1").classList.remove("active");
  };
  const handleBtnClick1 = () => {
    setOpenMenu1(!openMenu1);
    setOpenMenu(false);
    document.getElementById("Mainbtn1").classList.add("active");
    document.getElementById("Mainbtn").classList.remove("active");
  };

  const dispatch = useDispatch();
  const hotCollectionsState = useSelector(selectors.hotCollectionsState);
  const hotCollections = hotCollectionsState.data ? hotCollectionsState.data[0] : {};

  const web3Handler = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0])
      // Get provider from Metamask
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      // Set signer
      const signer = provider.getSigner()

      window.ethereum.on('chainChanged', (chainId) => {
        window.location.reload();
      })

      window.ethereum.on('accountsChanged', async function (accounts) {
        setAccount(accounts[0])
        await web3Handler()
      })
      loadContracts(signer)
    } else {
      console.log("metamask error")
    }
  }
  const loadContracts = async (signer) => {
    // Get deployed copies of contracts
    const marketplace = new ethers.Contract("0x7A87e841b2F4CBD9E1FFe03e151a9E322232801C", Marketplace.abi, signer)
    setMarketplace(marketplace)
    const nft = new ethers.Contract("0xf704Ad28D2f3C164DE96A1013D8EA5a666d9B498", NFT.abi, signer)
    setNFT(nft)
    const auction = new ethers.Contract("0xDA82Dc03617111e0b95A42cA0796B87A597eb780", Auction.abi, signer)
    setAuction(auction);
    setLoading(false);
    console.log(marketplace);
  }

  const btnhandler = () => {
    // Asking if metamask is already present or not
    if (window.ethereum) {
  
    // res[0] for fetching a first wallet
    window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then((res) => accountChangeHandler(res[0]));
    } else {
    alert("install metamask extension!!");
    }
  };
  // Function for getting handling all events
const accountChangeHandler = (account) => {
	// Setting an address data
	setdata({
	address: account,
	});
	// Setting a balance
	getbalance(account);
};
const getbalance = (address) => {

	// Requesting balance method
	window.ethereum
	.request({
		method: "eth_getBalance",
		params: [address, "latest"]
	})
	.then((balance) => {
		// Setting balance
		//console.log(balance)
		setdata({
			address: address,
			Balance: ethers.utils.formatEther(balance),
		});
	});
};



  useEffect(() => {
    dispatch(fetchHotCollections(collectionId));
    web3Handler();
    btnhandler();

  }, [dispatch, collectionId]);

  if (loading) return (
    <main style={{ padding: "1rem 0", textAlign: 'center' }}>
      <h2 style={{ marginTop: '120px', marginBottom: '120px' }}>Loading...</h2>
    </main>
  )

  return (
    <div>
      <GlobalStyles />
      {hotCollections.author && hotCollections.author.banner &&
        <section id='profile_banner' className='jumbotron breadcumb no-bg' style={{ backgroundImage: `url(${api.baseUrl + hotCollections.author.banner.url})` }}>
          <div className='mainbreadcumb'>
          </div>
        </section>
      }

      <section className='container d_coll no-top no-bottom'>
        <div className='row'>
          <div className="col-md-12">
            <div className="d_profile">
              <div className="profile_avatar">
                {hotCollections.author && hotCollections.author.avatar &&
                  <div className="d_profile_img">
                    <img src={api.baseUrl + hotCollections.author.avatar.url} alt="" />
                    <i className="fa fa-check"></i>
                  </div>
                }
                <div className="profile_name">
                  <h4>
                    {hotCollections.name}
                    <div className="clearfix"></div>
                    {hotCollections.author && hotCollections.author.wallet &&
                      <span id="wallet" className="profile_wallet">{account}</span>
                    }
                    <button id="btn_copy" title="Copy Text">Copy</button><br/>
                    <span id="wallet" className="profile_wallet"> {data.Balance}</span>
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='container no-top'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className="items_filter">
              <ul className="de_nav">
                <li id='Mainbtn' className="active"><span onClick={handleBtnClick}>On Sale</span></li>
                <li id='Mainbtn1' className=""><span onClick={handleBtnClick1}>Owned</span></li>
              </ul>
            </div>
          </div>
        </div>
        {openMenu && (
          <div id='zero1' className='onStep fadeIn'>
            <ItemsOnAuction auction={auction} nft={nftCon} />
            <ItemsOnSell marketplace={marketplace} nft={nftCon} />

            {/* <ColumnNewRedux shuffle showLoadMore={false} authorId={hotCollections.author ? hotCollections.author.id : 1} /> */}
          </div>
        )}
        {openMenu1 && (
          <div id='zero2' className='onStep fadeIn'>
            <MyListedItems marketplace={marketplace} nftCon={nftCon} account={account} />

            {/* <ColumnNewRedux shuffle showLoadMore={false} /> */}
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}
export default Colection;