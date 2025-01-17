"use client";
import React, { useRef, useState } from "react";

import { Controller, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useFormModal } from "@/app/contexts/formModalContext";
import Xicon from "../icons/xicon";
import { cardInterface } from "@/lib/types";

import { useContents } from "@/app/contexts/contentContext";
import axios from "axios";

const tagsSchema = z.object({ name: z.string() });
const formSchema = z.object({
  type: z.string().min(2, { message: "Give a valid type" }),
  link: z.string().url(),
  // type: z.string(),
  title: z.string().min(2, {
    message: "Title should be greater than 2 words",
  }),
  describtion: z.string().min(10, {
    message: "Title should be greater than 30 words",
  }),
  tags: z
    .array(
      z.string().min(1, {
        message: "Tag is Required",
      })
    )
    .min(1, {
      message: "At least one tag is required",
    }),
});

const contenTypes = [
  "image",
  "video",
  "article",
  "audio",
  "document",
  "tweet",
  "youtube",
  "link",
];

const AppForm = ({
  formType,
  cardData,
}: {
  formType: string;
  cardData?: cardInterface;
}) => {
  const [tagArray, setTagArray] = useState<string[]>([]);

  const form = useForm<cardInterface>({
    defaultValues: {
      type: cardData ? cardData.type : "",
      link: cardData ? cardData.link : "",
      title: cardData ? cardData.title : "",
      describtion: cardData ? cardData.describtion : "",
      tags: cardData ? tagArray : [],
    },
    resolver: zodResolver(formSchema),
  });
  const { register, handleSubmit, formState, setValue } = form;

  const { errors } = formState;
  const { formShow, editModalFun } = useFormModal();

  const { addContent, tag, error, updateContent } = useContents();
  const [tagInput, settagInput] = useState("");
  const submitForm = (data: cardInterface) => {
    if (addContent && formType == "add") {
      (() => {
        addContent(data);
        console.log(data);
        console.log("error valeu", error);
      })();
      if (!error) {
        formShow();
      }
    } else if (updateContent && formType == "edit") {
      updateContent({ id: cardData?.id!, CardData: data });

      const id = cardData?.id;
      editModalFun(id!);
    }
  };

  // Defined a func to store tags
  function handleTagSubmit() {
    axios
      .post(``, {
        tagArray,
      })
      .then((res) => {
        console.log("Successfully added the tags");
      });
  }

  // console.log();
  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md w-full z-20">
      {
        <button
          onClick={() => {
            console.log("Card Id", cardData?.id);
            formType == "add"
              ? formShow()
              : cardData?.id && editModalFun(cardData.id);
          }}
        >
          <Xicon size="5" />
        </button>
      }
      <form
        onSubmit={handleSubmit(submitForm)}
        onKeyDown={(e) => {
          e.key === "Enter" && e.preventDefault();
        }}
        className="space-y-4"
      >
        <div>
          <label
            htmlFor="type"
            className="block text-sm font-medium text-gray-700"
          >
            Type
          </label>
          <select
            {...register("type")}
            // type="text"
            id="type"
            name="type"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            {contenTypes.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
          {errors.type && <p>Type is required</p>}
        </div>
        <div>
          <label
            htmlFor="link"
            className="block text-sm font-medium text-gray-700"
          >
            Link
          </label>
          <input
            {...register("link")}
            type="text"
            id="link"
            name="link"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.link && <p>Link is required</p>}
        </div>
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            {...register("title")}
            type="text"
            id="title"
            name="title"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.title && <p>Title is required</p>}
        </div>
        <div>
          <label
            htmlFor="describtion"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            {...register("describtion")}
            // type="text"
            id="describtion"
            placeholder="Example:- This note contain wikipedia page data."
            name="describtion"
            rows={4}
            cols={40}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />

          {errors.describtion && <p>{errors.describtion.message}</p>}
        </div>
        <div>
          <label
            htmlFor="tags"
            className="block text-sm font-medium text-gray-700"
          >
            Tags
          </label>
          <Controller
            name="tags"
            control={form.control}
            render={({ field }) => (
              <>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  placeholder="Enter tags separated by commas"
                  value={field.value || ""} // Bind value to the form field
                  onChange={(e) => {
                    const value = e.target.value;
                    settagInput(value);
                    field.onChange(value); // Update the form value
                  }}
                  onFocus={(e) => {
                    field.onChange(""); // finally update the form value
                  }}
                  onBlur={(e) => {
                    field.onChange(tagArray); // finally update the form value
                  }}
                  onKeyDown={(e) => {
                    const target = e.target as HTMLInputElement; // Explicitly cast e.target
                    if (e.key === "Enter") {
                      // e.preventDefault(); // Prevent form submission
                      const newTag = target.value.trim();
                      if (newTag) {
                        setTagArray((prevData) => [...prevData, newTag]); // Add new tag to the array
                        field.onChange(""); // Reset the input field in the form
                      }
                    }
                  }}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {tagInput.length > 0 && (
                  <div className="flex my-2 space-x-2 cursor-pointer w-full h-auto overflow-y-auto">
                    {tag[0].title
                      .filter((item) =>
                        item.toLocaleLowerCase().includes(tagInput)
                      )
                      .map((item) => (
                        <div
                          onClick={() => {
                            setTagArray((prevData) => [...prevData, item]); // Add new tag to the array
                            field.onChange(""); // Reset the input field in the form
                          }}
                          className="border-[1px] bg-black text-white rounded-sm shadow-sm p-2"
                        >
                          <span key={item}>{item}</span>
                        </div>
                      ))}
                  </div>
                )}
              </>
            )}
          />

          {errors.tags && (
            <p className="text-red-500 text-sm">{errors.tags.message}</p>
          )}
        </div>
        {tagArray.length > 0 ? (
          <div className="flex space-x-2 overflow-y-auto">
            {tagArray.map((item) => (
              <div>
                <div
                  key={item}
                  className=" border-[1px] p-2 rounded-md shadow-sm"
                >
                  {item}
                </div>
              </div>
            ))}
          </div>
        ) : (
          ""
        )}

        <div className="pt-4">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      </form>
      {error && <p className="bg-green-300">{error}</p>}
    </div>
  );
};

export default AppForm;
