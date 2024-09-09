import Image from "next/image";
import React from "react";
import { FaTwitter } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { IoSearch } from "react-icons/io5";
import { CgMoreO } from "react-icons/cg";
import { IoMdNotificationsOutline } from "react-icons/io";
import { TbMessageSearch } from "react-icons/tb";
import { FaRegBookmark } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import FeedCard from "@/components/Feedcard/page";
import GoogleLoginButton from "@/components/GoogleLoginButton/GoogleLoginButton";

interface TwitterSidebarButton {
  title: string;
  icon: React.ReactNode;
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
  return (
    <div className="grid grid-cols-12 h-screen w-screen px-10">
      {/* column 1 */}
      <div className="col-span-3 pl-28">
        <div className="w-full h-full pt-3">
          <div className="hover:bg-gray-600 hover:bg-opacity-50  w-fit p-3 rounded-full transition-all cursor-pointer">
            <FaTwitter className="text-3xl" />
          </div>
          <div className="text-xl flex flex-col mt-5">
            <ul>
              {twitterSidebarButtons.map((item, index) => (
                <li
                  key={index}
                  className={`flex gap-4 pl-3 py-4 pr-10 w-fit hover:bg-gray-600 hover:bg-opacity-50 
                    transition-all rounded-full ${
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
      <div className="col-span-5 border-l border-gray-600 border-r h-screen overflow-scroll overflow-x-hidden no-scrollbar">
        <FeedCard />
        <FeedCard />
        <FeedCard />
        <FeedCard />
        <FeedCard />
        <FeedCard />
        <FeedCard />
        <FeedCard />
        <FeedCard />
        <FeedCard />
        <FeedCard />
        <FeedCard />
      </div>
      {/* column 3 */}
      <div className="col-span-3 p-5">
        <div className="flex flex-col border border-gray-600 p-4 rounded-xl">
          <h1 className="text-xl text-center">New To Twitter?</h1>
         <GoogleLoginButton/>
        </div>
      </div>
    </div>
  );
}
