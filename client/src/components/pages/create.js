import Clock from "../components/Clock";
import React, { useEffect, useState, useCallback } from "react";
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
} from "../../core/nft/interact";
import { Buffer } from "buffer";
import { createGlobalStyle } from "styled-components";
import ColumnNewMint from "../components/ColumnNewMint";
import api from "../../core/api";
import Footer from "../components/footer";
import NFT from "../../core/nft/nft.json";
import Marketplace from "../../core/nft/marketplace.json";
import Auction from "../../core/nft/auction.json";
import { ethers } from "ethers";
import fetch from "node-fetch";
import axios from "axios";
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
    color: rgba(255, 255, 255, .5);
  }
  header#myHeader .logo .d-block{
    display: none !important;
  }
  header#myHeader .logo .d-none{
    display: block !important;
  }
  .mainside{
    .connect-wal{
      display: none;
    }
    .logout{
      display: flex;
      align-items: center;
    }
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

const Create = (props) => {
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");

  const [url, setURL] = useState("");
  const [nftPrice, setnftPrice] = useState("");

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [buffer, setBuffer] = useState(null);

  const [isMinting, setisMinting] = useState(false);

  const [account, setAccount] = useState(null);
  const [nftCon, setNFT] = useState({});
  const [marketplace, setMarketplace] = useState({});
  const [auction, setAuction] = useState({});

  const [select, setSelect] = useState(1);
  const [minBid, setMinBid] = useState(0);
  const [expDate, setExpDate] = useState(null);

  const [previewImg, setPreviewImg] = useState(null);
  const [duration, setDuration] = useState(0);

  const web3Handler = async () => {
    if (window.ethereum) {
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
      loadContracts(signer);
    } else {
      console.log("metamask error");
    }
  };
  const loadContracts = async (signer) => {
    // Get deployed copies of contracts
    const marketplace = new ethers.Contract(
      "0x7A87e841b2F4CBD9E1FFe03e151a9E322232801C",
      Marketplace.abi,
      signer
    );
    setMarketplace(marketplace);
    const nft = new ethers.Contract(
      "0xf704Ad28D2f3C164DE96A1013D8EA5a666d9B498",
      NFT.abi,
      signer
    );
    setNFT(nft);
    const auction = new ethers.Contract(
      "0xDA82Dc03617111e0b95A42cA0796B87A597eb780",
      Auction.abi,
      signer
    );
    setAuction(auction);
  };

  useEffect(() => {
    async function getExistingWallet() {
      const { address, status } = await getCurrentWalletConnected();

      setWallet(address);
      setStatus(status);

      addWalletListener();
      web3Handler();
    }

    getExistingWallet();
  }, []);

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("");
        } else {
          setWallet("");
          setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://metamask.io/download.html`}
          >
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };

  const onMintPressed = async () => {
    console.log("buffer1");
    if (image === "" || name.trim() === "" || description.trim() === "") {
      return;
    } else {
      const reader = new window.FileReader();
      reader.readAsArrayBuffer(image);
      reader.onloadend = () => {
        setBuffer({ buffer: Buffer(reader.result) });
        console.log("buffer: ", buffer);
      };
      if (buffer === null) {
        console.log("null");

        return;
      }
      setisMinting(true);
      console.log("image: " + image);

      const formData = new FormData();
      formData.append("title", name);
      formData.append("description", description);
      formData.append("price", nftPrice);
      formData.append("nftImage", image);
      axios
        .post("http://localhost:2190/nft/createNft", formData, {})
        .then((response) => console.log(response));

      const { success, status } = await mintNFT(
        buffer,
        name,
        description,
        nftPrice,
        minBid,
        expDate,
        nftCon,
        marketplace,
        auction,
        select
      );
      setStatus(status);
      if (success) {
        setName("");
        setDescription("");
        setURL("");
      }
      setisMinting(false);
    }
  };

  const previewItem = async () => {
    if (image === "") {
      return;
    } else {
      const reader = new window.FileReader();
      reader.readAsArrayBuffer(image);
      reader.onloadend = () => {
        setBuffer({ buffer: Buffer(reader.result) });
      };
      if (buffer === null) {
        return;
      }

      const img = new Buffer.from(buffer.buffer).toString("base64");
      setPreviewImg(img);

      var time = new Date(expDate).getTime() / 1000;
      var dur = new Date(time * 1000);
      setDuration(dur);
    }
  };

  const isEmpty = useCallback(() => {
    return name.trim() === "" || description.trim() === "";
  }, [url, name, description]);

  const handleShow = () => {
    setSelect(1);
    document.getElementById("tab_opt_1").classList.add("show");
    document.getElementById("tab_opt_1").classList.remove("hide");
    document.getElementById("tab_opt_2").classList.remove("show");
    document.getElementById("btn1").classList.add("active");
    document.getElementById("btn2").classList.remove("active");
  };
  const handleShow1 = () => {
    setSelect(2);
    document.getElementById("tab_opt_1").classList.add("hide");
    document.getElementById("tab_opt_1").classList.remove("show");
    document.getElementById("tab_opt_2").classList.add("show");
    document.getElementById("btn1").classList.remove("active");
    document.getElementById("btn2").classList.add("active");
  };

  return (
    <div>
      <GlobalStyles />
      <section
        className="jumbotron breadcumb no-bg"
        style={{ backgroundImage: `url(${"./img/background/subheader.jpg"})` }}
      >
        <div className="mainbreadcumb">
          <div className="container">
            <div className="row m-10-hor">
              <div className="col-12">
                <h1 className="text-center">Create</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      {walletAddress.length === 0 && (
        <p>connect to metamask to start minting</p>
      )}
      {isMinting ? (
        <h2>Minting in Process</h2>
      ) : (
        <section className="container">
          <div className="row">
            <div className="col-lg-7 offset-lg-1 mb-5">
              <form id="form-create-item" className="form-border" action="#">
                <div className="field-set">
                  <h5>Upload file</h5>
                  <div className="d-create-file">
                    <p id="file_name">PNG, JPG, GIF, WEBP or MP4. Max 200mb.</p>
                    {image.name}
                    <div className="browse">
                      <input
                        type="button"
                        id="get_file"
                        className="btn-main"
                        value="Browse"
                      />
                      <input
                        id="upload_file"
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                        required
                      />
                    </div>
                  </div>
                  <div className="spacer-single"></div>

                  <h5>Select method</h5>
                  <div className="de_tab tab_methods">
                    <ul className="de_nav">
                      <li id="btn1" className="active" onClick={handleShow}>
                        <span>
                          <i className="fa fa-tag"></i>Fixed price
                        </span>
                      </li>
                      <li id="btn2" onClick={handleShow1}>
                        <span>
                          <i className="fa fa-hourglass-1"></i>Timed auction
                        </span>
                      </li>
                    </ul>
                    <div className="de_tab_content pt-3">
                      <div id="tab_opt_1">
                        <h5>Price</h5>
                        <input
                          type="text"
                          name="item_price"
                          id="item_price"
                          onChange={(e) => setnftPrice(e.target.value)}
                          className="form-control"
                          placeholder="enter price for one item (ETH)"
                        />
                      </div>
                      <div id="tab_opt_2" className="hide">
                        <h5>Minimum bid</h5>
                        <input
                          type="text"
                          name="item_price_bid"
                          id="item_price_bid"
                          onChange={(e) => setMinBid(e.target.value)}
                          className="form-control"
                          placeholder="enter minimum bid"
                        />

                        <div className="spacer-20"></div>

                        <div className="row">
                          <div className="col-md-6">
                            <h5>Expiration date</h5>
                            <input
                              type="date"
                              name="bid_expiration_date"
                              onChange={(e) => setExpDate(e.target.value)}
                              id="bid_expiration_date"
                              className="form-control"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="spacer-single"></div>
                  <h5>Title</h5>
                  <input
                    type="text"
                    name="item_title"
                    id="item_title"
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    placeholder="e.g. 'Crypto Funk"
                  />
                  <div className="spacer-10"></div>
                  <h5>Description</h5>
                  <textarea
                    data-autoresize
                    name="item_desc"
                    id="item_desc"
                    onChange={(e) => setDescription(e.target.value)}
                    className="form-control"
                    placeholder="e.g. 'This is very limited item'"
                  ></textarea>
                  <div className="spacer-10"></div>
                  {select == 1 && (
                    <input
                      type="button"
                      id="submit"
                      onClick={onMintPressed}
                      className="btn-main"
                      value="Create and Mint Item"
                    />
                  )}
                  {select == 2 && (
                    <input
                      type="button"
                      id="submit"
                      onClick={onMintPressed}
                      className="btn-main"
                      value="Create and Auction Item"
                    />
                  )}
                </div>
              </form>
            </div>
            <div className="col-lg-3 col-sm-6 col-xs-12">
              <button
                onClick={previewItem}
                style={{ border: "none", background: "none" }}
              >
                {" "}
                <h5>Preview item</h5>{" "}
              </button>
              <div className="nft__item m-0">
                <div className="de_countdown">
                  <Clock deadline={duration} />
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
                      src={"data:image/png;base64," + previewImg}
                      id="get_file_2"
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </span>
                </div>
                <div className="nft__item_info">
                  <span>
                    <h4>{name}</h4>
                  </span>
                  <div className="nft__item_price">
                    {nftPrice} ETH<span> / {minBid}</span>
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
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default Create;
