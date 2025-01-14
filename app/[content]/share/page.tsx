"use client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import jwt from "jsonwebtoken";
const ShareContent = () => {
  const pathName = useSearchParams();
  const token = pathName.get("token");
  const id = jwt.verify(token!, "Secret");
  console.log("🚀 ~ ShareContent ~ id:", id);
  // useEffect(() => {});

  return (
    <div>
      <h1>This is Share Page</h1>
      {/* <Card /> */}
    </div>
  );
};

export default ShareContent;
