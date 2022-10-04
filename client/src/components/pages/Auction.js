import React, { useEffect, useState } from 'react';
import ColumnAuctionRedux from '../components/ColumnAuctionRedux';
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import { ethers } from "ethers"
import NFT from '../../core/nft/nft.json'
import Auction from '../../core/nft/auction.json'
import ItemsOnAuction from '../components/ItemsOnAuction';
const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.sticky.white {
    background: #403f83;
    border-bottom: solid 1px #403f83;
  }
  header#myHeader.navbar .search #quick_search{
    color: #fff;
    background: rgba(255, 255, 255, .1);
  }
  header#myHeader.navbar.white .btn, .navbar.white a, .navbar.sticky.white a{
    color: #fff;
  }
  header#myHeader .dropdown-toggle::after{
    color: rgba(255, 255, 255, .5);;
  }
  header#myHeader .logo .d-block{
    display: none !important;
  }
  header#myHeader .logo .d-none{
    display: block !important;
  }
  @media only screen and (max-width: 1199px) {
    .navbar{
      background: #403f83;
    }
    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
      background: #fff;
    }
    .item-dropdown .dropdown a{
      color: #fff !important;
    }
  }
`;




function Explore() {
  const [account, setAccount] = useState(null)
  const [nft, setNFT] = useState({})
  const [auction, setMarketplace] = useState({})
  const [loading, setLoading] = useState(true)

  const web3Handler = async () => {
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
    //console.log(account)
    loadContracts(signer)
    //console.log(signer)
  }
  const loadContracts = async (signer) => {
    // Get deployed copies of contracts  //9236b6B9c44D2b226Dd82Fc82eF53AEEf094AcbF
    const auction = new ethers.Contract("0xDA82Dc03617111e0b95A42cA0796B87A597eb780", Auction.abi, signer)
    setMarketplace(auction)
    const nft = new ethers.Contract("0xf704Ad28D2f3C164DE96A1013D8EA5a666d9B498", NFT.abi, signer)
    setNFT(nft)
    // console.log(auction)
    setLoading(false);
  }

  useEffect(() => {
    web3Handler()
  }, []);
  
  if (loading) return (
    <main style={{ padding: "1rem 0", textAlign: 'center' }}>
      <h2 style={{ marginTop: '120px', marginBottom: '120px' }}>Loading...</h2>
    </main>
  )

  return (
    <div>
      <GlobalStyles />
      <section className='jumbotron breadcumb no-bg' style={{ backgroundImage: `url(${'./img/background/subheader.jpg'})` }}>
        <div className='mainbreadcumb'>
          <div className='container'>
            <div className='row m-10-hor'>
              <div className='col-12'>
                <h1 className='text-center'>Live Auction</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='container'>
        <ItemsOnAuction auction={auction} nft={nft} />
      </section>

      <section className='container'>
        <ColumnAuctionRedux />
      </section>


      <Footer />
    </div>

  );
}
export default Explore;