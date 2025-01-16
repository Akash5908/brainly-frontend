import React from "react";
import BookmarkIcon from "../icons/bookmark";
import Xicon from "../icons/xicon";
import ImageIcon from "../icons/image";
import VideoIcon from "../icons/video";
import ArticleIcon from "../icons/article";
import DocumentIcon from "../icons/document";
import YoutubeIcon from "../icons/youtube";
import LinkIcon from "../icons/link";

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

          <ImageIcon size={"5"} text="Images" />

          <VideoIcon size={"5"} text="Video" />
          <ArticleIcon size={"5"} text="Article" />
          <DocumentIcon size={"5"} text="Document" />
          <YoutubeIcon size={"5"} text="Youtube" />
          <LinkIcon size={"5"} text="Link" />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
