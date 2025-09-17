import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { gql, request } from "graphql-request";

interface User {
  imageURL: string;
  recievedMessage: [];
  sentMessage: [];
  // unreadCount?: number;
  username: string;
  userAddress: string;
}
interface RafikNS { 
  rafikNS: {
    users: User[]
  }
}

interface UserListProps {
  selectedUserId?: string;
  onUserSelect: (userId: string) => void;
  className?: string;
}



export default function UserList({
  selectedUserId,
  onUserSelect,
  className,
}: UserListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [protocol, setProtocol] = useState<RafikNS>({rafikNS: {users:[]}})
    const document = gql`{
      rafikNS(id: "protocol") {
        users(first: 1000, orderBy: username) {
          imageURL
          sentMessages(first: 1000, orderBy: id) {
            id
            messageContent
            reciever
            sender
            transaction {
              blockNumber
              blockTimestamp
              id
              transactionHash
            }
          }
          receivedMessages(first: 1000, orderBy: id) {
            id
            messageContent
            reciever
            sender
            transaction {
              blockNumber
              blockTimestamp
              id
              transactionHash
            }
          }
          userAddress
          username
        }
      }
  }`
  
  const fetchProtocolUsers = async () => {
    try {
      const response:RafikNS = await request('https://api.studio.thegraph.com/query/120726/rafik-ns/0.0.1', document)
      setProtocol(response)
      console.log("fetched users: ", response)
    } catch (error) { 
      console.error("Fetching error: ",error)
    }
  }
  
  useEffect(() => { 
    fetchProtocolUsers()
  },[])
  // {
  //   id: "5",
  //   name: "Jessica Williams",
  //   avatar: "",
  //   status: "online",
  //   lastMessage: "The project looks great!",
  //   lastMessageTime: "Yesterday",
  //   unreadCount: 1,
  // },
  const filteredUsers = protocol.rafikNS.users.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const getStatusColor = (status: User["status"]) => {
  //   switch (status) {
  //     case "online":
  //       return "bg-green-500";
  //     case "away":
  //       return "bg-yellow-500";
  //     case "offline":
  //       return "bg-gray-400";
  //     default:
  //       return "bg-gray-400";
  //   }
  // };

  return (
    <div className={cn("flex flex-col h-full", className)}>
      <div className="p-4 border-b border-chat-border">
        <h2 className="text-lg font-semibold text-chat-text mb-3">Chats</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 bg-chat-hover border border-chat-border rounded-lg text-chat-text placeholder-chat-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {filteredUsers.map((user) => (
          <div
            key={user.userAddress}
            onClick={() => onUserSelect(user.username)}
            className={cn(
              "flex items-center gap-3 p-4 cursor-pointer transition-colors hover:bg-chat-hover hover:bg-gray-700",
              selectedUserId === user.userAddress && "bg-chat-active border-r-2 border-primary"
            )}
          >
            <div className="relative">
              <Avatar className="h-12 w-12">
                <AvatarImage src={user.imageURL} alt={user.userAddress} />
                {/* <AvatarFallback className="bg-primary text-primary-foreground">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback> */}
              </Avatar>
              {/* <div
                className={cn(
                  "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-chat-panel",
                  getStatusColor(user.status)
                )}
              /> */}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-medium text-chat-text truncate">
                  {user.username}
                </h3>
                {user.sentMessage.length>0 && (
                  <span className="text-xs text-chat-text-muted">
                    user.sentMessage
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between">
                {user.sentMessage.length>0 && (
                  <p className="text-sm text-chat-text-muted truncate">
                    user.sentMessage
                  </p>
                )}
                {user.sentMessage && (
                  <Badge
                    variant="default"
                    className="bg-primary text-primary-foreground text-xs h-5 min-w-5 rounded-full px-1.5"
                  >
                    0
                  </Badge>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}