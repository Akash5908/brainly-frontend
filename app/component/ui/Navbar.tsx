"use client";
import React, { useEffect, useState } from "react";
import Button from "./Button";
import ShareIcon from "../icons/share";
import PlusIcon from "../icons/plus";

import { useSession, signIn, signOut } from "next-auth/react";
import AddForm from "./AddForm";

type Props = {};

const Navbar = (props: Props) => {
  const { data, status } = useSession();
  const [modal, setModal] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center mt-8 w-full bg-red-400 mb-3">
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
            fun={() => setModal((prev) => !prev)}
          />
          {/* Avatar */}
          {status === "unauthenticated" ? (
            <Button
              text={"Sign in"}
              px={"5"}
              height={"11"}
              textColor={"white-500"}
              bgColor={"purple-500"}
              rounded={"lg"}
              Icon={<PlusIcon />}
              gap="2"
              fun={() => signIn()}
            />
          ) : (
            <>
              <Button
                text={"Sign Out"}
                px={"5"}
                height={"11"}
                textColor={"white-500"}
                bgColor={"purple-500"}
                rounded={"lg"}
                Icon={<PlusIcon />}
                gap="2"
                fun={() => signOut()}
              />
            </>
          )}
        </div>
      </div>
      {modal && (
        <div className="flex absolute left-1/3  w-1/2 h-1/2 justify-center items-center z-100  bg-slate-400 ">
          <AddForm />
        </div>
      )}
    </>
  );
};

export default Navbar;
