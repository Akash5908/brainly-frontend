"use client";
import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import ShareIcon from "../icons/share";
import PlusIcon from "../icons/plus";

import { useSession, signIn, signOut } from "next-auth/react";
import AddForm from "./AddForm";
import { useFormModal } from "@/app/contexts/formModalContext";
import SearchIcon from "../icons/search";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useContents } from "@/app/contexts/contentContext";

import { useRouter } from "next/navigation";

type Props = {};

const Navbar = (props: Props) => {
  const { data: session, status } = useSession();
  const { modalState, formShow } = useFormModal();
  const { setSearchCards } = useContents();
  const searchText = useRef("");
  const [showSearchInput, setShowSearchInput] = useState<boolean>(false);
  const token = session?.accessToken;
  const userId = session?.id;
  const router = useRouter();
  return (
    <>
      <div className="flex justify-between items-center mt-8 w-full bg-red-400 mb-3">
        <p className="text-xl font-extrabold ">All Notes</p>
        {showSearchInput && (
          <div className="flex justify-end  w-1/3">
            <Input
              type="search"
              defaultValue={searchText.current}
              onChange={(e) => {
                searchText.current = e.target.value;
              }}
              className="bg-slate-500 border-none p-2 "
              placeholder="Search the Card"
            />
            <div className="absolute  mt-1 mr-1">
              <SearchIcon
                size="25"
                fun={() => {
                  axios
                    .get(
                      `${process.env.NEXT_PUBLIC_BACKEND_URL}/content/search`,
                      {
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${token}`,
                        },

                        params: {
                          search: searchText.current,
                          userId,
                        },
                      }
                    )
                    .then((res) => {
                      setSearchCards(res.data.searchResult);
                    });
                  setShowSearchInput((prev) => !prev);
                  router.push("/search");
                }}
              />
            </div>
          </div>
        )}
        {/* Navbar Button */}
        <div className="flex gap-3">
          {!showSearchInput && (
            <SearchIcon
              size="25"
              fun={() => setShowSearchInput((prev) => !prev)}
            />
          )}
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
            fun={() => formShow()}
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
      {modalState && (
        <div className="flex absolute left-1/3  w-1/2 h-1/2 justify-center items-center z-100   ">
          <AddForm formType="add" />
        </div>
      )}
    </>
  );
};

export default Navbar;
