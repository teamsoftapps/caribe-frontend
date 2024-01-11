/** @format */

import React, { useEffect } from 'react';
import styles from './Fail.module.css';
import { images } from '../../utils/Images';
import fail from './../../assets/fail.png';
const Fail = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <body className={styles.body}>
      <div className={styles.content}>
        <div className={styles.content}>
          <img
            src={fail}
            className={styles.checked}
          />

          <div className={styles.label}>Failed to Proccess</div>
          <div className={styles.successtxt}>
            Unfortunately, the payment for this order has failed
          </div>
          <div className={styles.btncontain}>
            <div className={styles.backbutton}>Back to Home</div>
          </div>
        </div>
      </div>

      
  
    </body>
  );
};

export default Fail;
