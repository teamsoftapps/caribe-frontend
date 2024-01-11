/** @format */

import React from "react";
import classes from "./ForgetPassword.module.css";
import { CustomInput } from "../../../common/Input/CustomInput";
import { useNavigate } from "react-router-dom";
import carib from "../../../utils/carib.svg";
import { useFormik } from "formik";
import { forgetSchema } from "../../../schemas/ForgetPassword";
import { useState, useEffect } from "react";
import UsecreateApi from "../../../utils/Hooks/post";
import { Modal, Typography, Box, Snackbar, Slide } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { makeStyles } from "@mui/styles";
import { images } from "../../../utils/Images";
import { useDispatch } from "react-redux";
import { setforgetid } from "../../../store/reducers/authSlice";
export const ForgetPassword = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 400);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [success, setsuccuss] = useState("");
  const { UsePostAuthData } = UsecreateApi();
  const dispatch = useDispatch();
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 400);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
  const onResetPassword = () => {
    navigate("/resetpassword");
  };
  const initialValues = { email: "" };
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
  const { handleBlur, errors, touched, values, handleChange, handleSubmit } =
    useFormik({
      validationSchema: forgetSchema,
      initialValues: initialValues,
      onSubmit: (values, action) => {
        handleForgetpassword(values);
        action.resetForm();
      },
    });
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleForgetpassword = async (body) => {
    let temp = true;
    if (temp) {
      setIsLoading(true);
      const response = await UsePostAuthData("forget_password", body);

      let response_Error = response?.response?.data?.message;
      let response_Data = response?.data?.message;
      if (response_Error) {
        setIsLoading(false);
        setShowAlert(true);
        setError(response_Error);
      } else {
        setIsLoading(false);
        setShowAlert(true);
        setsuccuss(response_Data + "Check your Email");
        await dispatch(setforgetid(response?.data?.data?.id));
        setTimeout(() => {
          navigate("/resetpassword", { replace: true });
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
          <div className={classes.title}>Forget Password</div>
          <CustomInput
            invalitStyle={invalitStyle}
            errors={errors.email}
            id={"email"}
            name={"email"}
            onBlur={handleBlur}
            value={values.email}
            onChange={handleChange}
            touched={touched.email}
            placeholder={"Email"}
            inputstyle={inputStyles}
            containerStyle={{ width: "25vw" }}
          ></CustomInput>
          <button
            onClick={handleSubmit}
            className={classes.resetButton}
            type="submit"
          >
            Reset Password
          </button>
        </div>

        <div className={classes.screen}></div>
      </div>
      {isLoading === false ? (
        <Snackbar
          TransitionComponent={Slide}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={showAlert}
          autoHideDuration={8000}
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
