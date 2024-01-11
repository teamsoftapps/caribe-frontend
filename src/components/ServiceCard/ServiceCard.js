import React from "react";
import classes from "./ServiceCard.module.css";
import { images } from "../../utils/Images";

export const ServiceCard = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.mainContainer}>
        <div className={classes.cards}>
          <img className={classes.image} src={images.delivery} alt="delivery" />
          <span>
            Free Shipping
            <br /> Worldwide
          </span>
        </div>
        <div className={classes.lineContainer}>
          <div className={classes.verticalLine}></div>
        </div>
        <div className={classes.cards}>
          <img className={classes.image} src={images.support} alt="support" />
          <span>
            24 Hours
            <br /> helping center
          </span>
        </div>
        <div className={classes.lineContainer}>
          <div className={classes.verticalLine}></div>
        </div>
        <div className={classes.cards}>
          <img className={classes.image} src={images.payment} alt="payment" />
          <span>
            Payment <br /> Secure System
          </span>
        </div>
        <div className={classes.lineContainer}>
          <div className={classes.verticalLine}></div>
        </div>

        <div className={classes.cards}>
          <img className={classes.image} src={images.discount} alt="discount" />
          <span>
            Payment
            <br /> Secure System
          </span>
        </div>
      </div>
    </div>
  );
};
// [1,2,3,4].map((i,index)=>{
//     return(
//         <div>
// {index[0]=='title'&&index[1]=='sufui'}

//         </div>
//     )
// })
