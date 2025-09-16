import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import UserList from "./UserList";
import ChatWindow from "./ChatWindow";


export default function Chat() {
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [showChat, setShowChat] = useState(false);

  const handleUserSelect = (userId: string) => {
    setSelectedUserId(userId);
    setShowChat(true);
  };

  const handleBackToList = () => {
    setShowChat(false);
    setSelectedUserId("");
  };

  return (
    <div className="w-full h-screen bg-chat-bg mt-12">
      <div className="absolute inset-0 z-10 p-3relative w-full h-[620px] overflow-hidden">
        <div className="md:hidden h-full mt-5">
          {!showChat ? (
            <div className="h-full bg-chat-panel-glass backdrop-blur-xl border-r border-chat-border">
              <UserList
                selectedUserId={selectedUserId}
                onUserSelect={handleUserSelect}
              />
            </div>
          ) : (
            <div className="h-full bg-chat-panel-glass backdrop-blur-xl">
              <div className="flex items-center gap-3 p-4 border-b border-chat-border">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleBackToList}
                  className="text-chat-text hover:bg-chat-hover"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <span className="text-lg font-semibold text-chat-text">
                  Back to Chats
                </span>
              </div>
              <div className="h-[calc(100%-73px)]">
                <ChatWindow userId={selectedUserId} />
              </div>
            </div>
          )}
        </div>
        <div className="hidden md:flex h-full">
          <div className="w-1/3 max-w-sm bg-chat-panel-glass backdrop-blur-xl border-r border-chat-border">
            <UserList
              selectedUserId={selectedUserId}
              onUserSelect={handleUserSelect}
            />
          </div>
          <div className="flex-1 bg-chat-panel-glass backdrop-blur-xl">
            <ChatWindow userId={selectedUserId} />
          </div>
        </div>
      </div>
    </div>
  );
}