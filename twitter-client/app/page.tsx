"use client";
import React, { useCallback, useState } from "react";
import { FaTwitter } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { IoSearch } from "react-icons/io5";
import { CgMoreO } from "react-icons/cg";
import { IoMdNotificationsOutline } from "react-icons/io";
import { TbMessageSearch } from "react-icons/tb";
import { FaRegBookmark } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { GoFileMedia } from "react-icons/go";
import FeedCard from "@/components/Feedcard/page";
import GoogleLoginButton from "@/components/GoogleLoginButton/GoogleLoginButton";
import { CredentialResponse } from "@react-oauth/google";
import toast from "react-hot-toast";
import { graphQLClient } from "@/client/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { useCurrentUser } from "@/hooks/user";
import { useQueryClient } from "react-query";
import { useCreateTweet, useGetAllTweets } from "@/hooks/tweet";
import { Tweet } from "@/gql/graphql";

interface TwitterSidebarButton {
  title: string;
  icon: React.ReactNode;
}

interface VerifyGoogleTokenResponseTypes {
  verifyGoogleToken: string;
}

const twitterSidebarButtons: TwitterSidebarButton[] = [
  {
    title: "Home",
    icon: <AiFillHome className="text-3xl" />,
  },
  {
    title: "Explore",
    icon: <IoSearch className="text-3xl" />,
  },
  {
    title: "Notifications",
    icon: <IoMdNotificationsOutline className="text-3xl" />,
  },
  {
    title: "Messages",
    icon: <TbMessageSearch className="text-3xl" />,
  },
  {
    title: "Bookmarks",
    icon: <FaRegBookmark className="text-3xl" />,
  },
  {
    title: "Profile",
    icon: <CgProfile className="text-3xl" />,
  },
  {
    title: "More",
    icon: <CgMoreO className="text-3xl" />,
  },
];

export default function Home() {
  const { user } = useCurrentUser();
  const { tweets } = useGetAllTweets();
  const { mutate } = useCreateTweet();

  const [content, setContent] = useState("");

  console.log(tweets);
  const queryClient = useQueryClient();
  const handleImagePick = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "images/*");
    input.click();
  };

  const handleLoginWithGoogle = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;

      if (!googleToken) {
        return toast.error("Google token not found");
      }

      try {
        const { verifyGoogleToken } =
          await graphQLClient.request<VerifyGoogleTokenResponseTypes>(
            verifyUserGoogleTokenQuery,
            { token: googleToken }
          );

        toast.success("Google token verified successfully");
        console.log("Google token verified:", verifyGoogleToken);

        if (verifyGoogleToken)
          localStorage.setItem("google_token", verifyGoogleToken);

        await queryClient.invalidateQueries(["current-user"]);
      } catch (error) {
        console.error("Error verifying Google token:", error);
        toast.error("Failed to verify Google token");
      }
    },
    []
  );

  const handleLogout = async () => {
    localStorage.removeItem("google_token");
    await queryClient.invalidateQueries(["current-user"]);
    await queryClient.refetchQueries(["current-user"]);

    toast.success("logged out");
  };

  const handleSubmit = async () => {
    if (!content) {
      toast.error("Please enter a tweet");
      return;
    }
    try {
      await mutate({
        content,
      });
      setContent("");
    } catch (error) {
      console.error("Error creating tweet:", error);
      toast.error("Failed to create tweet");
    }
  };

  return (
    <div className="grid grid-cols-12 h-screen w-screen px-5 md:px-10">
      {/* column 1 */}
      <div className="col-span-12 md:col-span-3 pl-5 md:pl-28">
        <div className="w-full h-full pt-3">
          <div className="hover:bg-gray-600 hover:bg-opacity-50 w-fit p-3 rounded-full transition-all cursor-pointer">
            <FaTwitter className="text-3xl" />
          </div>
          <div className="text-xl flex flex-col mt-5">
            <ul>
              {twitterSidebarButtons.map((item, index) => (
                <li
                  key={index}
                  className={`flex gap-4 pl-3 py-4 pr-10 w-fit hover:bg-gray-600 hover:bg-opacity-50 transition-all rounded-full ${
                    item.title === "Home" ? "font-semibold" : "font-normal"
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
            <button className="bg-blue-500 hover:bg-blue-600 rounded-full py-3 mt-4 mr-10 font-semibold">
              Post
            </button>
          </div>
        </div>
      </div>
      {/* Column 2 */}
      <div className="col-span-12 md:col-span-5 border-l border-gray-600 border-r h-screen overflow-scroll overflow-x-hidden no-scrollbar">
        <div className="p-4 border-b border-gray-600">
          <div className="flex items-start">
            {user && (
              <img
                src={user?.profileImageURL}
                alt="profile-image"
                className="rounded-full w-12 h-12 mr-3"
              />
            )}
            <div className="flex-1">
              <textarea
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's happening?"
                className="w-full border-none focus:outline-none bg-transparent text-white resize-none"
                rows={3}
              ></textarea>
              <div className="flex justify-between items-center mt-2">
                <GoFileMedia onClick={handleImagePick} className="text-xl" />
                <button
                  onClick={handleSubmit}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
                >
                  Tweet
                </button>
              </div>
            </div>
          </div>
        </div>
        {tweets?.map((tweet) => (
          <FeedCard key={tweet?.id} data={tweet as Tweet} />
        ))}
      </div>
      {/* column 3 */}

      <div className="col-span-12 md:col-span-3 p-5">
        {!user && (
          <div className="flex flex-col border border-gray-600 p-4 rounded-xl mb-4">
            <h1 className="text-xl text-center mb-4">New To Twitter?</h1>

            <GoogleLoginButton
              onSuccess={handleLoginWithGoogle}
              onError={() => toast.error("Login failed")}
            />
          </div>
        )}
        {user && (
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
}
