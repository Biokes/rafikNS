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
export interface User {
  imageURL: string;
  recievedMessages: [];
  sentMessages: [];
  username: string;
  userAddress: string;
}
export interface RafikNS { 
  rafikNSs: {
    users: User[]
  }[]
}

export interface UserListProps {
  selectedUser: User;
  onUserSelect: (userId: User) => void;
  className?: string;
}
export interface Protocol { 
    data: RafikNS | null;
    setProtocolData: (rafikNs:RafikNS) => void;
}
