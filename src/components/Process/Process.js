import React, { useState } from "react";
import { images } from "../../utils/Images";
import classes from "./Process.module.css";
export const Process = ({
  disableCart = false,
  disableShipping = false,
  disableCheckout = false,
}) => {
  return (
    <div className={classes.processContainer}>
      <div
        className={`${classes.processItem} ${disableCart && classes.disabeled}`}
      >
        <div>
          <img
            className={classes.verifiedImg}
            src={images.verified}
            alt="verified"
          />
        </div>
        <div className={classes.processItemText}>CART</div>
      </div>
      <div
        className={`${classes.processItem} ${
          disableShipping && classes.disabeled
        }`}
      >
        <div>
          <img
            className={classes.verifiedImg}
            src={images.verified}
            alt="verified"
          />
        </div>
        <div className={classes.processItemText}>SHIPPING</div>
      </div>
      <div
        className={`${classes.processItem} ${
          disableCheckout && classes.disabeled
        }`}
      >
        <div>
          <img
            className={classes.verifiedImg}
            src={images.verified}
            alt="verified"
          />
        </div>
        <div className={classes.processItemText}>CHECKOUT</div>
      </div>
    </div>
  );
};
