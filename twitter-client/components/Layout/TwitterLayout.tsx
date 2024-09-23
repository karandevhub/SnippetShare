"use client";
import React, { useCallback } from "react";
import { FaTwitter } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { IoSearch } from "react-icons/io5";
import { CgMoreO } from "react-icons/cg";
import { IoMdNotificationsOutline } from "react-icons/io";
import { TbMessageSearch } from "react-icons/tb";
import { FaRegBookmark } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import GoogleLoginButton from "@/components/GoogleLoginButton/GoogleLoginButton";
import { CredentialResponse } from "@react-oauth/google";
import toast from "react-hot-toast";
import { graphQLClient } from "@/client/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { useCurrentUser } from "@/hooks/user";
import { useQueryClient } from "react-query";

interface TwitterSidebarButton {
  title: string;
  icon: React.ReactNode;
}

interface VerifyGoogleTokenResponseTypes {
  verifyGoogleToken: string;
}

interface TwitterLayoutProps {
  children: React.ReactNode;
}

const twitterSidebarButtons: TwitterSidebarButton[] = [
  { title: "Home", icon: <AiFillHome className="text-3xl" /> },
  { title: "Explore", icon: <IoSearch className="text-3xl" /> },
  { title: "Notifications", icon: <IoMdNotificationsOutline className="text-3xl" /> },
  { title: "Messages", icon: <TbMessageSearch className="text-3xl" /> },
  { title: "Bookmarks", icon: <FaRegBookmark className="text-3xl" /> },
  { title: "Profile", icon: <CgProfile className="text-3xl" /> },
  { title: "More", icon: <CgMoreO className="text-3xl" /> },
];

const TwitterLayout: React.FC<TwitterLayoutProps> = (props) => {
  const { user } = useCurrentUser();
  const queryClient = useQueryClient();

  const handleLoginWithGoogle = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;
      if (!googleToken) return toast.error("Google token not found");

      try {
        const { verifyGoogleToken } = await graphQLClient.request<VerifyGoogleTokenResponseTypes>(
          verifyUserGoogleTokenQuery,
          { token: googleToken }
        );

        toast.success("Google token verified successfully");
        localStorage.setItem("google_token", verifyGoogleToken);
        await queryClient.invalidateQueries(["current-user"]);
      } catch (error) {
        toast.error("Failed to verify Google token");
      }
    },
    [queryClient]
  );

  const handleLogout = async () => {
    localStorage.removeItem("google_token");
    await queryClient.invalidateQueries(["current-user"]);
    toast.success("Logged out");
  };

  return (
    <div className="grid grid-cols-12 h-screen w-screen">
      {/* Left Sidebar: Shrinks to icons in mobile view */}
      <div className="col-span-2 md:col-span-3 h-screen pt-3 flex flex-col items-center space-y-3">
        <div className="hover:bg-gray-600 hover:bg-opacity-50 w-fit p-3 rounded-full transition-all cursor-pointer">
          <FaTwitter className="text-3xl" />
        </div>
        <ul className="space-y-5">
          {twitterSidebarButtons.map((item, index) => (
            <li
              key={index}
              className="group flex flex-col items-center space-y-1 hover:bg-gray-600 hover:bg-opacity-50 p-2 rounded-full transition-all cursor-pointer"
            >
              <span className="text-3xl">{item.icon}</span>
              <span className="hidden md:inline text-sm group-hover:font-semibold">{item.title}</span>
            </li>
          ))}
        </ul>
        <button className="bg-blue-500 hover:bg-blue-600 rounded-full py-2 px-6 font-semibold hidden md:block">
          Post
        </button>
      </div>

      {/* Main Feed: Adjusts to fill space in mobile, centered in desktop */}
      <div className="col-span-10 md:col-span-6 border-l border-gray-600 border-r h-screen overflow-scroll no-scrollbar">
        {props.children}
      </div>

      {/* Right Sidebar: Hidden in mobile, visible in desktop */}
      <div className="hidden md:block md:col-span-3 p-5">
        {!user ? (
          <div className="flex flex-col border border-gray-600 p-4 rounded-xl mb-4">
            <h1 className="text-xl text-center mb-4">New To Twitter?</h1>
            <GoogleLoginButton
              onSuccess={handleLoginWithGoogle}
              onError={() => toast.error("Login failed")}
            />
          </div>
        ) : (
          <div className="flex flex-col border border-gray-600 p-4 rounded-xl">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-200"
              onClick={handleLogout}
            >
              Log out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TwitterLayout;
