import NextAuth from "next-auth";
import NextAuthConfig from "./auth-config";
import { NextRequest } from "next/server";

const { auth } = NextAuth(NextAuthConfig);

export default auth(async (req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  
  const isUserInDashboard = nextUrl.pathname.startsWith("/dashboard");
  if(!isLoggedIn && isUserInDashboard) {
    return Response.redirect(new URL("/login", nextUrl))
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
    "/dashboard/:path*",
  ],
};
