"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { cardInterface } from "@/lib/types";

import axios from "axios";
import { useSession } from "next-auth/react";

interface ContentContextInterface {
  content: cardInterface[];
  loading: boolean;
  error: string | null;
  getContent: () => void;
  addContent?: (newCard: cardInterface) => void;
  updateContent?: ({
    id,
    CardData,
  }: {
    id: string;
    CardData: cardInterface;
  }) => Promise<void>;
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

  const addContent = async (Carddata: cardInterface) => {
    setLoading(true);
    setError(null);
    try {
      axios
        .post(
          `http://localhost:3001/content`,
          {
            Carddata,
            userId: session?.id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setLoading(false);
          setContents((prev) => [...prev, Carddata]);
          setError(null);
        })
        .catch((err) => setError("Error in Adding the Content"));
      console.log("Add content successfull");
      // setContents((prev) => [...prev, Carddata]);
    } catch (error) {
      console.log("Not successfull");
      setError("Error in Adding the Content");
      throw Error;
    }
  };

  const updateContent = async ({
    id,
    CardData,
  }: {
    id: string;
    CardData: cardInterface;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const updateContent = await axios.put(
        `http://localhost:3001/content?id=${id}`,
        {
          CardData,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);

      const newContent = contents.map((card) => {
        if (card._id == id) {
          card = updateContent.data;
        }
        return card;
      });
      setContents(newContent);
      return;
    } catch (error) {
      setError("Error in Updating the Card");
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
      setLoading(false);
      const newContent = contents.filter((card) => card._id !== id);

      setContents(newContent);
    } catch (error) {
      setError("Error in Deleting the Card");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, [session]);

  return (
    <ContentsContext.Provider
      value={{
        content: contents,
        loading,
        error,
        getContent: fetchContent,
        addContent,
        updateContent,
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
