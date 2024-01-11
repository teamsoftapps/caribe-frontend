/** @format */

import "./Login.css";
// import { CaribLogo } from "../../utils/CaribLogo";

import carib from "../../../utils/carib.svg";
import React, { useState, useEffect } from "react";
import { images } from "../../../utils/Images";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { loginSchema } from "../../../schemas/LoginSchema";
import { Modal, Typography, Box, Snackbar, Slide } from "@mui/material";
import { motion } from "framer-motion";
import MuiAlert from "@mui/material/Alert";
import { login } from "../../../store/reducers/authSlice";
import { useDispatch, useSelector } from "react-redux";

import { setToken } from "../../../store/reducers/authSlice";

export default function Login() {
  const Alert = React.forwardRef(function Alert(props, ref) {
    return (
      <MuiAlert elevation={6} ref={ref} variant="filled" {...props}></MuiAlert>
    );
  });
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [success, setsuccuss] = useState("");
  const isError = useSelector((state) => state.auth?.error);

  const onLoginSuccess = async () => {
    const loginData = {
      email: values.email,
      password: values.password,
    };

    let temp = true;
    if (temp) {
      setIsLoading(true);
      const res = await dispatch(login(loginData));

      if (isError) {
        setIsLoading(false);
        setShowAlert(true);
        setError(isError);
      }
      if (res?.payload?.data?._id) {
        setIsLoading(false);
        setShowAlert(true);
        setsuccuss("Login success");
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 2000);
      } else {
        setIsLoading(false);
        setError(isError);
        setShowAlert(true);
      }
    }
  };
  const initialValues = {
    email: "",
    password: "",
  };

  const { errors, touched, handleBlur, handleChange, handleSubmit, values } =
    useFormik({
      validationSchema: loginSchema,
      initialValues: initialValues,
      onSubmit: (values, action) => {
        action.resetForm();
        onLoginSuccess(values);
      },
    });
  const handleClick = (e) => {
    e.preventDefault();
  };
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 620);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 620);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const navigate = useNavigate();

  const onSignup = () => {
    navigate("/signup");
  };

  const onForgetPassword = () => {
    navigate("/forgetpassword");
  };

  const invalitStyle = {
    color: "red",
    textAlign: "start",
    fontSize: "1.2vh",
  };
  return (
    <div className="container">
      <div className="header">
        <div className="logo">
          <img className="image" src={carib} alt="caribE logo"></img>
        </div>
      </div>

      <div className={isMobile ? "" : "login"}>
        {/* <div> */}
        <div className="loginContainer">
          <form
            className={isMobile ? "loginMblbox" : "loginBox"}
            onSubmit={handleClick}
          >
            <div className="heading">Login</div>
            <div>
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
              <div className="inputContainer"></div>
              <p onClick={onForgetPassword} className="forget">
                forget password?
              </p>
            </div>
            <motion.button
              key={"id1"}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleSubmit}
              className="loginButton"
              type="submit"
              disabled={false}
            >
              Log in
            </motion.button>
            {/* <button></button> */}
            <span onClick={onSignup} className="signup">
              Create a new account?
              <span onClick={onSignup} className="changeMode">
                Signup
              </span>
            </span>
          </form>
        </div>
      </div>

      {!isLoading ? (
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
            >
              Loading...
            </Typography>
          </Box>
        </Modal>
      )}
    </div>
  );
}
