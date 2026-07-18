import { NextRequest, NextResponse } from "next/server";
import { authClient } from "./lib/auth-client";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const { data: session } = await authClient.getSession({
    fetchOptions: {
      headers: request.headers,
    },
  });

  const isAuthPage =
    pathname.startsWith("/login") || pathname.startsWith("/register");

  const isProtectedRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/about") ||
    pathname.startsWith("/onboarding");

  // User is not logged in
  if (!session && isProtectedRoute) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // User is already logged in
  if (session && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/onboarding",
    "/about/:path*",
    "/dashboard/:path*",
  ],
};
