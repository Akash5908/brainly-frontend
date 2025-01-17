import { IconProps } from "@/lib/types";
import React from "react";

const Xicon = (props: IconProps) => {
  const size = `h-${props.size}`;
  return (
    <div className="sidebarstyle">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className={`flex justify-center ${size}`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18 18 6M6 6l12 12"
        />
      </svg>
      {props.text && <p>{props.text}</p>}
    </div>
  );
};

export default Xicon;
