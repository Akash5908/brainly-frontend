"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";
import { ContentProvider } from "./contexts/contentContext";
import { FormModalProvider } from "./contexts/formModalContext";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <ContentProvider>
        <FormModalProvider>{children}</FormModalProvider>
      </ContentProvider>
    </SessionProvider>
  );
};
