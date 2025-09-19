import { useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { UserListProps } from "@/types";
import { Badge } from "lucide-react";
import { useProtocol } from "@/contexts/useProtocol";



export default function UserList({
  selectedUser,
  onUserSelect,
  className,
}: UserListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const {data:protocol} = useProtocol()
  

  return (
    <div className={cn("flex flex-col h-full", className)}>
      <div className="p-4 border-b border-chat-border">
        <h2 className="text-lg font-semibold text-chat-text mb-3">Chats</h2>
        <div className="relative">
          <input type="text" placeholder="Search conversations..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 bg-chat-hover border border-chat-border rounded-lg text-chat-text placeholder-chat-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {protocol!.rafikNSs[0]?.users.map((user) => (
          <div
            key={user.username}
            onClick={() => onUserSelect(user)}
            className={cn(
              "flex items-center gap-3 p-4 cursor-pointer transition-colors hover:bg-chat-hover hover:bg-gray-700",
              selectedUser.username === user.username && "bg-chat-active border-r-2 border-primary border-y-[1px] border-gray-700"
            )}
          >
            <div className="relative">
              <Avatar className="h-12 w-12 border-[2px] shadow-white">
                <AvatarImage src={user.imageURL} alt={user.userAddress} />
              </Avatar>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-medium text-chat-text truncate">
                  {user.username}
                </h3>
              </div>
              <div className="flex items-center justify-between">
                {user.sentMessages.length > 0 ? (
                  <p className="text-sm text-chat-text-muted truncate">
                    {user.sentMessages.splice(-1)}
                  </p>
                ):(
                  <p className="text-sm text-chat-text-muted truncate italic">
                    no messages sent yet
                  </p>
                ) }
                {user.sentMessages.length>0 &&
                  <Badge className="bg-primary text-primary-foreground text-xs h-5 min-w-5 rounded-full px-1.5">
                    100
                  </Badge>
                }
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}