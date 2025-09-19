import type { UserContextType } from "@/types";
import { useContext } from "react";
import { createContext } from "react";

export const UserContext = createContext<UserContextType| undefined>(undefined)

export function useUser() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used inside UserProvider");
    }
    return context;
}