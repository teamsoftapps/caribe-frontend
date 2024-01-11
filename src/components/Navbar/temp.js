/** @format */

import classes from "./Navbar.module.css";
import { images } from "../../utils/Images";
import carib from "../../utils/carib.svg";
import search from "../../utils/Search.svg";
import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

const Navbar = ({ showSearch, setQuery, query }) => {
  const [showNavModal, setShowNavModal] = useState(false);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 870);
  const navigate = useNavigate();
  const location = useLocation();
  const modalRef = useRef();
  const isLoggedin = useSelector((state) => state.auth.isLoggedin);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 870);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  const handleOnchangeQuery = (event) => {
    setQuery(event.target.value);
  };
  const onSubmitQuery = () => {
    navigate("/login", { replace: true });

    if (location.pathname.includes("search-page")) {
      return;
    }
    navigate("search-page", { state: query });
  };

  const onOpenCart = () => {
    navigate("/cart-page");
  };
  const onClickNavbarDrawer = () => {
    setShowNavModal(!showNavModal);
  };

  const onCloseModal = () => {
    setShowNavModal(false);
  };

  const varients = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  };

  return (
    <>
      <div className={classes.navContainer}>
        {isMobile && (
          <>
            <motion.nav
              key={"id12"}
              className={classes.modalAnimation}
              variants={varients}
              animate={!showNavModal ? "closed" : "open"}
            >
              <div className={classes.crossContainer}>
                <img
                  onClick={onCloseModal}
                  className={classes.crossIcon}
                  src={images.cross}
                  alt="close"
                />
              </div>
              <div className={classes.modelSocialsComtainer}>
                <img
                  className={classes.mobileDrawerIcon}
                  src={images.person}
                ></img>
                <div className={classes.drawerText}>
                  <a className={classes.link} href="">
                    Account
                  </a>
                </div>
              </div>
              <div
                onClick={onOpenCart}
                className={classes.modelSocialsComtainer}
              >
                <img
                  className={classes.mobileDrawerIcon}
                  src={images.shoppingBag}
                ></img>
                <div className={classes.drawerText}>My Cart</div>
              </div>
              <div className={classes.modelSocialsComtainer}>
                <img
                  className={classes.mobileDrawerIcon}
                  src={images.facebook}
                ></img>
                <div className={classes.drawerText}>
                  <a
                    className={classes.link}
                    href="https://www.facebook.com/"
                    target="_blank"
                  >
                    Facebook
                  </a>
                </div>
              </div>
              <div className={classes.modelSocialsComtainer}>
                <img
                  className={classes.mobileDrawerIcon}
                  src={images.instagram}
                ></img>
                <div className={classes.drawerText}>
                  <a
                    className={classes.link}
                    href="https://www.instagram.com/explore/"
                    target="_blank"
                  >
                    Instagram
                  </a>
                </div>
              </div>

              <div className={classes.modelSocialsComtainer}>
                <img
                  className={classes.mobileDrawerIcon}
                  src={images.twitter}
                ></img>
                <div className={classes.drawerText}>
                  <a
                    className={classes.link}
                    target="_blank"
                    href="https://twitter.com/"
                  >
                    Twitter
                  </a>
                </div>
              </div>
              <div className={classes.modelSocialsComtainer}>
                <img
                  className={classes.mobileDrawerIcon}
                  src={images.linkedin}
                ></img>
                <div className={classes.drawerText}>
                  <a
                    className={classes.link}
                    target="_blank"
                    href="https://linkedin.com/"
                  >
                    Linkedin
                  </a>
                </div>
              </div>
              <div className={classes.modelSocialsComtainer}>
                <img
                  className={classes.mobileDrawerIcon}
                  src={images.call}
                ></img>
                <div className={classes.drawerText}>
                  <a
                    className={classes.link}
                    target="_blank"
                    href="https://Email: +support@tronix.com/"
                  >
                    +12 345 6789 0
                  </a>
                </div>
              </div>
              <div className={classes.modelSocialsComtainer}>
                <img
                  className={classes.mobileDrawerIcon}
                  src={images.email}
                ></img>
                <div className={classes.drawerText}>
                  <a
                    className={classes.link}
                    target="_blank"
                    href="Email: +support@tronix.com/"
                  >
                    +support@tronix.com
                  </a>
                </div>
              </div>
            </motion.nav>

            {!showNavModal && (
              <div className={classes.navlogocontain}>
                <img
                  className={classes.navdroplogo}
                  onClick={onClickNavbarDrawer}
                  src={images.dropDown}
                ></img>
              </div>
            )}
          </>
        )}
        {isMobile ? (
          <>
            <div className={classes.mobileNav}>
              <div className={classes.navlogo}>
                <img src={carib}></img>
              </div>
            </div>
          </>
        ) : (
          <div className={classes.mainContainer}>
            <div className={classes.navUp}>
              <div className={classes.socialContainer}>
                <img
                  className={classes.socialIcons}
                  src={images.instagram}
                ></img>
                <img
                  className={classes.socialIcons}
                  src={images.facebook}
                ></img>
                <img className={classes.socialIcons} src={images.twitter}></img>
                <img
                  className={classes.socialIcons}
                  src={images.linkedin}
                ></img>
              </div>
              <div className={classes.contactInfo}>
                <div className={classes.iconsContainer}>
                  <img className={classes.contactIcons} src={images.call}></img>
                  <span>+12 345 6789 0</span>
                </div>
                <div className={classes.iconsContainer}>
                  <img
                    className={classes.contactIcons}
                    src={images.email}
                  ></img>
                  <span>+support@tronix.com</span>
                </div>
                <div className={classes.iconsContainer}>
                  <img
                    className={classes.contactIcons}
                    src={images.person}
                  ></img>
                  <span>Account</span>
                </div>
              </div>
            </div>
            <hr className={classes.horizontal} />
            <div className={classes.navDown}>
              <div className={classes.logo}>
                <img src={carib}></img>
              </div>
              <div className={classes.inputContainer}>
                <ul className={classes.unorderList}>
                  <li className={classes.listItem}>Home</li>
                  <li className={classes.listItem}>About us</li>
                  <li className={classes.listItem}>Contact us</li>
                  <li className={classes.listItem}>Services</li>
                  <li className={classes.listItem}>About us</li>
                  <li className={classes.listItem}>
                    <Link className={classes.link} to={"/filter"} state={query}>
                      <button
                        style={{ borderRadius: "2vw" }}
                        className={classes.searchbtn}
                        type="submit"
                      >
                        Search
                        <img className={classes.searchIcon} src={search}></img>
                      </button>{" "}
                    </Link>
                  </li>
                </ul>
                {/* <form className={classes.searchform} onSubmit={onSubmitQuery}>
                  <input
                    className={classes.searchInput}
                    type="text"
                    placeholder="Search"
                    value={query}
                    onChange={handleOnchangeQuery}
                  ></input>
                  <Link
                    className={classes.searchButton}
                    to={"/search-page"}
                    state={query}
                  >
                    <button className={classes.searchButton} type="submit">
                      <img className={classes.searchIcon} src={search}></img>
                    </button>
                  </Link>
                </form> */}
              </div>
              <div className={classes.cartContainer}>
                <img
                  onClick={onOpenCart}
                  className={classes.contactIcons}
                  src={images.shoppingCart}
                ></img>

                <img className={classes.contactIcons} src={images.user}></img>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* {isMobile && showSearch ? (
        <div className={classes.searchBarContainer}>
          <form
            className={classes.searchform}
            onSubmit={onSubmitQuery}>
            <input
              className={classes.searchInput}
              type='text'
              placeholder='Search'
              value={query}
              onChange={handleOnchangeQuery}></input>
            <button
              className={classes.searchButton}
              type='submit'>
              <img
                className={classes.searchIcon}
                src={search}></img>
            </button>
          </form>
        </div>
      ) : (
        ''
      )} */}
    </>
  );
};

export default Navbar;
