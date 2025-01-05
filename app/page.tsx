"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import Card from "./component/ui/card";

export default function Home() {
  const { data: session } = useSession(); // Fetch session dynamically
  const [contentData, setContentData] = useState(null);

  useEffect(() => {
    if (session?.accessToken) {
      // Fetch content data using the token
      fetchContent(session.accessToken);
    }
  }, [session]);

  async function fetchContent(token: string) {
    try {
      console.log("before fetch");
      const response = await fetch(
        "http://localhost:3001/content?id=677184bb62b4343adaee8d8c",
        {
          method: "get",
          headers: {
            "Content-Type": "application/json", // Inform server of JSON payload
            Authorization: `Bearer ${token}`, // Pass the token in headers if required
          },
          // body: JSON.stringify({
          //   userId: "677184bb62b4343adaee8d8c", // Replace with dynamic user ID
          // }),
        }
      );
      console.log("after fetch");
      const data = await response.json();
      setContentData(data);
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  }

  return (
    <div>
      <h1>Hello World</h1>

      {!session ? (
        <button onClick={() => signIn()}>Sign In</button>
      ) : (
        <>
          <button onClick={() => signOut()}>Sign Out</button>
          <p>Session: {JSON.stringify(session)}</p>
        </>
      )}

      {contentData && (
        <div>
          <h2>Content Data:</h2>
          <pre>{JSON.stringify(contentData, null, 2)}</pre>
        </div>
      )}

      <Card />
    </div>
  );
}
