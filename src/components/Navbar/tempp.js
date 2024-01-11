import classes from "./Navbar.module.css";
import { images } from "../../utils/Images";
import carib from "../../utils/carib.svg";
import search from "../../utils/Search.svg";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Drawer } from "../Drawer/Drawer";
import { useSelector } from "react-redux";
import { motion, AnimatePresence, easeOut } from "framer-motion";

// import { useDispatch } from "react-redux";
const Navbar = ({ showSearch }) => {
  const [showNavModal, setShowNavModal] = useState(false);
  const [query, setQuery] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 870);
  const navigate = useNavigate();
  const location = useLocation();
  const modalRef = useRef();
  const isLoggedin = useSelector((state) => state.auth.isLoggedin);

  // const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 870);
      // setIsMobile(window.innerWidth < 768);
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
    if (location.pathname.includes("search-page")) {
      return;
    }
    navigate("search-page", { state: query });
  };

  const onOpenCart = () => {
    if (isLoggedin) {
      navigate("/cart-page");
    }
    navigate("/login");
  };

  const onClickNavbarDrawer = () => {
    setShowNavModal(!showNavModal);
  };

  const onCloseModal = () => {
    setShowNavModal(false);
  };

  return (
    <>
      <div className={classes.navContainer}>
        {isMobile && (
          <>
            <AnimatePresence>
              {showNavModal ? (
                <motion.div
                  className={classes.modalAnimation}
                  initial={{ opacity: 0, x: "100%" }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: "100%" }}
                  transition={{ duration: 0.2, ease: easeOut }}
                  key={"slider"}
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
                </motion.div>
              ) : (
                <div className={classes.navlogocontain}>
                  <img
                    className={classes.navdroplogo}
                    onClick={onClickNavbarDrawer}
                    src={images.dropDown}
                  ></img>
                </div>
              )}
            </AnimatePresence>
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
                <form className={classes.searchform} onSubmit={onSubmitQuery}>
                  <input
                    className={classes.searchInput}
                    type="text"
                    placeholder="Search"
                    value={query}
                    onChange={handleOnchangeQuery}
                  ></input>
                  <button className={classes.searchButton} type="submit">
                    <img className={classes.searchIcon} src={search}></img>
                  </button>
                </form>
              </div>
              <div className={classes.cartContainer}>
                <img
                  onClick={onOpenCart}
                  className={classes.contactIcons}
                  src={images.shoppingCart}
                ></img>
                {/* <img
                  className={classes.contactIcons}
                  src={images.emailblack}
                ></img>*/}
                <img className={classes.contactIcons} src={images.user}></img>
              </div>
            </div>
          </div>
        )}
      </div>
      {isMobile && showSearch ? (
        <div className={classes.searchBarContainer}>
          <form className={classes.searchform} onSubmit={onSubmitQuery}>
            <input
              className={classes.searchInput}
              type="text"
              placeholder="Search"
              value={query}
              onChange={handleOnchangeQuery}
            ></input>
            <button className={classes.searchButton} type="submit">
              <img className={classes.searchIcon} src={search}></img>
            </button>
          </form>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Navbar;
