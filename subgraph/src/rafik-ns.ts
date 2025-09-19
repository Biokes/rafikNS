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


// import {
//   CreatedName as CreatedNameEvent,
//   Messaging as MessagingEvent,
// } from "../generated/RafikNS/RafikNS"
// import { Bytes, ethereum } from "@graphprotocol/graph-ts"
// import {
//   CreatedName,
//   Messaging,
//   RafikNS,
//   Transaction,
// } from "../generated/schema"

// function getOrCreateTransaction(event: ethereum.Event): Transaction {
//   let txId = event.transaction.hash.toHexString()
//   let tx = Transaction.load(txId)
//   if (tx == null) {
//     tx = new Transaction(txId)
//     tx.blockNumber = event.block.number
//     tx.blockTimestamp = event.block.timestamp
//     tx.transactionHash = event.transaction.hash
//     tx.save()
//   }
//   return tx
// }

// function getOrCreateProtocol(): RafikNS {
//   let protoId = "protocol"
//   let proto = RafikNS.load(protoId)
//   if (proto == null) {
//     proto = new RafikNS(protoId)
//     proto.contractAddress = Bytes.fromHexString("0x305F599fbCd667dbb9ca28960751430A1e8Fc3Ad")
//     proto.save()
//   }
//   return proto
// }

// export function handleCreatedName(event: CreatedNameEvent): void {
//   let tx = getOrCreateTransaction(event)
//   let proto = getOrCreateProtocol()

//   let username = event.params.username
//   let id = username

//   let user = CreatedName.load(id)
//   if (user == null) {
//     user = new CreatedName(id)
//     user.username = username
//     user.userAddress = event.params.userAddress
//     user.imageURL = event.params.imageURL
//     user.transaction = tx.id
//     user.protocol = proto.id
//       user.contractAddress = event.address;
//     user.save()
//   }
// }

// export function handleMessaging(event: MessagingEvent): void {
//   let tx = getOrCreateTransaction(event)
//   let proto = getOrCreateProtocol()

//   let id = event.transaction.hash.concatI32(event.logIndex.toI32())
//   let message = new Messaging(id)

//   message.sender = event.params.sender
//   message.reciever = event.params.reciever
//   message.messageContent = event.params.messageContent
//   message.transaction = tx.id
//   message.protocol = proto.id
//   message.contractAddress = event.address;

//   let senderUser = CreatedName.load(event.params.sender)
//   if (senderUser != null) {
//     message.senderUser = senderUser.id
//   }

//   let receiverUser = CreatedName.load(event.params.reciever)
  
//   if (receiverUser != null) {
//     message.receiverUser = receiverUser.id
//   }

//   message.save()
// }
