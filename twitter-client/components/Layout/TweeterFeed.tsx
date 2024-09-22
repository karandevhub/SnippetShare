import { Tweet } from "@/gql/graphql";
import { useCreateTweet, useGetAllTweets } from "@/hooks/tweet";
import { useCurrentUser } from "@/hooks/user";
import React, { useState } from "react";
import toast from "react-hot-toast";
import FeedCard from "../Feedcard/page";
import { GoFileMedia } from "react-icons/go";
import Image from "next/image";

const TweeterFeed: React.FC = () => {
  const { user } = useCurrentUser();
  const [content, setContent] = useState("");

  const { mutate } = useCreateTweet();
  const { tweets } = useGetAllTweets();

  const handleImagePick = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "images/*");
    input.click();
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
    <>
      <div className="p-4 border-b border-gray-600">
        <div className="flex items-start">
          {user && (
            <Image
              src={user?.profileImageURL}
              alt="profile-image"
              width={40}
              height={40}
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
    </>
  );
};

export default TweeterFeed;
