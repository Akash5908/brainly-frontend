import React from "react";

interface ButtonProps {
  text: string;
  px: string;
  height: string;
  textColor: string;
  bgColor: string;
  rounded: string;
  Icon?: any;
  gap?: string;
  fun?: () => void;
}

const Button = (props: ButtonProps) => {
  const pxClass = `px-${props.px}`;
  const hClass = `h-${props.height}`;
  const textClass = `text-${props.textColor}`;
  const bgClass = `bg-${props.bgColor}`;
  const rClass = `rounded-${props.rounded}`;
  const gapClass = `gap-${props.gap}`;

  return (
    <div>
      <button
        data-modal-target="default-modal"
        className={`flex ${pxClass} ${gapClass} ${hClass} ${textClass} ${bgClass} ${rClass}      items-center                   `}
        onClick={() => props.fun && props.fun()}
      >
        <span>{props?.Icon}</span>
        <span>{props.text}</span>
      </button>
    </div>
  );
};

export default Button;
