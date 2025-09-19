import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  BtcUSDTPrice,
  CreatedName,
  EthUSDTPrice,
  Messaging
} from "../generated/RafikNS/RafikNS"

export function createBtcUSDTPriceEvent(
  btcPrice: BigInt,
  time: BigInt
): BtcUSDTPrice {
  let btcUsdtPriceEvent = changetype<BtcUSDTPrice>(newMockEvent())

  btcUsdtPriceEvent.parameters = new Array()

  btcUsdtPriceEvent.parameters.push(
    new ethereum.EventParam(
      "btcPrice",
      ethereum.Value.fromSignedBigInt(btcPrice)
    )
  )
  btcUsdtPriceEvent.parameters.push(
    new ethereum.EventParam("time", ethereum.Value.fromUnsignedBigInt(time))
  )

  return btcUsdtPriceEvent
}

export function createCreatedNameEvent(
  username: string,
  userAddress: Address,
  imageURL: string
): CreatedName {
  let createdNameEvent = changetype<CreatedName>(newMockEvent())

  createdNameEvent.parameters = new Array()

  createdNameEvent.parameters.push(
    new ethereum.EventParam("username", ethereum.Value.fromString(username))
  )
  createdNameEvent.parameters.push(
    new ethereum.EventParam(
      "userAddress",
      ethereum.Value.fromAddress(userAddress)
    )
  )
  createdNameEvent.parameters.push(
    new ethereum.EventParam("imageURL", ethereum.Value.fromString(imageURL))
  )

  return createdNameEvent
}

export function createEthUSDTPriceEvent(
  btcPrice: BigInt,
  time: BigInt
): EthUSDTPrice {
  let ethUsdtPriceEvent = changetype<EthUSDTPrice>(newMockEvent())

  ethUsdtPriceEvent.parameters = new Array()

  ethUsdtPriceEvent.parameters.push(
    new ethereum.EventParam(
      "btcPrice",
      ethereum.Value.fromSignedBigInt(btcPrice)
    )
  )
  ethUsdtPriceEvent.parameters.push(
    new ethereum.EventParam("time", ethereum.Value.fromUnsignedBigInt(time))
  )

  return ethUsdtPriceEvent
}

export function createMessagingEvent(
  sender: string,
  reciever: string,
  messageContent: string
): Messaging {
  let messagingEvent = changetype<Messaging>(newMockEvent())

  messagingEvent.parameters = new Array()

  messagingEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromString(sender))
  )
  messagingEvent.parameters.push(
    new ethereum.EventParam("reciever", ethereum.Value.fromString(reciever))
  )
  messagingEvent.parameters.push(
    new ethereum.EventParam(
      "messageContent",
      ethereum.Value.fromString(messageContent)
    )
  )

  return messagingEvent
}
