import * as yup from "yup";
import { serialize } from "cookie";
import { User } from "./types";
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify, SignJWT } from "jose";

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
    "phoneNumber" in payload &&
    "_id" in payload &&
    "exp" in payload
  );
};

export async function updateSession(request: NextRequest) {
  const token = request.cookies.get("session_token")?.value;
  if (!token) return;

  // Verify and extract the payload
  const { payload } = await jwtVerify(
    token,
    new TextEncoder().encode(getJWTSecret())
  );
  if (!payload) return;

  // Update the expiration time
  payload.exp = Math.floor(Date.now() / 1000) + 10 * 60; // 10 minutes from now

  // Re-sign the token with the updated payload
  const newToken = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setJti(payload.jti || "")
    .setIssuedAt()
    .setExpirationTime("10m")
    .sign(new TextEncoder().encode(getJWTSecret()));

  // Create the response and set the new token
  const res = NextResponse.next();
  res.cookies.set({
    name: "session_token",
    value: newToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 10 * 60, // 10 minutes
    path: "/",
  });

  return res;
}

export const validateToken = async (token: string) => {
  try {
    const result = await jwtVerify(
      token,
      new TextEncoder().encode(getJWTSecret())
    );

    // Type assertion with validation
    if (isValidUserPayload(result.payload)) {
      return result.payload as User;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};
