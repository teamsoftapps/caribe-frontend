import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Footer } from "../../components/Footer/Footer";
import { CustomInput } from "../../common/Input/CustomInput";
import classes from "./CheckoutPage.module.css";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import schema from "../../schemas/CheckoutSchema";
import { Link } from "react-router-dom";
import { images } from "../../utils/Images";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import UsecreateApi from "../../utils/Hooks/post";
import MuiAlert from "@mui/material/Alert";
import { Snackbar, Slide } from "@mui/material";
import { motion } from "framer-motion";
import { Process } from "../../components/Process/Process";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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
  // firstname: "", //  should be same as name attribute
  // lastname: "",
  address: "",
  city: "",
  state: "",
  phoneNumber: "",
};

export const CheckoutPage = () => {
  const { postOrder } = UsecreateApi();
  const Products = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const [alertMessage, setAlertMessage] = useState(false);
  const [saverity, setSaverity] = useState("success");

  // const [saverity, setSaverity]= useState()

  const [isMobile, setIsMobile] = useState(window.innerWidth < 870);

  // useEffect(() => {

  // }, [alertMessage]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onPayment = async (body) => {
    console.log("called payment");
    const paymentObject = {
      totalPayment: totalPrice.toString(),
      checkOutItems: Products,
      ...body,
    };

    const res = await postOrder(paymentObject);

    if (res?.response?.data?.status == "failed") {
      setSaverity("warning");
      setAlertMessage("Failed to proceed");
      return;
    }

    setAlertMessage(res?.data?.message);
    setSaverity("success");

    //  IF YOU WANT TO UTILIZE PAYMENT PAGE UNCOMMENT THE BELOW CODE
    setTimeout(() => {
      console.log("timer started");
      navigate("/payment");
    }, 3000);
    // -----------
  };

  const { handleChange, values, handleSubmit, handleBlur, errors, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: schema,

      onSubmit: (values, action) => {
        onPayment(values);
        action.resetForm();
      },
    });

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
  const navigate = useNavigate();

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
    <div>
      {alertMessage && (
        <Snackbar
          TransitionComponent={Slide}
          // anchorOrigin={{ vertical: "top", horizontal: "center" }}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={alertMessage}
          autoHideDuration={3000}
          onClose={() => setAlertMessage(false)}
        >
          <Alert
            onClose={() => setAlertMessage(false)}
            severity={saverity}
            sx={{ width: "100%", marginTop: "2vw" }}
          >
            {alertMessage}
          </Alert>
        </Snackbar>
      )}
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
                ${parseFloat(totalPrice.toFixed(3))}
              </div>
            </div>
            <Process disableCheckout={true} />
          </>
        )}

        <div className={classes.checkoutContainer}>
          <div className={classes.mainHeading}>CHECKOUT</div>
          <div className={classes.header}>
            <p
              style={{ marginLeft: "1vw" }}
              className={`${classes.headingText} ${classes.mobileBillingDetails}`}
            >
              BILLING DETAILS
            </p>
            <p
              style={{ marginRight: "10vw", width: "10vw" }}
              className={`${classes.headingText} ${classes.visibility}`}
            >
              YOUR ORDER
            </p>
          </div>
          <div className={classes.productsContainer}>
            <div className={classes.formContainer}>
              <form style={{ width: "54vw" }} onSubmit={handleSubmit}>
                {/* {==========} */}
                {isMobile ? (
                  <>
                    {" "}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "start",
                        width: "80vw",
                      }}
                    >
                      {/* {==========} */}

                      <CustomInput
                        isMobile={isMobile}
                        inputstyle={{ width: "80vw", height: "8vw" }}
                        placeholder={"Shipping Address"}
                        type="text"
                        id="Shippingaddress"
                        name="address"
                        value={values.address}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        touched={touched?.address}
                        errors={errors?.address}
                        invalitStyle={mobileInvalidStyles}
                      />

                      <CustomInput
                        isMobile={isMobile}
                        inputstyle={{ width: "80vw", height: "8vw" }}
                        placeholder={"City"}
                        type="text"
                        id="City"
                        name="city"
                        value={values.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        touched={touched?.city}
                        errors={errors?.city}
                        invalitStyle={mobileInvalidStyles}
                      />

                      {/* {====================} */}

                      <CustomInput
                        isMobile={isMobile}
                        inputstyle={{ width: "80vw", height: "8vw" }}
                        placeholder={"State"}
                        type="text"
                        id="state"
                        name="state"
                        value={values.state}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        touched={touched?.state}
                        errors={errors?.state}
                        invalitStyle={mobileInvalidStyles}
                      />

                      <CustomInput
                        isMobile={isMobile}
                        inputstyle={{ width: "80vw", height: "8vw" }}
                        placeholder={"Phone number"}
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={values.phoneNumber}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        touched={touched?.phoneNumber}
                        errors={errors?.phoneNumber}
                        invalitStyle={mobileInvalidStyles}
                      />

                      {/* {================} */}

                      <div style={{ width: "100%" }}></div>
                    </div>
                    <div className={classes.buttonContainer}>
                      <Link to={"/"}>
                        <motion.button
                          key={"id18"}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className={classes.btnBackToShopping}
                        >
                          <div className={classes.btnText}>
                            BACK TO SHOPPING
                          </div>
                        </motion.button>
                      </Link>
                      <motion.button
                        key={"id19"}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        type="submit"
                        className={classes.btnPayment}
                      >
                        <div className={classes.btnText}>PAYMENT</div>
                      </motion.button>
                    </div>
                  </>
                ) : (
                  <>
                    {" "}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "start",
                        width: "100%",
                      }}
                    >
                      {/* <div
                        style={{
                          width: "100%",
                          display: "flex",
                          marginTop: ".7vw",
                          gap: "2vw",
                        }}
                        className={classes.rowForm}
                      >
                        <CustomInput
                          type="text"
                          id="firstname"
                          name="firstname"
                          value={values.firstname}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          inputstyle={{ width: "100%" }}
                          placeholder={"First name"}
                          touched={touched?.firstname}
                          errors={errors?.firstname}
                          invalitStyle={invalitStyle}
                        />

                        <CustomInput
                          type="text"
                          id="Lastname"
                          name="lastname"
                          value={values.lastname}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          // inputstyle={{ width: "26.3vw" }}
                          inputstyle={{ width: "100%" }}
                          placeholder={"Last name"}
                          touched={touched?.lastname}
                          errors={errors?.lastname}
                          invalitStyle={invalitStyle}
                        />
                      </div> */}
                      {/* {==========} */}
                      <div
                        style={{ marginTop: ".7vw" }}
                        className={classes.columnForm}
                      >
                        <div style={{ marginBottom: ".7vw", width: "100%" }}>
                          <CustomInput
                            inputstyle={{ width: "54vw" }}
                            placeholder={"Shipping Address"}
                            type="text"
                            id="Shippingaddress"
                            name="address"
                            value={values.address}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            touched={touched?.address}
                            errors={errors?.address}
                            invalitStyle={invalitStyle}
                          />
                        </div>

                        <CustomInput
                          inputstyle={{ width: "54vw" }}
                          placeholder={"City"}
                          type="text"
                          id="City"
                          name="city"
                          value={values.city}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          touched={touched?.city}
                          errors={errors?.city}
                          invalitStyle={invalitStyle}
                        />
                      </div>

                      {/* {====================} */}
                      <div
                        style={{ gap: "2vw", marginTop: ".7vw", width: "100%" }}
                        className={classes.rowForm}
                      >
                        <CustomInput
                          inputstyle={{ width: "100%" }}
                          placeholder={"State"}
                          type="text"
                          id="state"
                          name="state"
                          value={values.state}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          touched={touched?.state}
                          errors={errors?.state}
                          invalitStyle={invalitStyle}
                        />

                        <CustomInput
                          inputstyle={{ width: "100%" }}
                          placeholder={"Phone number"}
                          type="text"
                          id="phoneNumber"
                          name="phoneNumber"
                          value={values.phoneNumber}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          touched={touched?.phoneNumber}
                          errors={errors?.phoneNumber}
                          invalitStyle={invalitStyle}
                        />
                      </div>
                      {/* {================} */}
                      <div
                        style={{ marginTop: ".7vw", width: "100%" }}
                        className={classes.columnForm}
                      >
                        {/* <div style={{ marginBottom: ".7vw", width: "100%" }}>
                          <CustomInput
                            inputstyle={{ width: "54vw" }}
                            placeholder={"Post Code/ Zip"}
                            type="text"
                            id="Postcode"
                            name="postcode"
                            value={values.postcode}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            touched={touched?.postcode}
                            errors={errors?.postcode}
                            invalitStyle={invalitStyle}
                          />
                        </div> */}

                        {/* <CustomInput
                          inputstyle={{ width: "54vw" }}
                          placeholder={"Email Address"}
                          type="text"
                          id="Email"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          touched={touched?.email}
                          errors={errors?.email}
                          invalitStyle={invalitStyle}
                        /> */}
                      </div>
                    </div>
                    <div className={classes.buttonContainer}>
                      <Link to={"/"}>
                        <motion.button
                          key={"id19"}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className={classes.btnBackToShopping}
                        >
                          <div className={classes.btnText}>
                            BACK TO SHOPPING
                          </div>
                        </motion.button>
                      </Link>
                      <motion.button
                        key={"id20"}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        type="submit"
                        className={classes.btnPayment}
                      >
                        <div className={classes.btnText}>PAYMENT</div>
                      </motion.button>
                    </div>
                  </>
                )}
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
                          <div className={classes.productName}>
                            {product.title}
                          </div>

                          <div
                            style={{ color: "#FF3C3C" }}
                            className={classes.productName}
                          >
                            ×{product.quantity}
                          </div>
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
                    ${parseFloat(totalPrice.toFixed(3))}
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
