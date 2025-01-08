"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { cardInterface } from "@/lib/types";
import { deleteCard, getContent } from "../api/content/route";
import axios from "axios";
import { useSession } from "next-auth/react";

interface ContentContextInterface {
  content: cardInterface[];
  loading: boolean;
  getContent: () => void;
  addContent?: (newTodo: Omit<cardInterface, "id">) => void;
  updateContent?: (content: cardInterface) => void;
  deleteCard: (id: string) => void;
}

const ContentsContext = createContext<ContentContextInterface | undefined>(
  undefined
);

export const ContentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [contents, setContents] = useState<cardInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { data: Session, status } = useSession();

  const fetchContent = async () => {
    setLoading(true);
    setError(null);
    try {
      // const data = await getContent();
      console.log(session);
      console.log(session);
      console.log(session);
      console.log(session);
      const response = await axios.get(
        `http://localhost:3001/content?id=${session?.id}`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
      const data = response.data.content;
      console.log("DATA", data);
      setContents(data);
    } catch (error) {
      setError("Error in fetching the Card");
    } finally {
      setLoading(false);
    }
  };

  const deleteContent = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await deleteCard(id);
      setContents((prev) => prev.filter((card) => card.id !== id));
    } catch (error) {
      setError("Error in Deleting the Card");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  return (
    <ContentsContext.Provider
      value={{
        content: contents,
        loading,
        getContent: fetchContent,
        // addContent,
        // updateContent
        deleteCard: deleteContent,
      }}
    >
      {children}
    </ContentsContext.Provider>
  );
};

export const useContents = () => {
  const context = useContext(ContentsContext);
  if (!context) {
    throw new Error("useContents must be used within a ContentProvider");
  }
  return context;
};
