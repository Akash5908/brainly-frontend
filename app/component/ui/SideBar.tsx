"use client";
import React from "react";
import BookmarkIcon from "../icons/bookmark";
import Xicon from "../icons/xicon";
import ImageIcon from "../icons/image";
import VideoIcon from "../icons/video";
import ArticleIcon from "../icons/article";
import DocumentIcon from "../icons/document";
import YoutubeIcon from "../icons/youtube";
import LinkIcon from "../icons/link";

import { useRouter, useSearchParams } from "next/navigation";

const SideBar = () => {
  const router = useRouter();

  const searchParams = useSearchParams();

  const newUrl = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("type", value);

    return params.toString();
  };

  return (
    <div className=" border-solid border-r  border-gray-500 w-1/5 h-screen">
      <div className="flex flex-col gap-8 bg-red-400 font-mono  h-full pl-4 pt-4 ">
        <div onClick={() => router.push("/")}>
          <BookmarkIcon size="8" text={"Second Brain"} />
        </div>
        <div className="grid gap-4 ">
          <div
            onClick={() => {
              router.push(`?${newUrl("tweets")}`);
            }}
          >
            <Xicon size={"5"} text="Tweets" />
          </div>
          <div
            onClick={() => {
              router.push(`?${newUrl("image")}`);
            }}
          >
            <ImageIcon size={"5"} text="Images" />
          </div>
          <div
            onClick={() => {
              router.push(`?${newUrl("videos")}`);
            }}
          >
            <VideoIcon size={"5"} text="Video" />
          </div>
          <div
            onClick={() => {
              router.push(`?${newUrl("article")}`);
            }}
          >
            <ArticleIcon size={"5"} text="Article" />
          </div>
          <div
            onClick={() => {
              router.push(`?${newUrl("documents")}`);
            }}
          >
            <DocumentIcon size={"5"} text="Document" />
          </div>
          <div
            onClick={() => {
              router.push(`?${newUrl("youtube")}`);
            }}
          >
            <YoutubeIcon size={"5"} text="Youtube" />
          </div>
          <div
            onClick={() => {
              router.push(`?${newUrl("links")}`);
            }}
          >
            <LinkIcon size={"5"} text="Link" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
