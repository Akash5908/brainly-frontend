import React from "react";
import Button from "./Button";
import ShareIcon from "../icons/share";
import PlusIcon from "../icons/plus";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <div className="flex justify-between items-center mt-8 w-full  ">
      <p className="text-xl font-extrabold ">All Notes</p>

      {/* Navbar Button */}
      <div className="flex gap-3">
        <Button
          text={"Share Brain"}
          px={"5"}
          height={"11"}
          textColor={"white-500"}
          bgColor={"purple-300"}
          rounded={"lg"}
          Icon={<ShareIcon size="6" />}
          gap="2"
        />
        <Button
          text={"Add Content"}
          px={"5"}
          height={"11"}
          textColor={"white-500"}
          bgColor={"purple-500"}
          rounded={"lg"}
          Icon={<PlusIcon />}
          gap="2"
        />
      </div>
    </div>
  );
};

export default Navbar;
