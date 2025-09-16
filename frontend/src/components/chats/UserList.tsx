import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface User {
  id: string;
  name: string;
  avatar?: string;
  status: "online" | "offline" | "away";
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
}

interface UserListProps {
  selectedUserId?: string;
  onUserSelect: (userId: string) => void;
  className?: string;
}

const mockUsers: User[] = [
  {
    id: "5",
    name: "Jessica Williams",
    avatar: "",
    status: "online",
    lastMessage: "The project looks great!",
    lastMessageTime: "Yesterday",
    unreadCount: 1,
  },
];

export default function UserList({
  selectedUserId,
  onUserSelect,
  className,
}: UserListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = mockUsers.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: User["status"]) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "away":
        return "bg-yellow-500";
      case "offline":
        return "bg-gray-400";
      default:
        return "bg-gray-400";
    }
  };

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
            key={user.id}
            onClick={() => onUserSelect(user.id)}
            className={cn(
              "flex items-center gap-3 p-4 cursor-pointer transition-colors hover:bg-chat-hover",
              selectedUserId === user.id && "bg-chat-active border-r-2 border-primary"
            )}
          >
            <div className="relative">
              <Avatar className="h-12 w-12">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div
                className={cn(
                  "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-chat-panel",
                  getStatusColor(user.status)
                )}
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-medium text-chat-text truncate">
                  {user.name}
                </h3>
                {user.lastMessageTime && (
                  <span className="text-xs text-chat-text-muted">
                    {user.lastMessageTime}
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between">
                {user.lastMessage && (
                  <p className="text-sm text-chat-text-muted truncate">
                    {user.lastMessage}
                  </p>
                )}
                {user.unreadCount && user.unreadCount > 0 && (
                  <Badge
                    variant="default"
                    className="bg-primary text-primary-foreground text-xs h-5 min-w-5 rounded-full px-1.5"
                  >
                    {user.unreadCount}
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