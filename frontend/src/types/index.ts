export type BaseUser = {
  id: string;
  username: string;
  userAddress: string;
  imageURL: string;
};
export type UserProfiles = {
  createdNames: BaseUser[];
};
export type UserContextType ={
  user: BaseUser | null;
  setUserDetails: React.Dispatch<React.SetStateAction<null | BaseUser>>;
}
export interface User extends BaseUser{
  recievedMessages: [];
  sentMessages: [];
}
export interface Message { 
  id: string;
  messageContent: string;
  reciever: string;
  sender: string;
  transaction: {
    blockTimestamp:number
  }
}
export interface RafikNS { 
  btcToUsdtPrice: number;
  ethToUsdtPrice: number;
  users: User[];
  messages:Message[]
}

export interface UserListProps {
  selectedUser: User;
  onUserSelect: (userId: User) => void;
  className?: string;
}
export interface Protocol { 
    data: RafikNS;
    setProtocolData: (rafikNs:RafikNS) => void;
}
