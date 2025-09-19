import type { RafikNS } from "@/types"
import { useState } from "react"
import { ProtocolContext } from "./useProtocol"


export default function ProtocolProvider({ children }: { children: React.ReactNode }) {

    const [protocol , setProtocol] = useState<RafikNS>({rafikNSs: [{ users: [] }]})
    const setProtocolData = (protocol: RafikNS)=>{ 
        setProtocol(protocol)
    }
    return (
        <ProtocolContext.Provider  value={{ data: protocol,setProtocolData }}>
            {children}
        </ProtocolContext.Provider >
    )
}