"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import Card from "@/app/component/ui/card";
import { cardInterface } from "@/lib/types";
import { useSession } from "next-auth/react";
import axios from "axios";

const ShareContent = () => {
  const pathName = useSearchParams();
  const [shareCards, setShareCards] = useState<cardInterface[]>([]);
  const [error, setError] = useState("");
  const Cardtoken = pathName.get("Cardtoken");
  const { data: session } = useSession();
  useEffect(() => {
    // Only proceed if Cardtoken and token are available
    if (Cardtoken && session?.accessToken) {
      const fetchSharedCard = async () => {
        try {
          console.log("Before the API call");
          const res = await axios.get(`http://localhost:3001/content/share`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session?.accessToken}`,
            },
            params: {
              Cardtoken,
            },
          });
          setShareCards((prev) => [...prev, ...res.data.shareCardData]);
        } catch (error) {
          console.error("Error fetching shared card:", error);
          setError("Error in getting the card");
        }
      };

      fetchSharedCard();
    } else {
      if (!Cardtoken) setError("Invalid URL - Missing token");
    }
  }, [Cardtoken, session]);

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div>
      <div className="h-5/6 overflow-y-scroll no-scrollbar ">
        <div className="flex gap-3 flex-wrap justify-around bg-green-400  on-scrollbar"></div>
        {shareCards.length > 0 ? (
          shareCards.map((item: cardInterface, index: number) => {
            return (
              <Card
                type={item.type}
                title={item.title}
                key={index}
                createdDate={item.createdDate}
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

export default ShareContent;
