# RafikNS - Blockchain Name Service and Messaging System

## Overview
RafikNS is a decentralized name service and messaging system built on the Lisk blockchain. It allows users to register unique usernames, associate them with their Ethereum addresses, and send messages to other registered users on the RafikNS network.

## Features
- Username registration with avatar/image support
- Username availability checking
- Decentralized messaging system
- Message inbox retrieval

## Project Structure
```
hardhat/
├── contracts/          # Smart contract source files
├── test/              # Test files
├── scripts/           # Deployment and verification scripts
├── ignition/          # Deployment modules and configurations
└── types/             # TypeScript type definitions
```

## Smart Contract
The main contract `RafikNS.sol` implements:
- Username registration and management
- Message storage and retrieval
- Events for username creation and messaging

### Key Functions
- `isAvailableName(string name)`: Check if a username is available
- `createName(string name, string image)`: Register a new username with an avatar
- `message(string sender, string receiver, string content)`: Send a message
- `getInbox(string name)`: Retrieve messages for a username

## Development Setup

### Prerequisites
- Node.js (v16 or higher)
- pnpm/npm/yarn
- A Lisk Sepolia RPC URL
- An Etherscan API key for verification

### Installation
1. Install dependencies:
```bash
pnpm install
```

2. Put in hardhat local Keystore file the following variables:
```
PRIVATE_KEY=your_private_key
LISK_SEPOLIA_URL=your_rpc_url
ETHERSCAN_API_KEY=your_api_key
```

### Testing
Run the test suite:
```bash
npx hardhat test
```

### Deployment
Deploy to Lisk Sepolia network:
```bash
npx hardhat run scripts/verification.ts --network liskSepolia
```

### Contract Verification
Verify the deployed contract:
```bash
npx hardhat verify --network liskSepolia <CONTRACT_ADDRESS>
```

## Network Configuration
The project is configured for:
- Lisk Sepolia Testnet (Chain ID: 4202)
- Local Hardhat network for testing

## Solidity Configuration
- Solidity version: 0.8.28
- Optimizer enabled for production builds

## Development Tools
- Hardhat for development environment
- Hardhat Verify for contract verification
- Hardhat Keystore for secure key management
- Hardhat Toolbox with Mocha and Ethers.js integration

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## contract Details
- Deployed Contract Address: 0xBB421d7674E509037Dad9021f2505146DEC041d0 (Lisk-sepolia),  0x45584566FcFad6778439E908Fb3Ec308AB49eCd5 (sepolia)
- Deployed chain: Lisk sepolia, sepolia 

[Click here to view on explorer](https://sepolia.etherscan.io/address/0x305F599fbCd667dbb9ca28960751430A1e8Fc3Ad#code)