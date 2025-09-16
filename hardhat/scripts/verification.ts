    import hre from "hardhat";
    import { verifyContract } from "@nomicfoundation/hardhat-verify/verify";

    await verifyContract(
    {
        address: "0xBB421d7674E509037Dad9021f2505146DEC041d0",
        provider: "etherscan",
    },
    hre,
    );