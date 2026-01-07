import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware() {
  },
  {
    pages: {
      signIn: "/login",
    },
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  },
);

export const config = {
  matcher: ["/admin/:path*","/data/adminapps.json"],
};