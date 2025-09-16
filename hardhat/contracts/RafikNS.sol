// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.28;

contract RafikNS{
    struct User{
        address userAddress;
        string imageURL;
    }

    struct Message{
        string sender;
        string reciever;
        string content;
    }

    User[] private users;
    mapping (string => User) private usernames;
    mapping (string => Message[]) private inbox;

    
    function isAvailableName(string memory name) external view returns(bool){
        return usernames[name].userAddress == address(0);
    }

    function createName(string memory name,string memory image) external{
        require(usernames[name].userAddress == address(0),"Name already taken");
        usernames[name].userAddress = msg.sender;
        usernames[name].imageURL = image;
        emit CreatedName(name, msg.sender, image);
    }

   function message(string memory sender,string memory messageReciever, string memory content)external {
        inbox[sender].push(Message({reciever: messageReciever, content: content, sender: sender}));
        inbox[messageReciever].push(Message({reciever:messageReciever, sender: sender, content: content}));
        emit Messaging(sender,messageReciever,content);
    }

    function getInbox(string memory name) external view returns (Message[] memory) {
        return inbox[name];
    }
    
    event CreatedName(string username, address userAddress, string imageURL);
    event Messaging(string sender, string reciever, string messageContent);
}