"use client";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { cardInterface, tagInterface } from "@/lib/types";

import axios from "axios";
import { useSession } from "next-auth/react";

interface ContentContextInterface {
  content: cardInterface[];
  tag: tagInterface[];
  loading: boolean;
  error: string | null;
  getContent: () => void;
  getTags: () => void;
  addContent?: (newCard: cardInterface) => void;
  updateContent?: ({
    id,
    CardData,
  }: {
    id: string;
    CardData: cardInterface;
  }) => void;
  shareCards: cardInterface[];
  searchCards: cardInterface[];
  setSearchCards: Dispatch<SetStateAction<cardInterface[]>>;
  deleteCard: (id: string) => void;
  shareCard: (cardData: cardInterface) => void;
  getCard: (CardToken: string) => void;
  userShareCards: cardInterface[];
  getShareCards: (userId: string) => void;
  deleteShareCard: (cardId: string, userId: string) => void;
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
  const [tags, setTags] = useState<tagInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [userShareCards, setUserShareCards] = useState<cardInterface[]>([]);
  const [shareCards, setShareCards] = useState<cardInterface[]>([]);
  const [searchCards, setSearchCards] = useState<cardInterface[]>([]);
  const { data: session } = useSession();
  const token = session?.accessToken;

  const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const fetchContent = () => {
    setLoading(true);
    setError(null);
    try {
      axios
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
  const fetchTags = () => {
    setLoading(true);
    setError(null);
    try {
      axios.get(`http://localhost:3001/content/tags`).then((res) => {
        const data = res.data.content;

        setTags(data);
      });
    } catch (error) {
      setError("Error in fetching the Card");
    } finally {
      setLoading(false);
    }
  };

  const addContent = (Carddata: cardInterface) => {
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

  const updateContent = ({
    id,
    CardData,
  }: {
    id: string;
    CardData: cardInterface;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const updateContent = axios
        .put(
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
        )
        .then((res) => {
          setLoading(false);

          const newContent = contents.map((card) => {
            if (card._id == id) {
              card = res.data;
            }
            return card;
          });
          setContents(newContent);
          return;
        });
    } catch (error) {
      setError("Error in Updating the Card");
    }
  };

  const deleteContent = (id: string) => {
    setLoading(true);
    setError(null);
    try {
      console.log("inside the try delete");
      axios
        .delete(`http://localhost:3001/content?id=${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setLoading(false);
          const newContent = contents.filter((card) => card._id !== id);

          setContents(newContent);
        });
    } catch (error) {
      setError("Error in Deleting the Card");
    } finally {
      setLoading(false);
    }
  };

  const getShareCard = (Cardtoken: string): void => {
    // setLoading(true);
    setError(null);
    try {
      console.log("Beofe the api call");
      axios
        .get(`http://localhost:3001/content/share`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          params: {
            Cardtoken,
          },
        })
        .then((res) => {
          setShareCards((prev) => [...prev, res.data]);
        })
        .catch((error) => {
          setError("Error in getting the card");
          return null;
        });
    } catch (error) {
      setError("Something Went wrong can connet to Database");
    }
  };

  const shareContent = (cardData: cardInterface): Promise<string | null> => {
    console.log("🚀 ~ cardData:", cardData);
    setLoading(true);
    setError(null);

    return axios
      .post(
        `http://localhost:3001/content/share`,
        {
          cardData,
        },
        {
          headers: {
            "Content-Type": "application/json", // Fixed typo
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setLoading(false);
        return response.data.url;
      })
      .catch((error) => {
        setLoading(false);
        setError("Error in making the sharable link");
        console.error("Error fetching share link:", error);
        return null;
      });
  };

  const getUserShareCards = (userId: string): void => {
    console.log("🚀 ~ getUserShareCards ~ userId:", userId);
    console.log("Enter the getUserShare cara req");
    try {
      axios
        .get(`${backendURL}/user/share`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          params: {
            id: userId,
          },
        })
        .then((res) => {
          setUserShareCards((prev) => [...prev, ...res.data.data]);
        });
    } catch (error) {
      setError("Error in getting the shared Cards");
    }
  };

  const deleteShareCard = (cardId: string, userId: string) => {
    axios
      .delete(
        `${backendURL}/content/share`,

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          params: {
            id: cardId,
            userId,
          },
        }
      )
      .then(() => {
        const UpdateShareCards = userShareCards.filter(
          (item) => item._id !== cardId
        );
        console.log("🚀 ~ .then ~ UpdateShareCards:", UpdateShareCards);
        setUserShareCards(UpdateShareCards);
      });
  };

  useEffect(() => {
    fetchContent();
    fetchTags();
  }, [session]);

  return (
    <ContentsContext.Provider
      value={{
        content: contents,
        tag: tags,
        loading,
        error,
        getContent: fetchContent,
        addContent,
        updateContent,
        getTags: fetchTags,
        deleteCard: deleteContent,
        shareCards,
        shareCard: shareContent,
        searchCards,
        setSearchCards: setSearchCards,
        getCard: getShareCard,
        userShareCards,
        getShareCards: getUserShareCards,
        deleteShareCard,
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
