import React from "react";
import styles from "./Success.module.css";
import { images } from "../../utils/Images";
export const Success = () => {
  return (
    <body className={styles.body}>
      <div className={styles.content}>
        <div className={styles.content}>
          <img src={images.checked} className={styles.checked} />

          <div className={styles.label}>Payment Success</div>
          <div className={styles.successtxt}>
            Your order with CARIBE is confirmed and on its way. Get ready to
            enjoy your purchase! Thank you for choosing us. Happy shopping!"
          </div>
          <div className={styles.btncontain}>
            <div className={styles.backbutton}>Back to Home</div>
          </div>
        </div>
      </div>
    </body>
  );
};
