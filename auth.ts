import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { withBasePath } from "@/lib/basePath";

const adminEmails = new Set<string>(["kamryun@gmail.com"]);

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  pages: {
    signIn: withBasePath("/login"),
  },
  callbacks: {
    async signIn({ user }) {
      const email = user.email ?? "";
      return adminEmails.has(email);
    },
  },
};