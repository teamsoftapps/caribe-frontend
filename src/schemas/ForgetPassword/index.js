import * as yup from "yup";

export const forgetSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Please Enter your Email")
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email format"
    ),
});
