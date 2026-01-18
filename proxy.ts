import { withAuth } from "next-auth/middleware";
import { withBasePath } from "@/lib/basePath";

export default withAuth(
  function proxy() {
  },
  {
    pages: {
      signIn: withBasePath("/login"),
    },
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  },
);

export const config = {
  matcher: [
    "/admin/:path*",
    "/data/adminapps.json",
    "/launcher/admin/:path*",
    "/launcher/data/adminapps.json",
  ],
};