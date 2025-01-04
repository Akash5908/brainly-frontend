import React from "react";
import ShareIcon from "../icons/share";
import Tag from "./tag";

const Card = () => {
  return (
    <div className="flex flex-col gap-3 p-3 w-64 h-fit bg-slate-500 rounded-lg overflow-hidden ">
      {/* card header */}
      <div className="flex justify-between">
        <div className="flex gap-1">
          <ShareIcon size="6" />
          <p>Card 1</p>
        </div>
        <div className="flex gap-2">
          <ShareIcon size="4" />
          <ShareIcon size="4" />
        </div>
      </div>
      {/* Card Content */}
      <div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium in
          vero ea voluptatem, magnam perspiciatis distinctio voluptatum odio
          sequi perferendis incidunt dolores harum eum dicta. Assumenda id sequi
          veritatis quas!
        </p>
      </div>
      <div className="flex  gap-2 overflow-x-auto no-scrollbar ">
        <Tag text="learning" />
        <Tag text="learning" />
        <Tag text="learning" />
        <Tag text="learning" />
        <Tag text="learning" />
        <Tag text="learning" />
        <Tag text="learning" />
        <Tag text="learning" />
        <Tag text="learning" />
        <Tag text="learning" />
        <Tag text="learning" />
        <Tag text="learning" />
        <Tag text="learning" />
        <Tag text="learning" />
      </div>

      {/* Date when the card add */}
      <div>
        <p className="text-xs font-light text-gray-600">Added on 04/01/2025</p>
      </div>
    </div>
  );
};

export default Card;
