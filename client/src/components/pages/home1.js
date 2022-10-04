import React, { useState, useEffect } from 'react';
import Particle from '../components/Particle';
import SliderMainParticle from '../components/SliderMainParticle';
import FeatureBox from '../components/FeatureBox';
import CarouselCollectionRedux from '../components/CarouselCollectionRedux';
import ItemsOnSell from '../components/ItemsOnSell';
import AuthorListRedux from '../components/AuthorListRedux';
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import { ethers } from "ethers"
import NFT from '../../core/nft/nft.json'
import Marketplace from '../../core/nft/marketplace.json'

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
    color: #fff;
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


const Homeone = () => {

  const [account, setAccount] = useState(null)
  const [nft, setNFT] = useState({})
  const [marketplace, setMarketplace] = useState({})
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
    console.log(signer)
  }
  const loadContracts = async (signer) => {
    // Get deployed copies of contracts
    const marketplace = new ethers.Contract("0x7A87e841b2F4CBD9E1FFe03e151a9E322232801C", Marketplace.abi, signer)
    setMarketplace(marketplace)
    const nft = new ethers.Contract("0xf704Ad28D2f3C164DE96A1013D8EA5a666d9B498", NFT.abi, signer)
    setNFT(nft)
    console.log(marketplace)
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
      <section className="jumbotron no-bg" style={{ backgroundImage: `url(${'./img/background/2.jpg'})` }}>
        <Particle />
        <SliderMainParticle />
      </section>

      <section className='container'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='text-center'>
              <h2>Popular Items</h2>

              <div className="small-border"></div>
            </div>
          </div>
        </div>

        <ItemsOnSell marketplace={marketplace} nft={nft} />


      </section>

      <section className='container-fluid bg-gray'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='text-center'>
              <h2>Hot Collections</h2>
              <div className="small-border"></div>
            </div>
          </div>
        </div>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12'>
              <CarouselCollectionRedux />
            </div>
          </div>
        </div>
      </section>

      <section className='container'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='text-center'>
              <h2>Top Sellers</h2>
              <div className="small-border"></div>
            </div>
          </div>
          <div className='col-lg-12'>
            <AuthorListRedux />
          </div>
        </div>
      </section>

      <section className='container-fluid bg-gray'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='text-center'>
              <h2>Create and sell your NFTs</h2>
              <div className="small-border"></div>
            </div>
          </div>
        </div>
        <div className='container'>
          <FeatureBox />
        </div>
      </section>

      <Footer />

    </div>
  );
}
export default Homeone;