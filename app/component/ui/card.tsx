import React from "react";
import ShareIcon from "../icons/share";
import Tag from "./tag";
import DeleteIcon from "../icons/delete";
import CardHeader from "./cardHeader";
import { cardInterface } from "@/lib/types";

// import { deleteCard } from "@/app/api/content/route";
const url = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function getServerSideProps() {
  const deleteCard = async () => {
    console.log("Content Delete", url);
    // await axios.delete(`${url}/delete/33`);
  };

  return {
    props: {
      delete: deleteCard(), // This will be available as props on the client
    },
  };
}

const Card = (props: cardInterface) => {
  return (
    <div className="flex flex-col gap-3 p-3 w-64 h-fit bg-slate-500 rounded-lg overflow-hidden ">
      {/* card header */}
      <CardHeader title={props.title} id={props.id} />
      {/* Card Content */}
      <div>
        <p>{props.describtion}</p>
      </div>
      <div className="flex  gap-2 overflow-x-auto no-scrollbar ">
        {props.tags.map((tag, index) => (
          <Tag text={tag} key={index} />
        ))}
      </div>

      {/* Date when the card add */}
      <div>
        <p className="text-xs font-light text-gray-600">Added on 04/01/2025</p>
      </div>
    </div>
  );
};

export default Card;
