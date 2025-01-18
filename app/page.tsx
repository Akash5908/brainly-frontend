"use client";

import { useContents } from "./contexts/contentContext";
import Card from "./component/ui/card";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { cardInterface } from "@/lib/types";
export default function Home() {
  const { content, loading, error } = useContents();
  console.log("🚀 ~ Home ~ content:", content);
  const [filterContent, setFilterContent] = useState<cardInterface[]>(content);
  const query = useSearchParams();
  const type = query.get("type");
  console.log("🚀 ~ Home ~ type:", type);
  useEffect(() => {
    if (type) {
      const filter = content.filter((item) => item.type == type);
      console.log("🚀 ~ useEffect ~ filter:", filter);
      setFilterContent(filter);
    } else {
      console.log(content);
      setFilterContent(content);
    }
  }, [type]);
  if (loading) {
    <h1>Loading</h1>;
  } else if (error) {
    <h1>{error}</h1>;
  }

  if (filterContent) {
    return (
      <div className="h-5/6 overflow-y-scroll no-scrollbar ">
        <div className="flex gap-3 flex-wrap justify-around bg-green-400  on-scrollbar">
          {filterContent.map((item: any, index: any) => (
            <Card
              type={item.type}
              title={item.title}
              key={index}
              describtion={item.describtion}
              tags={item.tags}
              link={item.link}
              id={item._id}
              userId={item.userId}
              createdDate={item.createdDate}
            />
          ))}
        </div>
      </div>
    );
  } else {
    return <h1>Please Signin</h1>;
  }
}
