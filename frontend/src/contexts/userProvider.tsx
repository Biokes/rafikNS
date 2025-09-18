import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import type {BaseUser, UserContextType, UserProfiles} from "@/types";
import {useAccount} from "wagmi";
import {gql, request} from "graphql-request";
import {GRAPH_BASE_URL} from "@/config";

const UserContext = createContext<UserContextType| undefined>(undefined)
const GET_USER_BY_ADDRESS = gql`
  query GetUserByAddress($address: Bytes!) {
    createdNames(where: { userAddress: $address }) {
      id
      username
      userAddress
      imageURL
    }
  }
`;

export function UserProvider({children}:{children: ReactNode}){
    const {address, isConnected} = useAccount()
    const [user, setUser] = useState<BaseUser | null>(null);
    useEffect(() => {
        async  function fetchUser(){
            if(!isConnected || !address) return;
            try{
                const responseData:UserProfiles = await request(GRAPH_BASE_URL, GET_USER_BY_ADDRESS, {address : address.toLowerCase()})
                if(responseData.createdNames.length>0){
                    setUser(responseData.createdNames[0])
                }
            }catch(error){
                console.log("error: ", error)
            }

        }
        fetchUser()
        }, [address, isConnected]);
    function setUserDetails (user: BaseUser){
        setUser(user)
    }
    return (
        <UserContext.Provider value={{user, setUserDetails}}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used inside UserProvider");
    }
    return context;
}