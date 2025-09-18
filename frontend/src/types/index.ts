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
  setUserDetails : (user:BaseUser)=>void
}
