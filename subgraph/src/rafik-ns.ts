import {
  CreatedName as CreatedNameEvent,
  Messaging as MessagingEvent,
} from "../generated/RafikNS/RafikNS"
import { ethereum } from "@graphprotocol/graph-ts"
import {
  CreatedName,
  Messaging,
  RafikNS,
  Transaction,
} from "../generated/schema"

function getOrCreateTransaction(event: ethereum.Event): Transaction {
  let txId = event.transaction.hash.toHexString()
  let tx = Transaction.load(txId)
  if (tx == null) {
    tx = new Transaction(txId)
    tx.blockNumber = event.block.number
    tx.blockTimestamp = event.block.timestamp
    tx.transactionHash = event.transaction.hash
    tx.save()
  }
  return tx
}

function getOrCreateProtocol(): RafikNS {
  let protoId = "protocol"
  let proto = RafikNS.load(protoId)
  if (proto == null) {
    proto = new RafikNS(protoId)
    proto.save()
  }
  return proto
}

export function handleCreatedName(event: CreatedNameEvent): void {
  let tx = getOrCreateTransaction(event)
  let proto = getOrCreateProtocol()

  let username = event.params.username
  let id = username

  let user = CreatedName.load(id)
  if (user == null) {
    user = new CreatedName(id)
    user.username = username
    user.userAddress = event.params.userAddress
    user.imageURL = event.params.imageURL
    user.transaction = tx.id
    user.protocol = proto.id
    user.save()
  }
}

export function handleMessaging(event: MessagingEvent): void {
  let tx = getOrCreateTransaction(event)
  let proto = getOrCreateProtocol()

  let id = event.transaction.hash.concatI32(event.logIndex.toI32())
  let message = new Messaging(id)

  message.sender = event.params.sender
  message.reciever = event.params.reciever
  message.messageContent = event.params.messageContent
  message.transaction = tx.id
  message.protocol = proto.id

  let senderUser = CreatedName.load(event.params.sender)
  if (senderUser != null) {
    message.senderUser = senderUser.id
  }

  let receiverUser = CreatedName.load(event.params.reciever)
  
  if (receiverUser != null) {
    message.receiverUser = receiverUser.id
  }

  message.save()
}
