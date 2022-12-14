import React, { useState, useEffect } from "react";
import SliderMain from "../components/SliderMain";
import CarouselCollectionRedux from "../components/CarouselCollectionRedux";
import CarouselNewRedux from "../components/CarouselNewRedux";
import AuthorListRedux from "../components/AuthorListRedux";
import Footer from "../components/footer";
import { ethers } from "ethers";
import NFT from "../../core/nft/nft.json";
import Auction from "../../core/nft/auction.json";
import ItemsOnLiveAuction from "../components/ItemsOnLiveAuction";
import { Modal, Button } from "react-bootstrap";
import Clock from "../components/Clock";
import axios from "axios";
import photo from "../uploads/Screenshot (3).png";
const Home = () => {
  const [account, setAccount] = useState(null);
  const [nft, setNFT] = useState({});
  const [auction, setMarketplace] = useState({});
  const [loading, setLoading] = useState(true);

  const [showModal, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [nftData, setNftData] = useState(null);
  const web3Handler = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);
    // Get provider from Metamask
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // Set signer
    const signer = provider.getSigner();

    window.ethereum.on("chainChanged", (chainId) => {
      window.location.reload();
    });

    window.ethereum.on("accountsChanged", async function (accounts) {
      setAccount(accounts[0]);
      await web3Handler();
    });
    //console.log(account)
    loadContracts(signer);
    //console.log(signer)
  };
  const loadContracts = async (signer) => {
    // Get deployed copies of contracts  //9236b6B9c44D2b226Dd82Fc82eF53AEEf094AcbF
    const auction = new ethers.Contract(
      "0xDA82Dc03617111e0b95A42cA0796B87A597eb780",
      Auction.abi,
      signer
    );
    setMarketplace(auction);
    const nft = new ethers.Contract(
      "0xf704Ad28D2f3C164DE96A1013D8EA5a666d9B498",
      NFT.abi,
      signer
    );
    setNFT(nft);
    // console.log(auction)
    setLoading(false);
  };
  const getNft_Data = async () => {
    const results = await axios.get(`http://localhost:2190/nft/getNft`);
    // console.log(results.data);
    setNftData(results.data);
  };
  useEffect(() => {
    // getNft_Data();
    web3Handler();
  }, []);
  if (loading)
    return (
      <main style={{ padding: "1rem 0", textAlign: "center" }}>
        <h2 style={{ marginTop: "120px", marginBottom: "120px" }}>
          Loading...
        </h2>
      </main>
    );
  const handleClick = (event) => {
    alert("Your file is being uploaded!");
  };
  return (
    <>
      <div>
        {/* <section className="jumbotron breadcumb no-bg h-vh" style={{backgroundImage: `url(${'./img/bg-shape-1.jpg'})`}}>
         <SliderMain/>
      </section> */}
        <section className="jumbotron breadcumb no-bg h-vh landingcolor">
          <SliderMain />
        </section>
        <br />
        <br />
        <br />

        {/* <section className='container no-top no-bottom'>
        <FeatureBox/>
      </section> */}
        <section className="container no-bottom">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-start hdbr">
                <h2>LIVE AUCTION</h2>
              </div>
            </div>
            <div className="col-lg-12">
              <ItemsOnLiveAuction auction={auction} nft={nft} />
              <CarouselNewRedux />
            </div>

            <div className="row" style={{ marginRight: "0px" }}>
              <div className="col-lg-3 md-3 sm-2 text-center mb-3">
                <div className="stepbox cardh">
                  <h2 className="step text-center">Step 1</h2>
                  <div className=" demo-icon-wrap">
                    <i
                      className="fa fa-fw"
                      aria-hidden="true"
                      title="Copy to use user-plus"
                    >
                      ???
                    </i>

                    <span className="text-grey">[&amp;#xf234;]</span>
                    <br />
                    <br />
                    <h6>CREATE AND ACCOUNT</h6>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 md-3 sm-2 text-center mb-3">
                <div className="stepbox cardh">
                  <h2 className="step text-center ">Step 2</h2>
                  <div className="demo-icon-wrap">
                    <i
                      className="fa fa-fw"
                      aria-hidden="true"
                      title="Copy to use upload"
                    >
                      ???
                    </i>

                    <span className="text-grey">[&amp;#xf093;]</span>
                    <br />
                    <br />
                    <h6>UPLOAD YOUR FAVORITE CAR PHOTOS</h6>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 md-3 sm-2 text-center mb-3">
                <div className="stepbox cardh">
                  <h2 className="step text-center ">Step 3</h2>
                  <div className="demo-icon-wrap">
                    <i
                      className="fa fa-fw"
                      aria-hidden="true"
                      title="Copy to use check-square-o"
                    >
                      ???
                    </i>

                    <span className="text-grey">[&amp;#xf046;]</span>
                    <br />
                    <br />
                    <h6>PICK YOUR STYLE</h6>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-3 md-3 sm-2 text-center mb-3"
                style={{ marginRight: "0px" }}
              >
                {nftData ? (
                  <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div className="nft__item m-0">
                        <div className="de_countdown">
                          <Clock deadline={1} />
                        </div>
                        <div className="author_list_pp">
                          <span>
                            <img
                              className="lazy"
                              src="./img/author/author-1.jpg"
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </span>
                        </div>
                        <div className="nft__item_wrap">
                          <span>
                            <img
                              style={{ height: "12rem" }}
                              src={"../uploads/" + nftData[0].nftImage}
                              id="get_file_2"
                              className="lazy nft__item_preview"
                              alt="hn"
                            />
                          </span>
                        </div>
                        <div className="nft__item_info">
                          <span>
                            <h4>{nftData[0].title}</h4>
                          </span>
                          <div className="nft__item_price">
                            {nftData[0].price} ETH
                            <span> / </span>
                          </div>
                          <div className="nft__item_action">
                            <span>Place a bid</span>
                          </div>
                          <div className="nft__item_like">
                            <i className="fa fa-heart"></i>
                            <span>0</span>
                          </div>
                        </div>
                      </div>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                      <Button variant="primary" onClick={handleClose}>
                        Save Changes
                      </Button>
                    </Modal.Footer>
                  </Modal>
                ) : null}
                <div className="stepbox cardh" onClick={handleShow}>
                  <h2 className="step text-center ">Step 4</h2>
                  <div className=" demo-icon-wrap">
                    <i
                      className="fa fa-fw"
                      aria-hidden="true"
                      title="Copy to use file"
                    >
                      ???
                    </i>
                    <span className="text-grey">[&amp;#xf15b;]</span>
                    <br />
                    <br />
                    <h6>APPROVE YOUR ORIGNAL VINTAGE CAR POTRATE</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container no-bottom">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-start hdbr">
                <h2>POPULAR COLLECTION</h2>
                {/* <div className="small-border"></div> */}
              </div>
            </div>
            <div className="col-lg-12">
              <CarouselCollectionRedux />
            </div>
          </div>
        </section>

        <section className="container no-bottom">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-start hdbr">
                <h2>TOP SELLERS</h2>
                {/* <div className="small-border"></div> */}
              </div>
            </div>
            <div className="col-lg-12">
              <AuthorListRedux />
            </div>
          </div>
        </section>

        {/* <section className='container'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='text-center'>
              <h2>Browse by category</h2>
              <div className="small-border"></div>
            </div>
          </div>
        </div>
        <Catgor/>
      </section> */}

        <Footer />
      </div>
    </>
  );
};
export default Home;

// fa-upload
// fa-user-plus
// fa-check-square-o
// fa-file-text-o
