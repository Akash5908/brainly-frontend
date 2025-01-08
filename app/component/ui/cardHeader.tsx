"use client";
import React from "react";
import ShareIcon from "../icons/share";
import DeleteIcon from "../icons/delete";

import { deleteCard } from "@/app/api/content/route";
import { useSession } from "next-auth/react";

interface CardHeader {
  title: string;
  id: string;
}

const CardHeader = (props: CardHeader) => {
  const { data: session } = useSession();
  return (
    <div className="flex justify-between">
      <div className="flex gap-1">
        <ShareIcon size="6" />
        <p> {props.title}</p>
      </div>
      <div className="flex gap-2">
        <ShareIcon size="4" />
        <DeleteIcon
          size="4"
          fun={() => deleteCard(props.id, session?.accessToken)}
        />
      </div>
    </div>
  );
};

export default CardHeader;
