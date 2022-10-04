import React from "react";
import { Link } from "@reach/router";
import Logo1 from "../../../src/img/Logo1.png";

const footer = () => (
  <footer className="footer-light mb-5">
    <div className="container">
      <div className="row">
        <div className="col-md-3 col-sm-6 col-xs-1">
          <div className="widget">
            <div className="row">
              <div className="col-4 text-center">
                <img className="fimg" src={Logo1} alt="" />
              </div>
              <div className="col-8">
                <br />
                <h5>EXOTIC AUTO NFT</h5>
                <p className="small padr">
                  EXOTIC OFFERS ANYONE WHO OWNS A CLASSIC CAR A
                  PERSONALIZED ASSET OF ORIGNAL PAINTING BUILD BY THE
                  CUSTOMER TO MEMORIALIZE YOUR PRIZED INVESTMENT.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-2 col-sm-4 col-xs-1">
          <div className="widget padl">
            <h4 className="pb-1">My Account</h4>
            <ul>
              <li className="py-1">
                <Link to="">All NFTs</Link>
              </li>
              <li className="py-1">
                <Link to="">Art</Link>
              </li>
              <li className="py-1">
                <Link to="">Music</Link>
              </li>
              <li className="py-1">
                <Link to="">Domain Names</Link>
              </li>
              {/* <li>
                <Link to="">Virtual World</Link>
              </li>
              <li>
                <Link to="">Collectibles</Link>
              </li> */}
            </ul>
          </div>
        </div>
        <div className="col-md-2 col-sm-4 col-xs-1">
          <div className="widget padl">
            <h4 className="pb-1">Resources</h4>
            <ul>
              <li className="py-1">
                <Link to="">Help Center</Link>
              </li>
              <li className="py-1">
                <Link to="">Partners</Link>
              </li>
              <li className="py-1">
                <Link to="">Suggestions</Link>
              </li>
              <li className="py-1">
                <Link to="">Discord</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-2 col-sm-4 col-xs-1">
          <div className="widget padl">
            <h4 className="pb-1">Company</h4>
            <ul>
              <li className="py-1">
                <Link to="">Community</Link>
              </li>
              <li className="py-1">
                <Link to="">Documentation</Link>
              </li>
              <li className="py-1">
                <Link to="">Brand Assets</Link>
              </li>
              <li className="py-1">
                <Link to="">Blog</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-3 col-sm-6 col-xs-1">
          <div className="widget padl">
            <h4 className="pb-1">Subscribe us</h4>
            {/* <p>
              Signup for our newsletter to get the latest news in your inbox.
            </p> */}
            <form
              action="#"
              className="row form-dark"
              id="form_subscribe"
              method="post"
              name="form_subscribe"
            >
              <div className="col text-center">
                <input
                  className="form-control"
                  id="txt_subscribe"
                  name="txt_subscribe"
                  placeholder="enter your email"
                  type="text"
                />
                <Link to="" id="btn-subscribe">
                  <i className="arrow_right bg-color-secondary"></i>
                </Link>
                <div className="clearfix"></div>
              </div>
            </form>
            {/* <div className="spacer-10"></div>
            <small>Your email is safe with us. We don't spam.</small> */}
          </div>
          <div className="subfooter">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="de-flex">
                    <div className="de-flex-col">
                      <div className="social-icons">
                        <span onClick={() => window.open("", "_self")}>
                          <i className="fa fa-facebook fa-lg"></i>
                        </span>
                        <span onClick={() => window.open("", "_self")}>
                          <i className="fa fa-twitter fa-lg"></i>
                        </span>
                        <span onClick={() => window.open("", "_self")}>
                          <i className="fa fa-linkedin fa-lg"></i>
                        </span>
                        <span onClick={() => window.open("", "_self")}>
                          <i className="fa fa-pinterest fa-lg"></i>
                        </span>
                        <span onClick={() => window.open("", "_self")}>
                          <i className="fa fa-rss fa-lg"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* <div className="subfooter">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="de-flex">
                                <div className="de-flex-col">
                                    <span onClick={()=> window.open("", "_self")}>
                                        <img alt="" className="f-logo d-1" src="./img/logo.png" />
                                        <img alt="" className="f-logo d-3" src="./img/logo-2-light.png" />
                                        <img alt="" className="f-logo d-4" src="./img/logo-3.png" />
                                        <span className="copy">&copy; Copyright 2021 - Gigaland by Designesia</span>
                                    </span>
                                </div>
                                <div className="de-flex-col">
                                    <div className="social-icons">
                                        <span onClick={()=> window.open("", "_self")}><i className="fa fa-facebook fa-lg"></i></span>
                                        <span onClick={()=> window.open("", "_self")}><i className="fa fa-twitter fa-lg"></i></span>
                                        <span onClick={()=> window.open("", "_self")}><i className="fa fa-linkedin fa-lg"></i></span>
                                        <span onClick={()=> window.open("", "_self")}><i className="fa fa-pinterest fa-lg"></i></span>
                                        <span onClick={()=> window.open("", "_self")}><i className="fa fa-rss fa-lg"></i></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
  </footer>
);
export default footer;
