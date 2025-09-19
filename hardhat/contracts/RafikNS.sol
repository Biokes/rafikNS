// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.28;
import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";


contract RafikNS{    
    function isAvailableName(string memory name) external view returns(bool){
        return usernames[name].userAddress == address(0);
    }

    function createName(string memory name,string memory image) external{
        require(usernames[name].userAddress == address(0),"Name already taken");
        usernames[name].userAddress = msg.sender;
        usernames[name].imageURL = image;
        emit CreatedName(name, msg.sender, image);
    }

   function message(string memory sender,string memory messageReciever, string memory content) external {
        counter+=1;
        inbox[sender].push(Message({id:counter, reciever: messageReciever, content: content, sender: sender}));
        emit Messaging(sender,messageReciever,content);
    }

    function getInbox(string memory name) external view returns (Message[] memory) {
        return inbox[name];
    }

  
    function getBtcFeed() public{
        (,int256 answer,,,) = btcUSDTFeed.latestRoundData();
        btcEthPrice = answer;
        emit BtcUSDTPrice(btcEthPrice, block.timestamp); 
    }

    function getEthPrice() public{
        (,int256 answer,,,) = usdcETHFeed.latestRoundData();
        usdtEthPrice = answer;
        emit EthUSDTPrice(usdtEthPrice, block.timestamp); 
    }


    function getPriceFeeds() external returns (int, int){
        getBtcFeed();
        getEthPrice();
        return (btcEthPrice, usdtEthPrice);
    }

    constructor (){
        btcUSDTFeed = AggregatorV3Interface(0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43);
        usdcETHFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);
    }

    AggregatorV3Interface internal btcUSDTFeed;
    AggregatorV3Interface internal usdcETHFeed;
    User[] private users;
    mapping (string => User) private usernames;
    mapping (string => Message[]) private inbox;
    uint public counter =  0;
    int256 public  btcEthPrice;
    int256 public  usdtEthPrice;

    struct User{
        address userAddress;
        string imageURL;
    }

    struct Message{
        uint id;
        string sender;
        string reciever;
        string content;
    }

    event CreatedName(string username, address userAddress, string imageURL);
    event Messaging(string sender, string reciever, string messageContent);
    event BtcUSDTPrice(int256 btcPrice, uint256 time);
    event EthUSDTPrice(int256 btcPrice, uint256 time);
}
