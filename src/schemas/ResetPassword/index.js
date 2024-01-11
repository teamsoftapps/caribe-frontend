/** @format */

import * as yup from "yup";

export const resetSchema = yup.object({
  resetPasswordVerificationCode: yup
    .string()
    .required("Please Enter your verification code"),

  password: yup
    .string()
    .required("Please Enter your new password")
    .min(8, "Password should be at least 8 characters")
    .max(50, "Password should not exceed 50 characters")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 6 characters long"
    ),
});
