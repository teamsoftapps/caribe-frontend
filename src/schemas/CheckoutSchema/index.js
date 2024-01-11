import * as yup from "yup";

const schema = yup.object({
  address: yup
    .string()
    .required("Shipping address is required")
    .min(5, "Address should be at least 5 characters")
    .max(100, "Address should not exceed 100 characters"),

  city: yup
    .string()
    .required("City is required")
    .matches(
      /^[A-Za-z\s]+$/,
      "City name should only contain letters and spaces"
    )
    .min(2, "City should be at least 2 characters")
    .max(50, "City should not exceed 50 characters"),
  state: yup
    .string()
    .required("State/Province is required")
    .matches(
      /^[A-Za-z\s]+$/,
      "State/Province should contain letters and spaces"
    )
    .min(3, "State/Province name should be at least 3 characters")
    .max(50, "State/Province name should not exceed 50 characters"),
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .matches(/^[0-9]*$/, "Phone number can only contain digits")
    .min(10, "Phone number must be at least 10 digits")
    .max(10, "Phone number cannot exceed 10 digits"),
});

export default schema;
