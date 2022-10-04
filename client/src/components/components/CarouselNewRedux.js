import React, { memo, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Clock from "./Clock";
import { carouselNew } from "./constants";
import * as selectors from "../../store/selectors";
import { fetchNftsBreakdown } from "../../store/actions/thunks";
import api from "../../core/api";
import Red3 from "../../../src/img/Red3.jpg";

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
`;

const CarouselNewRedux = () => {
  const dispatch = useDispatch();
  const nftsState = useSelector(selectors.nftBreakdownState);
  //console.log(nftsState)
  const nfts = nftsState.data ? nftsState.data : [];

  const [height, setHeight] = useState(0);

  const onImgLoad = ({ target: img }) => {
    let currentHeight = height;
    if (currentHeight < img.offsetHeight) {
      setHeight(img.offsetHeight);
    }
  };

  useEffect(() => {
    dispatch(fetchNftsBreakdown());
  }, [dispatch]);

  return (
    <div className="nft">
      <Slider {...carouselNew}>
        {nfts &&
          nfts.map((nft, index) => (
            <div className="itm" index={index + 1} key={index}>
              <div className="d-item">
                <div className="nft__item">
                  {nft.deadline && (
                    <div className="de_countdown">
                      <Clock deadline={nft.deadline} />
                    </div>
                  )}
                  <div className="author_list_pp">
                    <span onClick={() => window.open("/home1", "_self")}>
                      <img
                        className="lazy"
                        src={api.baseUrl + nft.author.avatar.url}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </span>
                  </div>
                  <br />
                  <br />
                  <div
                    className="nft__item_wrap"
                    style={{ height: `${height}px` }}
                  >
                    <Outer>
                      <span>
                        <img
                          src={Red3}
                          className="lazy nft__item_preview"
                          onLoad={onImgLoad}
                          alt=""
                        />
                      </span>
                      {/* <span>
                            <img src={api.baseUrl + nft.preview_image.url} className="lazy nft__item_preview" onLoad={onImgLoad} alt=""/>
                        </span> */}
                    </Outer>
                  </div>
                  <div className="nft__item_info">
                    <div className="d-flex" >

                    <span onClick={() => window.open("/#", "_self")}>
                      <h4>Vintage Ferrari</h4>
                    </span>
                    <div className="nft__item_like pt-3" style={{float:"right",marginLeft:"auto"}}>
                            <i style={{color:"red"}} className="fa fa-heart"></i><span>{nft.likes}</span>
                        </div> 
                    </div>
                    <div className="d-flex bid">
                      <div className="nft__item_price">
                        {nft.price} ETH
                        <span>
                          {nft.bid}/{nft.max_bid}
                        </span>
                      </div>
                      <div className="nft__item_action mb-3">
                        <span
                          onClick={() => window.open(nft.bid_link, "_self")}
                          className="bidd"
                        >
                          Place bid
                        </span>
                      </div>
                    </div>
                    {/* <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>{nft.likes}</span>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </Slider>
    </div>
  );
};

export default memo(CarouselNewRedux);
