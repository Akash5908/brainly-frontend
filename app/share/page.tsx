"use client";
import React, { useEffect } from "react";
import Card from "../component/ui/card";
import { cardInterface } from "@/lib/types";
import { useContents } from "../contexts/contentContext";
import { useSession } from "next-auth/react";

const page = () => {
  const { data: session, status } = useSession();
  const { userShareCards, getShareCards, error } = useContents();

  useEffect(() => {
    const userId = session?.id;
    getShareCards(userId!);
  }, [session]);
  return (
    <div className="h-5/6 overflow-y-scroll no-scrollbar ">
      <div className="flex gap-2 flex-wrap justify-start  on-scrollbar">
        {userShareCards.length > 0 ? (
          userShareCards.map((item: cardInterface, index: number) => {
            return (
              <Card
                type={item.type}
                title={item.title}
                key={index}
                describtion={item.describtion}
                tags={item.tags}
                link={item.link}
                id={item._id}
                userId={item.userId}
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
