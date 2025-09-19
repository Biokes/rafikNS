import {BigInt, ethereum, Bytes } from "@graphprotocol/graph-ts"
import {
  BtcUSDTPrice as BtcUSDTPriceEvent,
  CreatedName as CreatedNameEvent,
  EthUSDTPrice as EthUSDTPriceEvent,
  Messaging as MessagingEvent,
} from "../generated/RafikNS/RafikNS"
import {
  BtcUSDTPrice,
  CreatedName,
  EthUSDTPrice,
  Messaging,
  Transaction,
  Protocol,
  User,
} from "../generated/schema"

function getOrCreateTransaction(event: ethereum.Event): Transaction {
  let txId = event.transaction.hash.toHexString()
  let tx = Transaction.load(Bytes.fromHexString(txId))
  if (tx == null) {
    tx = new Transaction(Bytes.fromHexString(txId))
    tx.blockNumber = event.block.number
    tx.blockTimestamp = event.block.timestamp
    tx.transactionHash = event.transaction.hash
    tx.save()
  }
  return tx
}

function getOrCreateProtocol(): Protocol {
  let protoId = "protocol"
  let proto = Protocol.load(Bytes.fromHexString(protoId))
  if (proto == null) {
    proto = new Protocol(Bytes.fromHexString(protoId))
    proto.ethToUsdtPrice = BigInt.fromI32(0)
    proto.btcToUsdtPrice = BigInt.fromI32(0)
    proto.save()
  }
  return proto
}

export function handleBtcUSDTPrice(event: BtcUSDTPriceEvent): void {
  let id = event.transaction.hash.toHexString() + event.logIndex.toString()
  let entity = new BtcUSDTPrice(Bytes.fromHexString(id))

  entity.btcPrice = event.params.btcPrice
  entity.time = event.params.time
  entity.transaction = getOrCreateTransaction(event).id

  let proto = getOrCreateProtocol()
  proto.btcToUsdtPrice = event.params.btcPrice
  proto.save()

  entity.save()
}

export function handleEthUSDTPrice(event: EthUSDTPriceEvent): void {
  let id = event.transaction.hash.toHexString() + event.logIndex.toString()
  let entity = new EthUSDTPrice(Bytes.fromHexString(id))

  entity.btcPrice = event.params.btcPrice
  entity.time = event.params.time
  entity.transaction = getOrCreateTransaction(event).id

  let proto = getOrCreateProtocol()
  proto.ethToUsdtPrice = event.params.btcPrice
  proto.save()

  entity.save()
}

export function handleCreatedName(event: CreatedNameEvent): void {
  let id = event.transaction.hash.toHexString() + event.logIndex.toString()
  let entity = new CreatedName(Bytes.fromHexString(id))

  entity.username = event.params.username
  entity.userAddress = event.params.userAddress
  entity.imageURL = event.params.imageURL
  entity.transaction = getOrCreateTransaction(event).id
  entity.save()

  let userId = event.params.userAddress.toHexString()
  let user = User.load((Bytes.fromHexString(userId)))
  if (user == null) {
    user = new User((Bytes.fromHexString(userId)))
    user.protocol = getOrCreateProtocol().id
    user.username = event.params.username
    user.userAddress = event.params.userAddress.toHexString()
    user.save()
  }
}

export function handleMessaging(event: MessagingEvent): void {
  let id = event.transaction.hash.toHexString() +event.logIndex.toString()
  let entity = new Messaging((Bytes.fromHexString(id)))
  entity.sender = event.params.sender
  entity.reciever = event.params.reciever
  entity.messageContent = event.params.messageContent
  entity.transaction = getOrCreateTransaction(event).id
  entity.protocol = getOrCreateProtocol().id
  entity.save()
}
