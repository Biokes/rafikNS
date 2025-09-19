import type { Protocol } from "@/types";
import { createContext, useContext } from "react";


export const ProtocolContext = createContext<Protocol | undefined>(undefined)

export function useProtocol() { 
    const protocol = useContext(ProtocolContext);
    if (!protocol) {
        throw new Error("useProtocol can only be used inside protocol context")
    }
    return protocol
}