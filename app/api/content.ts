import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

type ResponseData = {
  message: string;
};

export default async function getContents({
  userId,
  token,
}: {
  userId: string;
  token: string;
}) {
  const data = await fetch("http://localhost:3001/content", {
    method: "POST",
    headers: {
      token:
        "eyJhbGciOiJIUzI1NiJ9.dXNlcjI.aF9a5GR6rgPEOUEd8-M5BCYEvD4cu1vLE8HHX_DLi7c",
      // 'X-CSRF-Token': csrfToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
    }),
  });

  const contentData = await data.json();

  return contentData;

  // if (token) {
  //   // Access the token data
  //   console.log(token);
  //   res.status(200).json({ token });
  // } else {
  //   res.status(401).json({ message: "Unauthorized" });
  // }
}
