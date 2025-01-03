import React from "react";

interface textProps {
  text: string;
}

const Tag = (props: textProps) => {
  return (
    <div className="bg-purple-300 px-1 pt-1 text-xs rounded-lg text-purple-500 w-fit content-auto">
      <p>#{props.text}</p>
    </div>
  );
};

export default Tag;
