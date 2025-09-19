import type { RafikNS } from "@/types"
import { useState, useCallback, useEffect } from "react"
import { ProtocolContext } from "./useProtocol"
import { gql, request} from "graphql-request"
import { useAccount } from "wagmi"
import { GRAPH_BASE_URL } from "@/config"

export default function ProtocolProvider({ children }: { children: React.ReactNode }) {

    const [protocol, setProtocol] = useState<RafikNS>({ rafikNSs: [{ users: [] }] })
    const { address } = useAccount()
    const setProtocolData = (protocol: RafikNS)=>{ 
        setProtocol(protocol)
    }
    const document = gql`{
      rafikNSs(id: "protocol", where: {contractAddress: "0x305F599fbCd667dbb9ca28960751430A1e8Fc3Ad" }) {
        users(first: 1000, orderBy: username) {
          imageURL
          sentMessages(first: 1000, orderBy: id) {
            id
            messageContent
            reciever
            sender
            transaction {
              blockNumber
              blockTimestamp
              id
              transactionHash 
            }
          }
          receivedMessages(first: 1000, orderBy: id) {
            id
            messageContent
            reciever
            sender
            transaction {
              blockNumber
              blockTimestamp
              id
              transactionHash
            }
          }
          userAddress
          username
        }
      }
  }`

  const fetchProtocolUsers = useCallback(async () => {
    try {
      const response: RafikNS = await request(GRAPH_BASE_URL, document)
      setProtocol(response)
    } catch (error) {
      console.error("Fetching error: ", error)
    }
  }, [document])

    useEffect(() => {
        if (address)
    fetchProtocolUsers()
  }, [address, fetchProtocolUsers])
    return (
        <ProtocolContext.Provider  value={{ data: protocol,setProtocolData }}>
            {children}
        </ProtocolContext.Provider >
    )
}