"use client";

import { createContext, useContext, useState } from "react";

const AppContext = createContext<any>("");

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const colors = [
    "brand",
    "bluegray",
    "bluelight",
    "indigo",
    "purple",
    "violet",
    "pink",
    "rose",
    "orange",
  ];
  const [color, setColor] = useState("brand");

  return (
    <AppContext.Provider value={{ color, colors, setColor }}>
     <div className={["", color && `theme-${color}`].join(" ")}> {children}</div>
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
