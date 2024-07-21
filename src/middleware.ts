import { updateSession, validateToken } from "@/lib";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("session_token")?.value;

  const verifiedToken = token
    ? await validateToken(token).catch(console.log)
    : null;
  const pathNameStartsWith = (path: string) =>
    request.nextUrl.pathname.startsWith(path);

  if (pathNameStartsWith("/login")) {
    if (verifiedToken) {
      return NextResponse.redirect(new URL("/contact-list", request.url));
    }
    return NextResponse.next(); // Allow access to the login page if not logged in
  }

  if (!verifiedToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Update session to refresh token expiration
  await updateSession(request);

  return NextResponse.next();
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
  matcher: ["/contact-list", "/login"],
};
