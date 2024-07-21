import { getJWTSecret, isValidUserPayload } from "@/lib";
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { User } from "./types";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("session_token")?.value;

  const verifiedToken =
    token && (await validateToken(token).catch((error) => console.log(error)));
  const pathNameStartsWith = (path: string) =>
    request.nextUrl.pathname.startsWith(path);

  if (
    pathNameStartsWith("/login") ||
    (pathNameStartsWith("/register") && !verifiedToken)
  ) {
    return;
  }

  if (!verifiedToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  updateSession();
}

const validateToken = async (token: string) => {
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

const updateSession = () => {};

export const getSession = async () => {
  const token = cookies().get("session_token")?.value;
  if (!token) return null;
  return await validateToken(token);
};

export const config = {
  matcher: ["/contact-list"],
};
