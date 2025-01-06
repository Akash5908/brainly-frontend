import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

type ResponseData = {
  message: string;
};

export default async function getContent() {
  const token = await getServerSession();

  return token?.id;
}
