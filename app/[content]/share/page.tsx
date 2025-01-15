"use client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import jwt from "jsonwebtoken";
const ShareContent = () => {
  const pathName = useSearchParams();
  const token = pathName.get("token");
  const decode = jwt.verify(token!, "Secret");
  const id = decode.id;
  console.log("🚀 ~ ShareContent ~ id:", id as string);

  useEffect(() => {}, []);

  return (
    <div>
      <h1>This is Share Page</h1>
      <p>The id of card is {id as string}</p>
    </div>
  );
};

export default ShareContent;
