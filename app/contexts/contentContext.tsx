"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { cardInterface } from "@/lib/types";
import { deleteCard, getContent } from "../api/content/route";
import axios from "axios";
import { useSession } from "next-auth/react";

interface ContentContextInterface {
  content: cardInterface[];
  loading: boolean;
  error: string | null;
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
  const { data: session } = useSession();
  const token = session?.accessToken;

  const fetchContent = async () => {
    setLoading(true);
    setError(null);
    try {
      await axios
        .get(`http://localhost:3001/content?id=${session?.id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const data = res.data.content;

          setContents(data);
        });
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
      console.log("inside the try delete");
      await axios.delete(`http://localhost:3001/content?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setContents((prev) => prev.filter((card) => card.id !== id));
    } catch (error) {
      setError("Error in Deleting the Card");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, [session, contents]);

  return (
    <ContentsContext.Provider
      value={{
        content: contents,
        loading,
        error,
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
