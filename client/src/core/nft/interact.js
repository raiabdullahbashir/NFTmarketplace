import { pinJSONToIPFS } from "./pinata.js";
import { ethers } from 'ethers'
require("dotenv").config();

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const obj = {
        status: "Metamask successfuly connected.",
        address: addressArray[0],
      };
      return obj;
    } catch (err) {
      return {
        address: "",
        status: "Something went wrong: " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a target="_blank" rel="noreferrer" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "",
        };
      } else {
        return {
          address: "",
          status: "🦊 Connect to Metamask using the top right button.",
        };
      }
    } catch (err) {
      return {
        address: "",
        status: "Something went wrong: " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a target="_blank" rel="noreferrer" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const mintNFT = async (url, name, description, price, minBid, duration, nft, marketplace, auction, select) => {
  if (url === "" || name.trim() === "" || description.trim() === "") {
    return {
      success: false,
      status: "Please make sure all fields are completed before minting.",
    };
  }

  const metadata = {};
  metadata.name = name;
  metadata.image = url;
  metadata.description = description;

  const pinataResponse = await pinJSONToIPFS(metadata);
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "Something went wrong while uploading your tokenURI.",
    };
  }
  const tokenURI = pinataResponse.pinataUrl;
  console.log(tokenURI)

  const link = await nft.mint(tokenURI)

  if (select === 1) {
    nft.setApprovalForAll(marketplace.address, true)
    const id = await nft.tokenCount()
    // add nft to marketplace
    const listingPrice = ethers.utils.parseEther(price.toString())
    marketplace.makeItem(nft.address, id, listingPrice)

  } else {
    nft.setApprovalForAll(auction.address, true)
    const id = await nft.tokenCount()
    // add nft to marketplace
    const listingPrice = ethers.utils.parseEther(minBid.toString())
    duration = (new Date(duration).getTime()) / 1000;
    auction.createTokenAuction(nft.address, id, listingPrice, duration)

  }


  return {
    success: true,
    status:
      "Check out your transaction on Etherscan: https://testnet.bscscan.com/tx/" +
      link.hash,
  };

};
