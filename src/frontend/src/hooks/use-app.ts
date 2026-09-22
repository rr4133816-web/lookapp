import { AppContext, type AppContextValue } from "@/context/AppContext";
import { useContext } from "react";

export function useApp(): AppContextValue {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
