import React from "react";

import Tag from "./tag";

import CardHeader from "./cardHeader";
import { cardInterface } from "@/lib/types";

const Card = (props: cardInterface) => {
  return (
    <div className="flex flex-col gap-3 p-3 w-64 h-fit bg-slate-500 rounded-lg overflow-hidden ">
      {/* card header */}
      <CardHeader cardData={props} />
      {/* Card Content */}
      <div>
        <p>{props.describtion}</p>
      </div>
      <div className="flex  gap-2 overflow-x-auto no-scrollbar ">
        {props.tags.length > 0 &&
          props.tags.map((tag, index) => <Tag text={tag} key={index} />)}
      </div>

      {/* Date when the card add */}
      <div>
        <p className="text-xs font-light text-gray-600">Added on 04/01/2025</p>
      </div>
    </div>
  );
};

export default Card;
