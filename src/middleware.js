
import { NextResponse } from "next/server";
import { AUTH_KEY } from "./constants/keys";

export async function middleware(request) {
  const adminAccessToken = request.cookies.get(AUTH_KEY)?.value;
  const pathname = request.nextUrl.pathname;

  // Redirect users without access tokens away from the home page ("/")
  if (pathname === "/" && !adminAccessToken) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // Redirect logged-in users away from the login page ("/signin")
  if (pathname === "/signin" && adminAccessToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Allow access to all other routes
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/signin", "/:path*"], // Match all routes
};
