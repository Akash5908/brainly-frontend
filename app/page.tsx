"use client";

import { useContext } from "react";
import { useContents } from "./contexts/contentContext";
import Card from "./component/ui/card";
import { error } from "console";

export default function Home() {
  // const [content, setContent] = useRecoilState(contentState);
  const { content, loading, error } = useContents();

  if (loading) {
    <h1>Loading</h1>;
  } else if (error) {
    <h1>{error}</h1>;
  }

  if (content) {
    return (
      <div className="h-5/6 overflow-y-scroll no-scrollbar ">
        <div className="flex gap-3 flex-wrap justify-around bg-green-400  on-scrollbar">
          {content.map((item: any, index: any) => (
            <Card
              title={item.title}
              key={index}
              describtion={item.describtion}
              tags={item.tags}
              link={item.link}
              id={item._id}
            />
          ))}
        </div>
      </div>
    );
  } else {
    return <h1>Please Signin</h1>;
  }
}
