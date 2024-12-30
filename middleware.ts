import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

//protect authenticated routes
export default async function middleware(req: NextRequest) {
  const token = await getToken({
    req: req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const isAuthenticated = token ? true : false;
  const pathSegments = req.nextUrl.pathname.split("/");

  if (
    !isAuthenticated &&
    (pathSegments[1] == "home" || pathSegments[1] == "dashboard") // Unauthenticated user
  ) {
    const loginPath = "/auth";
    const loginURL = new URL(loginPath, req.nextUrl.origin);
    return NextResponse.redirect(loginURL.toString());
  }
  if (isAuthenticated && pathSegments[1] == "/auth") {
    const newURL = new URL("/home", req.nextUrl.origin);
    return NextResponse.redirect(newURL.toString());
  }
  // Allow user to access their profile
  return NextResponse.next();
}
