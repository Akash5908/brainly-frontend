"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";
import { ContentProvider } from "./contexts/contentContext";

export const Providers = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <SessionProvider>
      <ContentProvider>{children}</ContentProvider>
    </SessionProvider>
  );
};
