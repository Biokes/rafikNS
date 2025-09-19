import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { BtcUSDTPrice } from "../generated/schema"
import { BtcUSDTPrice as BtcUSDTPriceEvent } from "../generated/RafikNS/RafikNS"
import { handleBtcUSDTPrice } from "../src/rafik-ns"
import { createBtcUSDTPriceEvent } from "./rafik-ns-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#tests-structure

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let btcPrice = BigInt.fromI32(234)
    let time = BigInt.fromI32(234)
    let newBtcUSDTPriceEvent = createBtcUSDTPriceEvent(btcPrice, time)
    handleBtcUSDTPrice(newBtcUSDTPriceEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#write-a-unit-test

  test("BtcUSDTPrice created and stored", () => {
    assert.entityCount("BtcUSDTPrice", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "BtcUSDTPrice",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "btcPrice",
      "234"
    )
    assert.fieldEquals(
      "BtcUSDTPrice",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "time",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#asserts
  })
})
