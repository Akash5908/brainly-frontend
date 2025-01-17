import React from "react";
import { IconProps } from "../../../lib/types";

const SearchIcon = (props: IconProps) => {
  const s = `h-${props.size}`;
  return (
    <div className="sidebarstyle " onClick={props.fun}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={props.size}
        height={props.size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${s}`}
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      {props.text && <p className="font-medium">{props.text}</p>}
    </div>
  );
};

export default SearchIcon;
