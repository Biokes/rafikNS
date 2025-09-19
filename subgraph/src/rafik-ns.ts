import {
  BtcUSDTPrice as BtcUSDTPriceEvent,
  CreatedName as CreatedNameEvent,
  EthUSDTPrice as EthUSDTPriceEvent,
  Messaging as MessagingEvent
} from "../generated/RafikNS/RafikNS"
import {
  BtcUSDTPrice,
  CreatedName,
  EthUSDTPrice,
  Messaging
} from "../generated/schema"

export function handleBtcUSDTPrice(event: BtcUSDTPriceEvent): void {
  let entity = new BtcUSDTPrice(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.btcPrice = event.params.btcPrice
  entity.time = event.params.time

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleCreatedName(event: CreatedNameEvent): void {
  let entity = new CreatedName(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.username = event.params.username
  entity.userAddress = event.params.userAddress
  entity.imageURL = event.params.imageURL

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleEthUSDTPrice(event: EthUSDTPriceEvent): void {
  let entity = new EthUSDTPrice(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.btcPrice = event.params.btcPrice
  entity.time = event.params.time

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMessaging(event: MessagingEvent): void {
  let entity = new Messaging(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.sender = event.params.sender
  entity.reciever = event.params.reciever
  entity.messageContent = event.params.messageContent

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
