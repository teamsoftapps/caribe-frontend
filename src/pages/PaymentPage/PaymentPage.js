import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Footer } from "../../components/Footer/Footer";
import { CustomInput } from "../../common/Input/CustomInput";
import { Process } from "../../components/Process/Process";
import classes from "./Paymentpage.module.css";
import { Link } from "react-router-dom";
import { images } from "../../utils/Images";
import { useFormik } from "formik";
import paymentSchema from "../../schemas/PaymentSchema";
import { Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

let Dummy_Products = [
  {
    image: images.product1,
    price: 10,
    rating: 5,
    title: "Watch",
    quantity: 1,
  },
  {
    image: images.product2,
    price: 20,
    rating: 3,
    title: "head Phones",
    quantity: 2,
  },
  {
    image: images.product3,
    price: 20,
    rating: 4,
    title: "VR",
    quantity: 1,
  },
  {
    image: images.product4,
    price: 20,
    rating: 5,
    title: "Ear pods",
    quantity: 1,
  },
];
const initialValues = {
  cardnumber: "",
  name: "",
  securitycode: "",
  expiration: "",
};

const invalitStyle = {
  color: "red",
  textAlign: "start",
  fontSize: ".7vw",
};

const mobileInvalidStyles = {
  color: "red",
  textAlign: "start",
  fontSize: "3vw",
};

export const PaymentPage = () => {
  const Products = useSelector((state) => state.cart.items);
  const totapPrice = useSelector((state) => state.cart.totalPrice);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 870);
  const navigate = useNavigate();
  const onConfirmSubmission = () => {
    navigate("/");
  };
  const { handleBlur, handleChange, touched, values, errors, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: paymentSchema,
      onSubmit: (values, action) => {
        alert("Subbmitted Successfully");
        action.resetForm();
        onConfirmSubmission();
      },
    });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 870);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Navbar showSearch={false}></Navbar>
      <div className={classes.wrapper}>
        {isMobile && (
          <>
            <div className={classes.OrderSummary}>
              <div className={classes.summaryInerContainer}>
                <img
                  style={{ width: "4.5vw", height: "4.5vw" }}
                  src={images.cart}
                  alt="cart"
                />

                <div style={{ fontSize: "3vw" }}>Order Summary</div>
              </div>
              <div className={classes.SummaryPriceText}>
                {" "}
                ${parseFloat(totapPrice.toFixed(3))}
              </div>
            </div>
            {/* PROCESSDIV */}
            <Process />
          </>
        )}
        <div className={classes.checkoutContainer}>
          <div className={classes.mainHeading}>PAYMENT</div>
          <div className={classes.header}>
            {!isMobile && (
              <p
                style={{ marginLeft: "1vw" }}
                className={`${classes.headingText} ${classes.mobileBillingDetails}`}
              >
                SHOPPING INFORMATION
              </p>
            )}

            {isMobile && (
              <p
                style={{ marginBottom: "6vw" }}
                className={`${classes.headingText} ${classes.mobileBillingDetails}`}
              >
                YOUR CREDIT CARD
              </p>
            )}

            <p
              style={{ marginRight: "12vw", width: "10vw" }}
              className={`${classes.headingText} ${classes.visibility}`}
            >
              YOUR ORDER
            </p>
          </div>
          <div className={classes.productsContainer}>
            <div className={classes.formContainer}>
              <form style={{ width: "55vw" }} onSubmit={handleSubmit}>
                <div className={classes.informationContainer}></div>
                {!isMobile && (
                  <div
                    style={{
                      textAlign: "start",
                      marginLeft: "1vw",
                      fontWeight: "bold",
                      fontSize: "1.2vw",
                      marginTop: "1.5vw",
                    }}
                  >
                    YOUR CREDIT CARD
                  </div>
                )}
                {isMobile ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "start",
                      width: "100%",
                    }}
                  >
                    <div
                      style={{ width: "100%" }}
                      className={classes.columnForm}
                    >
                      <div style={{ marginTop: ".7vw ", width: "100%" }}>
                        <CustomInput
                          isMobile={isMobile}
                          // inputstyle={{ width: "54vw" }}
                          inputstyle={{ width: "80vw", height: "8vw" }}
                          placeholder={"Card Number"}
                          type="text"
                          id="cardnumber"
                          name="cardnumber"
                          value={values.cardnumber}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          touched={touched?.cardnumber}
                          errors={errors?.cardnumber}
                          invalitStyle={mobileInvalidStyles}
                        />
                      </div>
                      <div
                        style={{
                          marginTop: ".7vw",
                          marginBottom: ".7vw",
                          width: "100%",
                        }}
                      >
                        <CustomInput
                          isMobile={isMobile}
                          inputstyle={{
                            width: "80vw",
                            height: "8vw",
                          }}
                          placeholder={"Name on Card"}
                          type="text"
                          id="name"
                          name="name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.name}
                          touched={touched?.name}
                          errors={errors?.name}
                          invalitStyle={mobileInvalidStyles}
                        />
                      </div>
                    </div>

                    <CustomInput
                      isMobile={isMobile}
                      inputstyle={{ width: "80vw", height: "8vw" }}
                      placeholder={"Expiration (MM/ YY)"}
                      type="text"
                      id="expiration"
                      name="expiration"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.expiration}
                      touched={touched?.expiration}
                      errors={errors?.expiration}
                      invalitStyle={mobileInvalidStyles}
                    />

                    <CustomInput
                      isMobile={isMobile}
                      inputstyle={{ width: "80vw", height: "8vw" }}
                      placeholder={"Security code"}
                      type="text"
                      id="securitycode"
                      name="securitycode"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.securitycode}
                      touched={touched?.securitycode}
                      errors={errors?.securitycode}
                      invalitStyle={mobileInvalidStyles}
                    />
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "start",
                      width: "100%",
                    }}
                  >
                    <div
                      style={{ width: "100%" }}
                      className={classes.columnForm}
                    >
                      <div
                        style={{
                          marginTop: "1.5vw",
                          width: "100%",
                        }}
                      >
                        <CustomInput
                          isMobile={isMobile}
                          inputstyle={{
                            width: "54vw",
                            height: "2.4vw",
                          }}
                          placeholder={"Card Number"}
                          type="text"
                          id="cardnumber"
                          name="cardnumber"
                          value={values.cardnumber}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          touched={touched?.cardnumber}
                          errors={errors?.cardnumber}
                          invalitStyle={invalitStyle}
                        />
                      </div>
                      <div
                        style={{
                          marginBottom: ".7vw",
                          width: "100%",
                          marginTop: "1.5vw",
                        }}
                      >
                        <CustomInput
                          isMobile={isMobile}
                          inputstyle={{ width: "54vw", height: "2.4vw" }}
                          placeholder={"Name on Card"}
                          type="text"
                          id="name"
                          name="name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.name}
                          touched={touched?.name}
                          errors={errors?.name}
                          invalitStyle={invalitStyle}
                        />
                      </div>
                    </div>

                    <div
                      style={{ marginTop: ".7vw" }}
                      className={classes.rowForm}
                    >
                      <CustomInput
                        isMobile={isMobile}
                        inputstyle={{ width: "26vw", height: "2.4vw" }}
                        placeholder={"Expiration (MM/ YY)"}
                        type="text"
                        id="expiration"
                        name="expiration"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.expiration}
                        touched={touched?.expiration}
                        errors={errors?.expiration}
                        invalitStyle={invalitStyle}
                      />

                      <CustomInput
                        isMobile={isMobile}
                        inputstyle={{ width: "26vw", height: "2.4vw" }}
                        placeholder={"Security code"}
                        type="text"
                        id="securitycode"
                        name="securitycode"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.securitycode}
                        touched={touched?.securitycode}
                        errors={errors?.securitycode}
                        invalitStyle={invalitStyle}
                      />
                    </div>
                  </div>
                )}

                <div className={classes.buttonContainer}>
                  <Link to={"/"}>
                    <motion.button
                      key={"id21"}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={classes.btnBackToShopping}
                    >
                      {" "}
                      <div className={classes.btnText}>BACK TO SHOPPING</div>
                    </motion.button>
                  </Link>

                  <motion.button
                    key={"id22"}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={classes.btnPayment}
                    type="submit"
                  >
                    <div className={classes.btnText}>PAYMENT</div>
                  </motion.button>
                </div>
              </form>
            </div>
            <div className={classes.productsInnerContainer}>
              <div className={classes.productsWrapper}>
                {/* {Dummy_Products.map((product, index) => { */}
                {Products.map((product, index) => {
                  return (
                    <div key={index} className={classes.productsItemContainer}>
                      <div>
                        <img
                          className={classes.productImage}
                          src={product.image}
                          alt="product"
                        />
                      </div>
                      <div className={classes.info}>
                        <div>
                          {/* <div className={classes.productName}>
                            {product.title} product Image
                          </div> */}
                          <div className={classes.productName}>
                            {product.title}
                          </div>
                          {/* <div className={classes.productName}>
                            Quantity: {product.quantity}
                          </div> */}
                          <div
                            style={{ color: "#ff3c3c" }}
                            className={classes.productName}
                          >
                            ×{product.quantity}
                          </div>
                          {/* <div className={classes.productName}>Size: Large</div> */}
                        </div>
                        <p className={classes.prodPrice}>
                          {" "}
                          ${parseFloat(product.price.toFixed(3))}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className={classes.total}>
                {/* <div>
                  <div
                    style={{ marginTop: "1.5vw" }}
                    className={classes.totalInnerContainer}
                  >
                    <div className={classes.totalText}>Sutotal</div>
                    <div className={classes.semiPrice}>$400</div>
                  </div>
                  <div className={classes.totalInnerContainer}>
                    <div className={classes.totalText}>Shipping</div>
                    <div className={classes.semiPrice}>$20</div>
                  </div>
                </div> */}
                <div
                  style={{ marginTop: "1.5vw" }}
                  className={classes.totalInnerContainer}
                >
                  <div
                    style={{ fontWeight: "bold", fontSize: "1vw" }}
                    className={classes.totalText}
                  >
                    TOTAL
                  </div>
                  <div className={classes.totalPrice}>
                    {" "}
                    ${parseFloat(totapPrice.toFixed(3))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
};
