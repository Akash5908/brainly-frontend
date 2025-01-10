"use client";
import React, { useState } from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useFormModal } from "@/app/contexts/formModalContext";
import Xicon from "../icons/xicon";
import { cardInterface } from "@/lib/types";

import { useContents } from "@/app/contexts/contentContext";

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

const AppForm = ({
  formType,
  cardId,
}: {
  formType: string;
  cardId?: string;
}) => {
  const form = useForm<cardInterface>({
    defaultValues: {
      link: "https://example.com",
      title: "",
      describtion: "",
      tags: [],
    },
    resolver: zodResolver(formSchema),
  });
  const { register, handleSubmit, formState, setValue } = form;
  const { errors } = formState;
  const { formShow, editModalFun } = useFormModal();

  const { addContent, error } = useContents();

  const submitForm = (data: cardInterface) => {
    if (addContent) {
      (async () => {
        addContent(data);
        console.log("error valeu", error);
      })();
      if (!error) {
        formShow();
      }
    }
  };
  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md w-full z-20">
      {
        <button
          onClick={() =>
            formType == "add" ? formShow() : cardId && editModalFun(cardId)
          }
        >
          <Xicon />
        </button>
      }
      <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
        <div>
          <label
            htmlFor="type"
            className="block text-sm font-medium text-gray-700"
          >
            Type
          </label>
          <input
            {...register("type")}
            type="text"
            id="type"
            name="type"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
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
          <input
            {...register("describtion")}
            type="text"
            id="describtion"
            name="describtion"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.describtion && <p>{errors.describtion.message}</p>}
        </div>

        <div>
          <label
            htmlFor="tag"
            className="block text-sm font-medium text-gray-700"
          >
            Tags
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            placeholder="Enter tags separated by commas"
            onChange={(e) => {
              const value = e.target.value;
              const tagsArray = value
                .split(",") // Split by comma
                .map((tag) => tag.trim()) // Trim whitespace
                .filter((tag) => tag); // Remove empty strings
              setValue("tags", tagsArray); // Update the form value as an array
            }}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.tags && <p>{errors.tags.message}</p>}
        </div>

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
