// "use server";
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getContent = async () => {
  console.log("Before tgettiong the content");
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;
  console.log("Session", session);
  if (session) {
    try {
      const response = await axios.get(
        `http://localhost:3001/content?id=${session.id}`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
      const contentData = response.data.content;

      return contentData;
    } catch (error) {
      console.error("Error fetching content:", error);
      return false;
    }
  } else {
    return false;
  }
};

export const deleteCard = async (id: string) => {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;
  try {
    await axios.delete(`${url}/content`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: { id },
    });
  } catch (error) {
    console.error("Error in Deleting");
    throw error;
  }
};
