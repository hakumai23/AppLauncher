import { withAuth } from "next-auth/middleware";
import { APP_BASE_PATH } from "./app/constant";
export default withAuth(
  function middleware() {
  },
  {
    pages: {
      signIn: APP_BASE_PATH + "/login",
    },
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  },
);

export const config = {
  matcher: ["/apps/admin/:path*","/apps/data/adminapps.json"],
};