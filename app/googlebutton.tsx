"use client";
import { Roboto } from "next/font/google";
import { signIn } from "next-auth/react";
export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500"],
});
type ButtonProps = {
  onClick?: () => void;
};

export function GoogleButton({
  onClick = () => signIn("google"),
}: ButtonProps) {
  return (
    <button type="button" onClick={onClick}>
      <div className="flex items-center h-10 text-white dark:text-black bg-black dark:bg-white rounded-full  dark:hover:bg-gray-200 hover:bg-gray-800 cursor-pointer">
        <img
          src="/google.png"
          alt="Google Logo"
          className="h-5 w-5 m-2.5 ml-3"
        />
        <span
          className={`${roboto.className} text-sm font-medium leading-5 tracking-[0.1px] mr-3`}
        >
          Sign in with Google
        </span>
      </div>
    </button>
  );
}
