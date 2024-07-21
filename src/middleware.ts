import { updateSession, validateToken } from "@/lib";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

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

  return await updateSession(request);
}

export const logout = async () => {
  cookies().set("session_token", "", { expires: new Date(0) });
};

export const getSession = async () => {
  const token = cookies().get("session_token")?.value;
  if (!token) return null;
  return await validateToken(token);
};

export const config = {
  matcher: ["/contact-list"],
};
