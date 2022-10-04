import React, { memo } from "react";
import Gray from "../../../src/img/Gray.jpg";

const CustomSlide = ({
  index,
  avatar,
  banner,
  username,
  uniqueId,
  collectionId,
}) => {
  return (
    <div className="itm" index={index}>
      <div className="nft_coll">
        <div className="d-flex bnri">
          <div className="nft_coll_pp bnrii">
            <span
              onClick={() => window.open("/colection/" + collectionId, "_self")}
            >
              <img className="lazy" src={avatar} alt="" />
              {/* <i className="fa fa-check"></i> */}
            </span>
          </div>
          <div className="nft_coll_info bnrtxt">
            <span
              onClick={() => window.open("/colection/" + collectionId, "_self")}
            >
              <h4>{username}</h4>
            </span>
            <span>{uniqueId}</span>
          </div>
        </div>
        <div className="nft_wrap">
          <span>
            <img src={Gray} className="lazy img-fluid bnr" alt="" />
            {/* <img src={banner} className="lazy img-fluid" alt="" /> */}
          </span>
        </div>
      </div>
    </div>
  );
};

export default memo(CustomSlide);
