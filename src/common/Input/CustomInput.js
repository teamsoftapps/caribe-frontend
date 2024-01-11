import React from "react";
import classes from "./CustomInput.module.css";

export const CustomInput = ({
  placeholder,
  addionalStyles,
  inputstyle,
  value,
  onChange,
  onBlur,
  id,
  name,
  invalitStyle,
  touched,
  errors,
  heading,
  headingstyle,
  containerStyle,
  isMobile,
}) => {
  let additionalMobileStyles;
  if (isMobile) {
    additionalMobileStyles = {
      height: "13vw",
    };
  }

  return (
    <div
      className={classes.inputContainer}
      style={{ ...inputstyle, ...additionalMobileStyles }}
    >
      {heading && (
        <div>
          <p style={headingstyle}>{heading}</p>
        </div>
      )}
      <input
        id={id}
        name={name}
        onBlur={onBlur}
        className={`${classes.input} `}
        style={inputstyle}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />

      {touched && errors ? <div style={invalitStyle}>{errors}</div> : ""}
    </div>
  );
};
