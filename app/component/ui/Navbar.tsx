import React from "react";
import Button from "./Button";
import ShareIcon from "../icons/share";
import PlusIcon from "../icons/plus";
import Image from "next/image";
import { getServerSession } from "next-auth";

type Props = {};

async function getSession() {
  const session = await getServerSession();
  return session;
}

const Navbar = async (props: Props) => {
  const session = await getSession();
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
        {/* Avatar */}
        {session ? (
          <div>
            {/* <Image
            src="https://emojiisland.com/cdn/shop/products/Emoji_Icon_-_Sunglasses_cool_emoji_large.png?v=1571606093"
            alt="avatar"
            width={40}
            height={40} */}
            {/* /> */}
            <p>{session.user?.name}</p>
          </div>
        ) : (
          <p>Signup</p>
        )}
      </div>
    </div>
  );
};

export default Navbar;
