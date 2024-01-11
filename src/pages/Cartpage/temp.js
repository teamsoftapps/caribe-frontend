import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Footer } from "../../components/Footer/Footer";
import classes from "./CartPage.module.css";
import { images } from "../../utils/Images";
import { useState } from "react";
import { useNavigate } from "react-router-dom/dist";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementCartItemquantity,
  decrementCartItemQuantity,
  removeItemFromCart,
  totalprice,
} from "../../store/reducers/cartSlice";

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
    quantity: 3,
  },
  {
    image: images.product4,
    price: 20,
    rating: 5,
    title: "Ear pods",
    quantity: 4,
  },
];
export const CartPage = () => {
  const [products, setProducts] = useState(Dummy_Products);
  const productsRedux = useSelector((state) => state.cart.items);
  const productsprice = useSelector((state) => state.cart.totalPrice);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 870);

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const HandleResize = () => {
      setIsMobile(window.innerWidth < 870);
    };

    window.addEventListener("resize", HandleResize);
    return () => {
      window.removeEventListener("resize", HandleResize);
    };
  }, [isMobile]);
  useEffect(() => {});

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(totalprice());
  }, [productsRedux]);

  const onIncrementProductQuantity = (product) => {
    dispatch(incrementCartItemquantity(product));
  };

  const onDecrementProductQuantity = (product) => {
    dispatch(decrementCartItemQuantity(product));
  };

  const onRemoveItemFromCart = (product) => [
    dispatch(removeItemFromCart(product)),
  ];

  const onCheckout = () => {
    navigate("/checkout");
  };
  // const totalPrice =()=>{
  //   productsRedux.
  // }
  const handleOnDelete = (product) => {
    const filteredProducts = products?.filter(
      (item) => item.title !== product.title
    );
    setProducts(filteredProducts);

    return;
  };
  return (
    <>
      <Navbar showSearch={true} />
      <div className={classes.wrapper}>
        <div className={classes.cartContainer}>
          <div
            className={classes.cartTitle}
            style={{ marginBottom: "5vh", marginTop: "5vh", color: "262626" }}
          >
            CART
          </div>
          {/* <div>header</div> */}

          <div className={classes.ProductContainer}>
            {/* <div className={classes.productInnerWrapper}> */}
            <div className={classes.productsHeader}>
              {/* <div className={[classes.headingText, classes.spacing]}>Image</div> */}
              <div className={`${classes.spacing}  ${classes.headingText}`}>
                {`Image`}
              </div>
              <div
                className={`${classes.spacing} ${classes.spacingMob} ${classes.headingText}`}
              >
                Product
              </div>
              <div
                className={`${classes.spacing}  ${classes.headingText} ${classes.visibility}`}
              >
                Price
              </div>
              <div
                className={`${classes.spacing}  ${classes.headingText} ${classes.visibility}`}
              >
                QTY
              </div>
              <div
                className={`${classes.spacing} ${classes.mobTotalSpacing}  ${classes.headingText}`}
              >
                Total
              </div>
              <div
                className={`${classes.spacing}  ${classes.headingText}`}
              ></div>
            </div>
            {/* {products.map((product, index) => { */}
            {isMobile
              ? productsRedux?.map((product, index) => {
                  return (
                    <div
                      key={index}
                      className={classes.mobileproductitemContainer}
                    >
                      <div>
                        <img
                          className={classes.productImage}
                          src={product.image}
                          alt="product image"
                        />
                      </div>
                      <div className={classes.titlepriceContaienr}>
                        <div
                          style={{
                            color: "#707070",
                            color: "rgb(39 39 39)",
                            fontWeight: 500,
                          }}
                          className={classes.spacing}
                        >
                          {product.title}
                        </div>
                        <p
                          style={{ width: "5vw" }}
                          className={classes.priceText}
                        >
                          ${product.price}.00
                        </p>
                        <div style={{ color: "#F780AE", fontSize: "3.5vw" }}>
                          Color: Red
                        </div>
                        <div style={{ color: "#F780AE", fontSize: "3.5vw" }}>
                          Size: L
                        </div>
                      </div>

                      <div className={classes.TotalQtyWrapper}>
                        <div
                          style={{ fontSize: "4vw" }}
                          className={`${classes.spacing} ${classes.priceText}`}
                        >{`$${product.price * product.quantity}.00`}</div>

                        <div className={classes.qtyContainer}>
                          <div
                            onClick={() => onIncrementProductQuantity(product)}
                            className={classes.iconContainer}
                          >
                            <img
                              style={{ width: "10px" }}
                              src={images.plus}
                            ></img>
                          </div>

                          <div className={classes.qtyBox}>
                            {product.quantity}
                          </div>
                          <div
                            style={{ backgroundColor: "#F46B5B" }}
                            onClick={() => onDecrementProductQuantity(product)}
                            className={classes.iconContainer}
                          >
                            <img
                              style={{ width: "10px" }}
                              src={images.minus}
                            ></img>
                          </div>
                        </div>
                        <div
                          className={classes.spacing}
                          onClick={() => onRemoveItemFromCart(product)}
                        >
                          <img
                            className={classes.deleteIcon}
                            src={images.deleteIcon}
                            alt="delete"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })
              : productsRedux?.map((product, index) => {
                  return (
                    <div key={index} className={classes.productitemContainer}>
                      <div>
                        <img
                          style={{ height: "7vw", width: "5vw" }}
                          src={product.image}
                          alt="product image"
                        />
                      </div>
                      <div
                        style={{
                          color: "#707070",
                          fontWeight: "600",
                          fontSize: "1vw",
                        }}
                        className={classes.spacing}
                      >
                        {product.title}
                      </div>
                      <p style={{ width: "5vw" }} className={classes.priceText}>
                        ${product.price}.00
                      </p>
                      <div className={classes.qtyContainer}>
                        <div
                          onClick={() => onIncrementProductQuantity(product)}
                          className={classes.iconContainer}
                        >
                          <img
                            style={{ width: "10px" }}
                            src={images.plus}
                          ></img>
                        </div>

                        <div className={classes.qtyBox}>{product.quantity}</div>
                        <div
                          onClick={() => onDecrementProductQuantity(product)}
                          className={classes.iconContainer}
                        >
                          <img
                            style={{ width: "10px" }}
                            src={images.minus}
                          ></img>
                        </div>
                      </div>
                      <div
                        className={`${classes.spacing} ${classes.priceText}`}
                      >{`$${product.price * product.quantity}.00`}</div>
                      <div
                        className={classes.spacing}
                        onClick={() => onRemoveItemFromCart(product)}
                      >
                        <img
                          className={classes.deleteIcon}
                          src={images.deleteIcon}
                          alt="delete"
                        />
                      </div>
                    </div>
                  );
                })}
          </div>

          {!isMobile && (
            <div className={classes.totalContainer}>
              <h4 className={classes.totalText}>Total</h4>
              <h2 className={classes.totalText}>{productsprice}</h2>
            </div>
          )}

          {/* CHECKOUT CONTAINERS  */}

          <div className={classes.CheckoutContainer}>
            {/* <div className={classes.voucherContainer}>
              <div className={classes.VoucherHeading}>Voucher</div>
              <p
                className={classes.voucherMobile}
                style={{ fontSize: "medium", color: "#414141" }}
              >
                Enter your coupen if you have one
              </p>
              <input
                className={classes.textInput}
                type="text"
                placeholder="Voucher Code"
              />
              <div className={classes.blackbtn}>
                <button className={` ${classes.btnText} ${classes.applybtn}`}>
                  Apply
                </button>
              </div>
            </div> */}
            <div className={classes.mobileTotalContainer}>
              <div className={classes.checkoutInnerContainer}>
                <div className={classes.checkoutContent}>
                  {/* <p className={classes.headingText}>Subtotal</p> */}
                  <p
                    className={`${classes.headingText} ${classes.mobileHeadingText}`}
                    style={{ color: "rgb(112, 112, 112)" }}
                  ></p>
                </div>
                {/* <div className={classes.checkoutContent}>
                  <div
                    className={`${classes.headingText} ${classes.mobileHeadingText}`}
                  >
                    Subtotal
                  </div>
                  <div
                    className={`${classes.headingText} ${classes.mobileHeadingText}`}
                    style={{ color: "rgb(112, 112, 112)" }}
                  >
                    ${productsprice}
                  </div>
                </div> */}
                {/* <div className={classes.checkoutContent}>
                  <div
                    className={`${classes.headingText} ${classes.mobileHeadingText}`}
                  >
                    Shipping
                  </div>
                  <div
                    className={`${classes.headingText} ${classes.mobileHeadingText}`}
                    style={{ color: "rgb(112, 112, 112)" }}
                  >
                    $100
                  </div>
                </div> */}
                <div className={classes.checkoutContent}>
                  <div
                    className={`${classes.headingText} ${classes.mobileHeadingText}`}
                    style={{ fontWeight: "bold" }}
                  >
                    {" "}
                    Total
                  </div>
                  <div
                    className={`${classes.headingText} ${classes.mobileHeadingText}`}
                    style={{ fontWeight: "bold" }}
                  >
                    ${+productsprice + 100}
                    {/* +100 */}
                  </div>
                </div>
                {!isMobile && (
                  <button
                    onClick={onCheckout}
                    className={` ${classes.btnText} ${classes.btnCheckout}`}
                  >
                    Checkout
                  </button>
                )}
              </div>

              {isMobile && (
                <button
                  style={{ width: "80vw" }}
                  onClick={onCheckout}
                  className={` ${classes.btnText} ${classes.btnCheckout}`}
                >
                  Checkout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

// i18 language translation between english and french
