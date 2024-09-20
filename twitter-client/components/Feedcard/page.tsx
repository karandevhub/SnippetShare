import Image from "next/image";
import React from "react";
import { LiaComment } from "react-icons/lia";
import { BiRepost } from "react-icons/bi";
import { IoIosHeartEmpty } from "react-icons/io";
import { HiOutlineUpload } from "react-icons/hi";
import { Tweet } from "@/gql/graphql";

interface FeedCardProps {
  data: Tweet;
}

const FeedCard: React.FC<FeedCardProps> = (props) => {
  const { data } = props;
  return (
    <div className="grid grid-cols-12 border-gray-600 border-t px-4 pt-4 hover:bg-gray-400 hover:bg-opacity-5">
      <div className="col-span-1 p-2">
        {data?.author && (
          <Image
            src={data?.author?.profileImageURL as string}
            alt="profile-image"
            className="rounded-full border-gray-500 border-[0.1px]"
            width={100}
            height={100}
          />
        )}
      </div>
      <div className="col-span-11">
        <h5>{data.author?.firstName}</h5>
        <p>
          {data.content}
        </p>
        <div className="flex justify-between text-gray-600 py-3">
          <div className="flex items-center hover:text-blue-600">
            <LiaComment className="hover:bg-gray-600 hover:bg-opacity-50 p-2 rounded-full text-4xl" />
            <p className="">16</p>
          </div>
          <div className="flex items-center hover:text-green-600">
            <BiRepost className="hover:bg-gray-600 hover:bg-opacity-50 p-2 rounded-full text-4xl" />
            <p className="">164 k</p>
          </div>
          <div className="flex items-center hover:text-pink-600">
            <IoIosHeartEmpty className="hover:bg-gray-600 hover:bg-opacity-50 p-2 rounded-full text-4xl" />
            <p className="">146 k</p>
          </div>
          <div className="flex items-center hover:text-blue-600">
            <HiOutlineUpload className="hover:bg-gray-600 hover:bg-opacity-50 p-2 rounded-full text-4xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
