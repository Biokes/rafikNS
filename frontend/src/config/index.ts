import {sepolia} from 'wagmi/chains';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { createPublicClient, http } from 'viem'
import { gql } from 'graphql-request';
import { ethers } from "ethers";

export const config = getDefaultConfig({
    appName: 'RafikNS',
    projectId: 'YOUR_PROJECT_ID',
    chains: [sepolia],
    ssr: false,
})
export const CONTRACT_ABI =[
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "int256",
          "name": "btcPrice",
          "type": "int256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "time",
          "type": "uint256"
        }
      ],
      "name": "BtcUSDTPrice",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "username",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "userAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "imageURL",
          "type": "string"
        }
      ],
      "name": "CreatedName",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "int256",
          "name": "btcPrice",
          "type": "int256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "time",
          "type": "uint256"
        }
      ],
      "name": "EthUSDTPrice",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "sender",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "reciever",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "messageContent",
          "type": "string"
        }
      ],
      "name": "Messaging",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "btcEthPrice",
      "outputs": [
        {
          "internalType": "int256",
          "name": "",
          "type": "int256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "counter",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "image",
          "type": "string"
        }
      ],
      "name": "createName",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getBtcFeed",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getEthPrice",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        }
      ],
      "name": "getInbox",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "sender",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "reciever",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "content",
              "type": "string"
            }
          ],
          "internalType": "struct RafikNS.Message[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getPriceFeeds",
      "outputs": [
        {
          "internalType": "int256",
          "name": "",
          "type": "int256"
        },
        {
          "internalType": "int256",
          "name": "",
          "type": "int256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        }
      ],
      "name": "isAvailableName",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "sender",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "messageReciever",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "content",
          "type": "string"
        }
      ],
      "name": "message",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "usdtEthPrice",
      "outputs": [
        {
          "internalType": "int256",
          "name": "",
          "type": "int256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ] as const;
export const CONTRACT_ADDRESS: string = "0x45584566FcFad6778439E908Fb3Ec308AB49eCd5"
export const publicClient = createPublicClient({
  chain: sepolia,
  transport: http()
})
export const GRAPH_BASE_URL = "https://api.studio.thegraph.com/query/120726/rafik-ns/0.0.5";
export const API_Key = "7d304383fec279b52a8a"
export const API_SECRET =  "1d02a459f75b764c7716cd54e9ea2e5bc5f6fe80e24f7399b65047b0ee095d86"
export const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI1ZTljMWFjOS0zYjY5LTRlMTgtYWMzMC00YTMwN2M4MWIyNWUiLCJlbWFpbCI6ImF5b21pZGViaW9rZXMzMTMxQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI3ZDMwNDM4M2ZlYzI3OWI1MmE4YSIsInNjb3BlZEtleVNlY3JldCI6IjFkMDJhNDU5Zjc1Yjc2NGM3NzE2Y2Q1NGU5ZWEyZTViYzVmNmZlODBlMjRmNzM5OWI2NTA0N2IwZWUwOTVkODYiLCJleHAiOjE3ODk1NDUxMzN9.iXkonPvYMEIHVPGAnkbYPd6e9aZgX20ePgM8ozq2EdA"
export const PROTOCOL_QUERY = gql`
query{
  protocol(id: "protocol") {
    btcToUsdtPrice
    ethToUsdtPrice
    users(first: 1000) {
      userAddress
      username
      id
      imageURL
    }
    messages(first: 1000, orderBy: id) {
      id
      messageContent
      reciever
      sender
      transaction {
        blockTimestamp
      }
    }
  } 
}
`
export const MESSAGES_QUERY = gql`
query Messages($sender: String!, $reciever: String!) {
    messagings(
      where: {
        or: [
          { sender: $sender, reciever: $reciever }
          { reciever: $sender, sender: $reciever }
        ]
      }
      orderBy: transaction__blockTimestamp
      orderDirection: asc
    ) {
      id
      messageContent
      sender
      reciever
      transaction {
        blockTimestamp
      }
    }
  }
`
export const jsonRpcProvider = new ethers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/e8DuJbLjr5-TIkTn4GQ-RNKmrPkbD0TN")
export const CONTRACT = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, jsonRpcProvider)
