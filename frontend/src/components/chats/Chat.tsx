import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import UserList from "./UserList";
import ChatWindow from "./ChatWindow";
import { useAccount } from "wagmi"


export default function Chat() {
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [showChat, setShowChat] = useState(false);
  const { address } = useAccount()
  const handleUserSelect = (userId: string) => {
    if (!address) return;
    setSelectedUserId(userId);
    setShowChat(true);
  };

  const handleBackToList = () => {
    setShowChat(false);
    setSelectedUserId("");
  };

  return (
    <div className="w-full h-full bg-chat-bg flex-1">
      <div className="h-full">
        <div className="md:hidden h-full">
          {!showChat ? (
            <div className="h-full bg-card/50 backdrop-blur-xl border-r border-border">
              <UserList
                selectedUserId={selectedUserId}
                onUserSelect={handleUserSelect}
              />
            </div>
          ) : (
            <div className="h-full bg-card/50 backdrop-blur-xl">
              <div className="flex items-center gap-3 p-4 border-b border-border">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleBackToList}
                  className="text-foreground hover:bg-accent"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <span className="text-lg font-semibold text-foreground">
                  Back to Chats
                </span>
              </div>
              <div className="h-[calc(100%-73px)]">
                <ChatWindow 
                  userId={selectedUserId} 
                />
              </div>
            </div>
          )}
        </div>
        <div className="hidden md:flex h-full">
          <div className="w-1/3 max-w-sm bg-card/50 backdrop-blur-xl border-r border-border">
            <UserList selectedUserId={selectedUserId} onUserSelect={handleUserSelect}/>
          </div>
          <div className="flex-1 bg-card/50 backdrop-blur-xl">
            <ChatWindow 
              userId={selectedUserId}
            />
          </div>
        </div>
      </div>
    </div>
  );
}