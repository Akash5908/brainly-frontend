import Card from "./component/ui/card";
import axios from "axios";

import { getServerSession, Session } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

async function fetchContent(session: Session) {
  try {
    const response = await axios.get(
      `http://localhost:3001/content?id=${session.id}`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`, // Pass the token in headers if required
        },
      }
    );
    return response.data.content;
  } catch (error) {
    console.error("Error fetching content:", error);
  }
}

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session) {
    const content = await fetchContent(session);
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
            />
          ))}
        </div>
      </div>
    );
  } else {
    return <h1>Please Signin</h1>;
  }
}
