import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("RafikNSModule", (m) => {
  const rafikNS = m.contract("RafikNS");
  return { rafikNS };
});
