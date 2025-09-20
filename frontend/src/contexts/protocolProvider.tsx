import type { RafikNS } from "@/types"
import { useState, useCallback, useEffect } from "react"
import { ProtocolContext } from "./useProtocol"
import { request} from "graphql-request"
import { GRAPH_BASE_URL, PROTOCOL_QUERY } from "@/config"

export default function ProtocolProvider({ children }: { children: React.ReactNode }) {

  const [protocol, setProtocol] = useState<RafikNS>({
    btcToUsdtPrice: 0,
    ethToUsdtPrice: 0,
    users: [],
    messages:[]
     })
    const setProtocolData = (protocol: RafikNS)=>{ 
        setProtocol(protocol)
    }
   
  const fetchProtocolUsers = useCallback(async () => {
    try {
      const response = await request<{protocol: RafikNS}>(GRAPH_BASE_URL, PROTOCOL_QUERY)
      setProtocol(response.protocol)
    } catch (error) {
      console.error("Fetching error: ", error)
    }
  }, [])

    useEffect(() => {
      fetchProtocolUsers()
    }, [fetchProtocolUsers])
    return (
        <ProtocolContext.Provider  value={{ data: protocol,setProtocolData, fetchProtocolUsers }}>
            {children}
        </ProtocolContext.Provider >
    )
}