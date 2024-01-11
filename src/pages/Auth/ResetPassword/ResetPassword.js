/** @format */

import React from "react";
import classes from "./ResetPassword.module.css";
import { CustomInput } from "../../../common/Input/CustomInput";
import { useNavigate } from "react-router-dom";
import carib from "../../../utils/carib.svg";
import { useFormik } from "formik";
import { resetSchema } from "../../../schemas/ResetPassword";
import { useState, useEffect } from "react";
import UsecreateApi from "../../../utils/Hooks/post";
import { useSelector } from "react-redux";
import { Modal, Typography, Box, Snackbar, Slide } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { makeStyles } from "@mui/styles";
import { images } from "../../../utils/Images";

export const ResetPassword = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 400);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [success, setsuccuss] = useState("");
  const { UsePatchPrams } = UsecreateApi();
  const id = useSelector((state) => state.auth.res_Id);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 400);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const navigate = useNavigate();
 

  const initialValues = {
    resetPasswordVerificationCode: "",
    password: "",
  };

  const invalitStyle = {
    color: "red",
    textAlign: "start",
    fontSize: "1.4vh",
    marginLeft: "2vh",
  };
  let inputStyles = {
    height: "5vh",
    borderRadius: "1vh",
  };

  if (isMobile) {
    inputStyles = {
      height: "11vw",
      borderRadius: "1vh",
      width: "85%",
    };
  }
  const { errors, touched, handleBlur, handleChange, handleSubmit, values } =
    useFormik({
      validationSchema: resetSchema,
      initialValues: initialValues,
      onSubmit: (values, action) => {
        // alert('Password Reset successfully');
        ResetPass(values);
        action.resetForm();
        // onResetPassword();
      },
    });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const ResetPass = async (body) => {
    let temp = true;
    if (temp) {
      setIsLoading(true);
      const response = await UsePatchPrams("Reset_password", id, body);
      let response_Error = response?.response?.data?.message;
      let response_Data = response?.data?.message;
      if (response_Error) {
        setIsLoading(false);
        setShowAlert(true);
        setError(response_Error);
      } else {
        setIsLoading(false);
        setShowAlert(true);
        setsuccuss(response_Data);
        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 2000);
      }
    }
  };

  return (
    <div className={classes.mainContainer}>
      <div className={classes.navBar}>
        <img className={classes.image} src={carib} alt="caribE logo"></img>
      </div>
      <div className={classes.screen}>
        <div className={classes.form}>
          <div className={classes.title}>Reset Password</div>

          <CustomInput
            invalitStyle={invalitStyle}
            errors={errors.password}
            name={"password"}
            onBlur={handleBlur}
            onChange={handleChange}
            touched={touched.password}
            value={values.password}
            id={"password"}
            placeholder={" New Password"}
            inputstyle={inputStyles}
            containerStyle={{ width: "25vw" }}
          ></CustomInput>
          <CustomInput
            invalitStyle={invalitStyle}
            errors={errors.resetPasswordVerificationCode}
            name={"resetPasswordVerificationCode"}
            onBlur={handleBlur}
            onChange={handleChange}
            touched={touched.resetPasswordVerificationCode}
            value={values.resetPasswordVerificationCode}
            id={"resetPasswordVerificationCode"}
            placeholder={"Verification code"}
            inputstyle={inputStyles}
            containerStyle={{ width: "25vw" }}
          ></CustomInput>
          <button
            onClick={handleSubmit}
            className={classes.resetButton}
            type="submit"
          >
            Confirm Reset Password
          </button>
        </div>

        <div className={classes.screen}></div>
      </div>

      {isLoading === false ? (
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
};
