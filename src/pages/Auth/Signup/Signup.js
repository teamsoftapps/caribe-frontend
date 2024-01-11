/** @format */

import "./Signup.css";

import carib from "../../../utils/carib.svg";
import { images } from "../../../utils/Images";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { signupSchema } from "../../../schemas/SignupSchema";
import { useDispatch } from "react-redux";
import { makeStyles } from "@mui/styles";
import CircularProgress from "@mui/material/CircularProgress";
import { Modal, Typography, Box, Snackbar, Slide } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
// import { motion } from "@mui/material-next";
import { motion } from "framer-motion";
import UsecreateApi from "../../../utils/Hooks/post";
const useStyles = makeStyles((theme) => ({
  blackColor: {
    color: "black",
  },
}));

export default function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [success, setsuccuss] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { UsePostAuthData } = UsecreateApi();
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  };

  const invalitStyle = {
    color: "red",
    textAlign: "start",
    fontSize: "1.2vh",
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      onSubmit: (values, action) => {
        onSuccessSignup(values);
      },
      validationSchema: signupSchema,
    });
  const handleClick = (e) => {
    e.preventDefault();
  };
  const onSuccessSignup = async (values) => {
    let temp = true;
    if (temp) {
      setIsLoading(true);
      const response = await UsePostAuthData("signup", values);
      let response_Error = response?.response?.data;
      let response_Data = response?.data;
      if (response_Error) {
        setIsLoading(false);
        setShowAlert(true);
        setError(response_Error?.error);
      } else {
        setIsLoading(false);
        setShowAlert(true);
        setError(null);
        setsuccuss(response_Data?.message);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    }
  };
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmpasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 870);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 870);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const onLogin = () => {
    navigate("/login");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const classes = useStyles();

  return (
    <div className="container">
      <>
        <div className="header">
          <div className="logo">
            <img className="image" src={carib} alt="caribE logo"></img>
          </div>
        </div>
        <div className={isMobile ? "" : "login"}>
          <div className="loginContainer">
            <form
              className={isMobile ? "loginMblbox" : "loginBox"}
              onSubmit={handleClick}
            >
              <div className="heading">Signup</div>
              <div>
                <div className="inputContainer">
                  <label className="labels" htmlFor="firstname">
                    First name
                  </label>
                  <input
                    name="firstname"
                    value={values.firstname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="firstname"
                    placeholder="Firstname"
                    type="text"
                    required
                    className="loginInput"
                  />
                </div>
                {touched.firstname && errors.firstname ? (
                  <div style={invalitStyle}>{errors.firstname}</div>
                ) : (
                  ""
                )}
                <div className="inputContainer">
                  <label className="labels" htmlFor="lastname">
                    Last name
                  </label>
                  <input
                    name="lastname"
                    value={values.lastname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="lastname"
                    placeholder="Lastname"
                    type="text"
                    required
                    className="loginInput"
                  />
                  {touched.lastname && errors.lastname ? (
                    <div style={invalitStyle}>{errors.lastname}</div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="inputContainer">
                  <label className="labels" htmlFor="email">
                    Email
                  </label>
                  <input
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="email"
                    placeholder="Email"
                    type="email"
                    required
                    className="loginInput"
                  />
                  {touched.email && errors.email ? (
                    <div style={invalitStyle}>{errors.email}</div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="inputContainer">
                  <label className="labels" htmlFor="password">
                    Password
                  </label>

                  <input
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="password"
                    placeholder="Password"
                    type={passwordVisible ? "text" : "password"}
                    required
                    className="loginInput"
                  />
                  {touched.password && errors.password ? (
                    <div style={invalitStyle}>{errors.password}</div>
                  ) : (
                    ""
                  )}

                  <img
                    onClick={togglePasswordVisibility}
                    src={passwordVisible ? images.Showeye : images.Hideeye}
                    className="PassEye"
                  ></img>
                </div>
              </div>
              <motion.button
                key={"id2"}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleSubmit}
                className="loginButton"
                type="submit"
                disabled={false}
              >
                Signup
              </motion.button>

              <span onClick={onLogin} className="signup">
                Already have an account?
                <span onClick={onLogin} className="changeMode">
                  Login
                </span>
              </span>
            </form>
          </div>
        </div>
      </>

      {!isLoading === true ? (
        <Snackbar
          TransitionComponent={Slide}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={showAlert}
          autoHideDuration={6000}
          onClose={() => setShowAlert(false)}
        >
          <Alert
            onClose={() => setShowAlert(false)}
            severity={error ? "warning" : "success"}
            sx={{ width: "100%", marginTop: "11vw" }}
          >
            {error ? error : success}
          </Alert>
        </Snackbar>
      ) : (
        <Modal
          hideBackdrop={true}
          // hideBackdrop={true}
          open={isLoading}
          onClose={() => setShowModal(!showModal)}
          sx={{ backgroundColor: "#00000056" }}
          className="ProgressContainer"
        >
          <Box
            style={{
              gap: "1vw",
            }}
            className="modalContent"
          >
            <Box className="spinnerContainer">
              <img className="image rotate" src={images.caribicon}></img>
            </Box>
            <Typography
              id="modal-modal-title"
              variant="h8" // fontweight
              component="h2" // fontsize
              // sx={{ mt: 10 }}
            >
              Loading...
            </Typography>
          </Box>
        </Modal>
      )}

      {/* </Box> */}
    </div>
  );
}
