import React from "react";
import { images } from "../../utils/Images";
import carib from "../../utils/carib.svg";
import classes from "./Footer.module.css";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 870);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 870);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  return (
    <div style={{ marginTop: "5vw", backgroundColor: "#FEF7F7" }}>
      <div>
        {isMobile ? (
          ""
        ) : (
          <Link to={"/filter"}>
            <img
              style={{ width: "100%", height: "auto" }}
              src={images.shopnow}
            />
          </Link>
        )}
      </div>

      <div
        className={classes.main}
        style={{ width: "100%", backgroundColor: "#FEF7F7" }}
      >
        <div className={classes.parentContainer}>
          <div className={classes.contentContainer}>
            <img className={classes.logo} src={carib} />
            <p className={classes.text}>
              lorem jdlsiopacdn cd cfdwjrlkf dcldfkjldcf sdvcj
              <br />
              cd cfdwjrlkf dcldfkjldcf sdvcj
            </p>
            <p className={classes.text}>+1234567890</p>
            <p className={classes.text}>lovia@support.com</p>
          </div>
          <div
            style={{
              display: "flex",

              alignItems: "flex-start",

              justifyContent: "space-between",
              paddingBottom: "30px",
            }}
          >
            {isMobile ? (
              <div className={`${isMobile ? classes.footerInnerChild : ""}`}>
                <div className={classes.contentContainer}>
                  <div className={classes.heading}>Company</div>

                  <p className={classes.text}>About</p>
                  <p className={classes.text}>Products</p>
                  <p className={classes.text}>Contacts</p>
                  <p className={classes.text}>Blog</p>
                  <p className={classes.text}>Careers</p>
                </div>
                <div className={classes.contentContainer}>
                  <div className={classes.heading}>Information</div>
                  <p className={classes.text}>Help center</p>
                  <p className={classes.text}>Payment methods</p>
                  <p className={classes.text}>Return & Fund</p>
                  <p className={classes.text}>Privacy policy</p>
                </div>
                <div className={classes.contentContainer}>
                  <div className={classes.heading}>Follow us</div>
                  <div className={classes.imageContainer}>
                    <img
                      className={classes.followImage}
                      src={images.facebook}
                      alt="social icon"
                    ></img>
                    <img
                      className={classes.followImage}
                      src={images.twitter}
                      alt="social icon"
                    ></img>
                    <img
                      className={classes.followImage}
                      src={images.instagram}
                      alt="social icon"
                    ></img>
                    <img
                      className={classes.followImage}
                      src={images.linkedin}
                      alt="social icon"
                    ></img>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className={classes.contentContainer}>
                  <div className={classes.heading}>Company</div>

                  <p className={classes.text}>About</p>
                  <p className={classes.text}>Products</p>
                  <p className={classes.text}>Contacts</p>
                  <p className={classes.text}>Blog</p>
                  <p className={classes.text}>Careers</p>
                </div>
                <div className={classes.contentContainer}>
                  <div className={classes.heading}>Information</div>
                  <p className={classes.text}>Help center</p>
                  <p className={classes.text}>Payment methods</p>
                  <p className={classes.text}>Return & Fund</p>
                  <p className={classes.text}>Privacy policy</p>
                </div>
                <div className={classes.contentContainer}>
                  <div className={classes.heading}>Follow us</div>
                  <p className={classes.text}>Facebook</p>
                  <p className={classes.text}>Linkedin</p>
                  <p className={classes.text}>instagram</p>
                  <p className={classes.text}>Twitter</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          marginLeft: "10vw",
        }}
      >
        <p className={classes.text} style={{ color: "gray" }}>
          Copyright @ 2023 Carib. All Right Reserved
        </p>
      </div>
    </div>
  );
};
