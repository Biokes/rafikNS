import type { RafikNS } from "@/types"
import { useState, useCallback, useEffect } from "react"
import { ProtocolContext } from "./useProtocol"
import { request} from "graphql-request"
import { useAccount } from "wagmi"
import { GRAPH_BASE_URL, PROTOCOL_QUERY } from "@/config"
import { ContractFunctionExecutionError } from "viem"
import { toast } from "sonner"

export default function ProtocolProvider({ children }: { children: React.ReactNode }) {

  const [protocol, setProtocol] = useState<RafikNS>({
    btcToUsdtPrice: 0,
    ethToUsdtPrice: 0,
    users: [],
    messages:[]
     })
    const { address } = useAccount()
    const setProtocolData = (protocol: RafikNS)=>{ 
        setProtocol(protocol)
    }
   
  const fetchProtocolUsers = useCallback(async () => {
    try {
      const response: RafikNS = await request(GRAPH_BASE_URL, PROTOCOL_QUERY)
      setProtocol(response)
    } catch (error) {
      if (error instanceof ContractFunctionExecutionError) { 
        toast.error(error.details)
      }
      console.error("Fetching error: ", error)
    }
  }, [])

    useEffect(() => {
        if (address) fetchProtocolUsers()
  }, [address, fetchProtocolUsers])
    return (
        <ProtocolContext.Provider  value={{ data: protocol,setProtocolData }}>
            {children}
        </ProtocolContext.Provider >
    )
}