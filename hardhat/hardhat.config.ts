import type { HardhatUserConfig } from "hardhat/config";
import hardhatVerify from "@nomicfoundation/hardhat-verify";
import hardhatKeystore from "@nomicfoundation/hardhat-Keystore";
import hardhatToolboxMochaEthersPlugin from "@nomicfoundation/hardhat-toolbox-mocha-ethers";
import { configVariable } from "hardhat/config";

const config: HardhatUserConfig = {
  plugins: [hardhatToolboxMochaEthersPlugin, hardhatVerify, hardhatKeystore],
  solidity: {
    profiles: {
      default: {
        version: "0.8.28",
      },
      production: {
        version: "0.8.28",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
          viaIR: true,
        },
      },
    },
  },
  networks: {
    liskSepolia: {
      type: "http",
      url: configVariable("LISK_SEPOLIA_URL"),
      accounts: [configVariable("PRIVATE_KEY")],
      chainId: 4202,
    },
    Sepolia: {
      type: "http",
      url: "https://ethereum-sepolia-rpc.publicnode.com",
      accounts: [configVariable("PRIVATE_KEY")],
      chainId: 11155111,
    },
    hardhatMainnet: {
      type: "edr-simulated",
      chainType: "l1",
    },
    hardhatOp: {
      type: "edr-simulated",
      chainType: "op",
    },
  },
  verify: {
    etherscan: {
      apiKey: configVariable("ETHERSCAN_API_KEY"),
    },
    blockscout: {
      enabled: true,
    },
  },
  chainDescriptors: {
    4202: {
      name: "Listk Sepolia Blockscout",
      blockExplorers: {
        blockscout: {
          name: "Lisk Sepolia Blockscout",
          url: "https://rpc.sepolia-api.lisk.com",
          apiUrl: "https://sepolia-blockscout.lisk.com/api",
        },
        etherscan: {
          name: "Lisk Sepolia Blockscout",
          url: "https://rpc.sepolia-api.lisk.com",
          apiUrl: "https://sepolia-blockscout.lisk.com/api",
        },
      },
    },
    11155111: {
      name: "Sepolia",
      blockExplorers: {
        etherscan: {
          name: "Etherscan (Sepolia)",
          url: "https://sepolia.etherscan.io",
          apiUrl: "https://api-sepolia.etherscan.io/api",
        },
      },
    },
  },
};

export default config;
