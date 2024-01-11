import * as yup from "yup";

const paymentSchema = yup.object({
  cardnumber: yup
    .string()
    .required("Card number is required")
    .matches(/^\d{16}$/, "Card number must be 16 digits"),

  name: yup
    .string()
    .required("Name on Card is required")
    .matches(/^[A-Za-z\s]+$/, "Name should only contain letters and spaces"),

  securitycode: yup
    .string()
    .required("Security code is required")
    .matches(/^\d{3,4}$/, "Security code must be 3 or 4 digits"),

  expiration: yup
    .string()
    .required("Expiration is required")
    .matches(
      /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/,
      "Invalid expiration date format (MM/YYYY or MM/YY)"
    ),
});

export default paymentSchema;
