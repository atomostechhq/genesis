"use client";

import { createContext, useContext, useState } from "react";

const AppContext = createContext<any>("");

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const colors = [
    "brand",
    "blue-gray",
    "blue-light",
    "indigo",
    "purple",
    "violet",
    "pink",
    "rose",
    "orange",
  ];
  const [color, setColor] = useState("indigo");

  return (
    <AppContext.Provider value={{ color, colors, setColor }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
