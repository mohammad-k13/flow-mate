import NextAuth from "next-auth";
import NextAuthConfig from "./auth-config";

const { auth } = NextAuth(NextAuthConfig);

export default auth(async (req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  // Immediate redirect for /dashboard/workflows/editor to /dashboard/workflows
  if (nextUrl.pathname === "/dashboard/workflows/editor") {
    return Response.redirect(new URL("/dashboard/workflows", nextUrl));
  }

  // Redirect to login if not logged in and accessing dashboard
  const isUserInDashboard = nextUrl.pathname.startsWith("/dashboard");
  if (!isLoggedIn && isUserInDashboard) {
    return Response.redirect(new URL("/login", nextUrl));
  }
});

export const config = {
  matcher: [
    // Exclude static assets and certain file types
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Apply middleware to API routes, dashboard, and workflows
    "/(api|trpc)(.*)",
    "/dashboard/:path*",
  ],
};