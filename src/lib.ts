import * as yup from "yup";

export const SERVER_URL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_API_URL_PROD
    : process.env.NEXT_PUBLIC_API_URL_DEV;

export const loginValidationSchema = yup.object().shape({
  email: yup.string().required("Username is required!"),
  password: yup.string().required("Password is required!"),
});
