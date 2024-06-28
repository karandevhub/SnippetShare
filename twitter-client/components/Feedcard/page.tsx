import Image from "next/image";
import React from "react";
import { LiaComment } from "react-icons/lia";
import { BiRepost } from "react-icons/bi";
import { IoIosHeartEmpty } from "react-icons/io";
import { HiOutlineUpload } from "react-icons/hi";

const FeedCard: React.FC = () => {
  return (
    <div className="grid grid-cols-12 border-gray-600 border-t px-4 pt-4 hover:bg-gray-400 hover:bg-opacity-5">
      <div className="col-span-1 p-2">
        <Image
          src="https://avatars.githubusercontent.com/u/119488379?v=4"
          alt="profile-image"
          className="rounded-full border-gray-500 border-[0.1px]"
          width={100}
          height={100}
        />
      </div>
      <div className="col-span-11">
        <h5>Karan Kumar</h5>
        <p>
          If 8% people own the car it means on an average 32% people are using
          it. These highways are used for not just personal travel but for
          freight and logistics. So these non-sense videos are series of paid
          farce.
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
