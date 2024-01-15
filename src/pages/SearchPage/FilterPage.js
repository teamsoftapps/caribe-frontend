/** @format */

import React, { useEffect } from "react";
import classes from "./FilterPage.module.css";
import Navbar from "../../components/Navbar/Navbar";
import { Footer } from "../../components/Footer/Footer";
import search from "../../utils/Search.svg";
import { useState } from "react";
import { images } from "../../utils/Images";
import { useNavigate } from "react-router-dom";
import Pagination from "https://cdn.skypack.dev/rc-pagination@3.1.15";
import { useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../../components/Loader/Loader";
import { motion } from "framer-motion";
import {
  addToFavorites,
  removeFromFavorites,
  getProducts,
} from "../../store/reducers/cartSlice";

import "swiper/css";
import UsecreateApi from "../../utils/Hooks/post";
import axios from "axios";
// import {getData}

// let Dummy_Products = [
//   { id: 1, image: images.product1, price: 10, fav: false, title: "Watch" },
//   {
//     id: 2,
//     image: images.product2,
//     price: 20,
//     fav: false,
//     title: "head Phones",
//   },
//   { id: 3, image: images.product3, price: 20, fav: false, title: "VR" },
//   { id: 4, image: images.product4, price: 20, fav: false, title: "Ear pods" },
//   { id: 5, image: images.product1, price: 10, fav: false, title: "Watch" },
//   {
//     id: 6,
//     image: images.product2,
//     price: 20,
//     fav: true,
//     title: "head Phones",
//   },
//   { id: 7, image: images.product3, price: 20, fav: false, title: "VR" },
//   { id: 8, image: images.product4, price: 20, fav: false, title: "Ear pods" },
// ];

const Categroies = [
  {
    title: "iphone",
    image: images.phone,
  },
  {
    title: "HeadPhone",
    image: images.headPhones,
  },
  {
    title: "Laptop",
    image: images.laptop,
  },
  {
    title: "iphone",
    image: images.phone,
  },
  {
    title: "HeadPhone",
    image: images.headPhones,
  },
  {
    title: "Laptop",
    image: images.laptop,
  },
  {
    title: "iphone",
    image: images.phone,
  },
  {
    title: "HeadPhone",
    image: images.headPhones,
  },
  {
    title: "Laptop",
    image: images.laptop,
  },
  {
    title: "iphone",
    image: images.phone,
  },
  {
    title: "HeadPhone",
    image: images.headPhones,
  },
  {
    title: "Laptop",
    image: images.laptop,
  },
];
export const FilterPage = () => {
  const Products = useSelector((state) => state.cart.products);
  const [query, setQuery] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 870);
  // const [fetctedData, setFetchedData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;

  const dispatch = useDispatch();
  const { getData } = UsecreateApi();

  const onAddTOCart = (product) => {
    // navigate("/product", { state: product, query: query });
    navigate("/product", {
      state: {
        product: product,
        query: query,
      },
    });
  };

  const onAddOrRemoveFav = (product) => {
    if (false) {
      dispatch(removeFromFavorites(product));
    } else {
      dispatch(addToFavorites(product));
      // navigate("/favorite");

      alert("added to Favorites");
    }
  };

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

  const [products, setProducts] = useState([]);

  // PAGINATION FROM HERE

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Loader
  const [isLoading, setIsLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState({});

  const fetchData = async () => {
    const SearchQuery = query?.replace(/\s/g, "_");
    console.log("search Query", SearchQuery);
    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://localhost:5000/api/v2/products`,
        {
          params: {
            keyword: SearchQuery,
            page: currentPage,
            pageSize: 10,
          },
        }
      );

      setProducts(response.data.results);
      setTotalPages(response.data.totalPages);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  const onSubmitHandler = () => {
    fetchData();
    window.scrollTo(0, 0);
  };

  // useEffect(() => {
  //   // if () {
  //   // }
  // }, [currentPage, query]);

  const handleChangeQuery = (item) => {
    // setSearchKeyword(item.title);
    setQuery(item);
    setCurrentPage(1);
    window.scrollTo(0, 0);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    fetchData();
    window.scrollTo(0, 0);
  };

  const truncateTilte = (title, maxLength) => {
    if (title.length > maxLength) {
      return title.substring(0, maxLength) + "...";
    }
    return title;
  };

  // const filterData = Categroies.filter((i) => i.title.includes(query));
  return (
    <div>
      <Navbar
        setQuery={(i) => handleChangeQuery(i)}
        query={query}
        showSearch={true}
        handleOnSubmit={onSubmitHandler}
      ></Navbar>
      <Loader isLoading={isLoading}></Loader>
      <div className={classes.wrapper}>
        <div className={classes.inputContainer}></div>

        <div className={classes.searchContainer}>
          <div>Please search for the products you desire.</div>
        </div>

        <div className={classes.itemsContainer}>
          <div className={classes.productContainer}>
            {isMobile
              ? // ? Products?.map((product, index) => {
                products?.map((product, index) => {
                  // ? Dummy_Products.map((product, index) => {
                  return (
                    <div
                      key={index}
                      className={classes.mobileproductItemContainer}
                    >
                      <div className={classes.mobileProductImageContainer}>
                        <img
                          className={classes.mobileProductImage}
                          src={product?.image}
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
                          ></div>
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
                              {/* {product.title} */}
                              {/* {truncateTilte(product.title)} */}
                            </div>
                          </div>
                        </div>

                        <div className={classes.itemControls}>
                          <div className={classes.mobilepriceContainer}>
                            <div className={classes.discountedPriceContainer}>
                              {/* <div className={classes.mobilediscountedPrice}>
                                ${product.price - 5}
                              </div> */}
                              <div className={classes.DiscountedContainer}>
                                <div className={classes.mobilePrice}>
                                  {product?.price}
                                </div>
                                {/* <div
                                  className={classes.mobileDiscountPercentage}
                                >
                                  20%
                                </div> */}
                              </div>
                            </div>
                          </div>
                          <motion.button
                            key={"id5"}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => onAddTOCart(product)}
                            className={classes.mobilebtnAddToCart}
                          >
                            ADD TO CART
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  );
                })
              : products?.map((product, index) => {
                  return (
                    <div key={index} className={classes.productItemContainer}>
                      <div className={classes.productImage}>
                        <img
                          className={classes.productImage}
                          src={product.image}
                        />
                      </div>

                      <div className={classes.productInfo}>
                        <div className={classes.itemHeadingContainer}>
                          <div
                            style={{
                              textAlign: "start",
                              fontWeight: "bold",
                              fontSize: "1.2vw",

                              height: "8vw",
                              width: "12vw",
                            }}
                            className={classes.catgoriesText}
                          >
                            {truncateTilte(product.title, 25)}
                          </div>
                        </div>
                        <div className={classes.priceContainer}>
                          <div className={classes.discountedPrice}></div>
                          <div className={classes.price}>{product.price}</div>
                        </div>

                        <div className={classes.itemControls}>
                          <motion.button
                            key={"id6"}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => onAddTOCart(product)}
                            className={classes.btnAddToCart}
                          >
                            Add to Cart
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>

        <div>
          <motion.button
            key={"id7"}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            className={classes.PaginationButton}
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            {"<<"}
          </motion.button>

          {Array.from({ length: totalPages }, (_, index) => (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              className={classes.pageContainer}
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              disabled={currentPage === index + 1}
            >
              {index + 1}
            </motion.button>
          ))}
          <motion.button
            key={"id10"}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            className={classes.PaginationButton}
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            {">>"}
          </motion.button>
        </div>
        {isMobile && <div className={classes.moreContent}></div>}

        <Footer></Footer>
      </div>
    </div>
  );
};
