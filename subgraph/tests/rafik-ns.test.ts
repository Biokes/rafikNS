import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address } from "@graphprotocol/graph-ts"
import { CreatedName } from "../generated/schema"
import { CreatedName as CreatedNameEvent } from "../generated/RafikNS/RafikNS"
import { handleCreatedName } from "../src/rafik-ns"
import { createCreatedNameEvent } from "./rafik-ns-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#tests-structure

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let username = "Example string value"
    let userAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let imageURL = "Example string value"
    let newCreatedNameEvent = createCreatedNameEvent(
      username,
      userAddress,
      imageURL
    )
    handleCreatedName(newCreatedNameEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#write-a-unit-test

  test("CreatedName created and stored", () => {
    assert.entityCount("CreatedName", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "CreatedName",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "username",
      "Example string value"
    )
    assert.fieldEquals(
      "CreatedName",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "userAddress",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "CreatedName",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "imageURL",
      "Example string value"
    )

    // More assert options:
    // https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#asserts
  })
})
