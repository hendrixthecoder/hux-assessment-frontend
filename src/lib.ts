import * as yup from "yup";
import { serialize } from "cookie";
import { User } from "./types";

export const SERVER_URL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_API_URL_PROD
    : process.env.NEXT_PUBLIC_API_URL_DEV;

export const loginValidationSchema = yup.object().shape({
  email: yup.string().required("Email is required!"),
  password: yup.string().required("Password is required!"),
});

export const registerValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required!")
    .min(1, "Email is required!"),
  password: yup
    .string()
    .required("Password is required!")
    .min(6, "Password should be more than 6 characters"),
  firstName: yup
    .string()
    .required("First name is required!")
    .min(1, "Email is required!"),
  lastName: yup
    .string()
    .required("Last name is required!")
    .min(1, "Email is required!"),
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9]{10,12}$/, "Phone number must be between 10 and 12 digits"),
});

export const createCookieWith = (token: string) => {
  const MAX_AGE = 60 * 60 * 24 * 30;

  return serialize("session_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: MAX_AGE,
    path: "/",
  });
};

export const getJWTSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("No JWT Secret provided!");

  return secret;
};

export const isValidUserPayload = (payload: any): payload is User => {
  return (
    payload &&
    typeof payload === "object" &&
    "email" in payload &&
    "firstName" in payload &&
    "lastName" in payload &&
    "phoneNumber" in payload
  );
};
