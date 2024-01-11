/** @format */

import React, { useEffect } from "react";
import classes from "./FavoritePage.module.css";
import Navbar from "../../components/Navbar/Navbar";
import { Footer } from "../../components/Footer/Footer";
import search from "../../utils/Search.svg";
import { useState } from "react";
import { images } from "../../utils/Images";
import { useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
// import {use}
import "swiper/css";
import { useSelector } from "react-redux";

const Dummy_Products = [
  {
    image: images.product1,
    price: 10,
    rating: 5,
    title: "Watch",
  },
  {
    image: images.product2,
    price: 20,
    rating: 3,
    title: "head Phones",
  },
  {
    image: images.product3,
    price: 20,
    rating: 4,
    title: "VR",
  },
  {
    image: images.product4,
    price: 20,
    rating: 5,
    title: "Ear pods",
  },
  {
    image: images.product1,
    price: 10,
    rating: 5,
    title: "Watch",
  },
  {
    image: images.product2,
    price: 20,
    rating: 3,
    title: "head Phones",
  },
  {
    image: images.product3,
    price: 20,
    rating: 4,
    title: "VR",
  },
  {
    image: images.product4,
    price: 20,
    rating: 5,
    title: "Ear pods",
  },
];

export const FavoritePage = () => {
  const [query, setQuery] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 870);
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;

  const Favorites = useSelector((state) => state.cart.favorites);

  const onAddTOCart = (product) => {
    navigate("/product", { state: product });
  };

  const onRemoveFromFavorites = () => {};

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const handleWidthChange = () => {
      setIsMobile(window.innerWidth < 870);
    };
    window.addEventListener("resize", handleWidthChange);
    return () => {
      window.removeEventListener("resize", handleWidthChange);
    };
  }, [isMobile]);

  return (
    <div>
      <Navbar setQuery={setQuery} query={query} showSearch={true}></Navbar>
      <div className={classes.wrapper}>
        <div className={classes.inputContainer}></div>
        <div className={classes.itemsContainer}>
          <div className={classes.productContainer}>
            {isMobile
              ? // ? Dummy_Products.map((product, index) => {
                Favorites?.map((product, index) => {
                  return (
                    <div
                      key={index}
                      className={classes.mobileproductItemContainer}
                    >
                      <div className={classes.mobileProductImageContainer}>
                        <img
                          className={classes.mobileProductImage}
                          src={product.image}
                        />
                      </div>

                      <div className={classes.productInfo}>
                        <div>
                          <div
                            style={{
                              textAlign: "start",
                              color: "yellow",
                              height: "2.5vw",
                            }}
                          >
                            ,
                          </div>
                        </div>

                        <div className={classes.DescriptionContainer}>
                          <div className={classes.itemHeadingContainer}>
                            <div
                              style={{
                                textAlign: "start",
                                fontWeight: "bold",
                                color: "#1c1c1c",
                              }}
                              className={classes.catgoriesText}
                            >
                              {product.title}
                            </div>
                          </div>
                        </div>

                        <div className={classes.itemControls}>
                          <div className={classes.mobilepriceContainer}>
                            <div className={classes.discountedPriceContainer}>
                              <div className={classes.mobilediscountedPrice}>
                                ${product.price - 5}
                              </div>
                              <div className={classes.DiscountedContainer}>
                                <div className={classes.mobilePrice}>
                                  ${product.price}
                                </div>
                                <div
                                  className={classes.mobileDiscountPercentage}
                                >
                                  20%
                                </div>
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => onAddTOCart(product)}
                            className={classes.mobilebtnAddToCart}
                          >
                            ADD TO CART
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              : Favorites?.map((product, index) => {
                  return (
                    <div key={index} className={classes.productItemContainer}>
                      <div className={classes.productImage}>
                        <img
                          className={classes.productImage}
                          src={product.image}
                        />
                      </div>

                      <div className={classes.productInfo}>
                        <div className={classes.DescriptionContainer}>
                          <div className={classes.itemHeadingContainer}>
                            <div
                              style={{
                                textAlign: "start",
                                fontWeight: "bold",
                                fontSize: "1.2vw",
                              }}
                              className={classes.catgoriesText}
                            >
                              {product.title}
                            </div>
                            <div className={classes.itemDescription}>
                              Lorem ipsum dolor, sit amet consectetur
                              adipisicing elit. Repellat, accusamus vel animi in
                            </div>
                          </div>
                          <div className={classes.priceContainer}>
                            <div className={classes.discountedPrice}>
                              ${product.price - 5}
                            </div>
                            <div className={classes.price}>
                              ${product.price}
                            </div>
                          </div>
                        </div>
                        <div className={classes.itemControls}>
                          <button
                            onClick={() => onAddTOCart(product)}
                            className={classes.btnAddToCart}
                          >
                            Add to Cart
                          </button>
                          <button
                            onClick={() => {
                              onRemoveFromFavorites(product);
                            }}
                            className={classes.btnAddToWishlist}
                          >
                            {/* <img
                              className={classes.addToWishList}
                              src={images.addToWishlist}
                            /> */}
                            <p
                              style={{ fontWeight: 600 }}
                              className={classes.catgoriesText}
                            >
                              Remove from Favorites
                            </p>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
        {isMobile && (
          <div className={classes.moreContent}>
            <div>
              <button onClick={() => {}} className={classes.btnSeemore}>
                See more
              </button>
            </div>
          </div>
        )}
        <Footer></Footer>
      </div>
    </div>
  );
};
