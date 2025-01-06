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
    pathSegments[1] == "dashboard" // Unauthenticated user
  ) {
    const loginPath = "/auth";
    const loginURL = new URL(loginPath, req.nextUrl.origin);
    return NextResponse.redirect(loginURL.toString()); //redirect to login page
  }
  if (isAuthenticated && pathSegments[1] == "/auth") {
    //authenticated user
    const newURL = new URL("/dashboard", req.nextUrl.origin);
    return NextResponse.redirect(newURL.toString()); //redirect to user's dashboard
  }
  // Allow user to access their profile
  return NextResponse.next();
}
