import React from "react";
import BookmarkIcon from "../icons/bookmark";
import Xicon from "../icons/xicon";

const SideBar = () => {
  return (
    <div className=" border-solid border-r  border-gray-500 w-1/5 h-screen">
      <div className="flex-col  bg-red-400 gap-8  h-full pl-4 pt-4">
        <div className="flex text-bold gap-3">
          <BookmarkIcon />

          <h1 className="font-bold text-xl">Second Brain</h1>
        </div>
        <div className="grid gap-4">
          <div className="flex gap-2">
            <Xicon />
            <p className="font-light text-md">Tweets</p>
          </div>
          <div className="flex gap-2">
            <Xicon />
            <p className="font-medium">Tweets</p>
          </div>
          <div className="flex gap-2">
            <Xicon />
            <p className="font-medium">Tweets</p>
          </div>
          <div className="flex gap-2">
            <Xicon />
            <p className="font-medium">Tweets</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
