import * as yup from "yup";

export const signupSchema = yup.object({
  firstname: yup
    .string()
    .required("Please enter your firstname")
    .matches(
      /^[A-Za-z]+$/,
      "Firstname should contain only alphabetic characters"
    ),
  lastname: yup
    .string()
    .required("Please enter your lastname")
    .matches(
      /^[A-Za-z]+$/,
      "Lastname should contain only alphabetic characters"
    ),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Please enter your email")
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email format"
    ),

  password: yup
    .string()
    .required("Please enter your password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 6 characters long"
    ),
});
