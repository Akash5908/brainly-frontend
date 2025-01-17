"use client";
import React from "react";
import { useContents } from "../contexts/contentContext";
import { cardInterface } from "@/lib/types";
import Card from "../component/ui/card";

const page = () => {
  const { searchCards } = useContents();

  return (
    <div className="h-5/6 overflow-y-scroll no-scrollbar bg-rose-400">
      <div className="flex gap-3 flex-wrap justify-around bg-green-400  on-scrollbar">
        {searchCards.length > 0 ? (
          searchCards.map((item: cardInterface, index: number) => {
            return (
              <Card
                type={item.type}
                title={item.title}
                key={index}
                describtion={item.describtion}
                tags={item.tags}
                link={item.link}
                id={item._id}
              />
            );
          })
        ) : (
          <h1>No shared cards available</h1>
        )}
      </div>
    </div>
  );
};

export default page;
