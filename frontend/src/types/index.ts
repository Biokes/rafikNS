export type BaseUser = {
  username: string;
  userAddress: string;
  imageURL: string;
};
export type UserProfiles = {
  createdNames: BaseUser[];
};
