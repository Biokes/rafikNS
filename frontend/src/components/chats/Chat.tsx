import { useState, useEffect } from "react";
import UserList from "./UserList";
import ChatWindow from "./ChatWindow";
import { useAccount } from "wagmi"
import type { User } from "@/types";
import { useProtocol } from "@/contexts/useProtocol";


export default function Chat() {
  const { fetchProtocolUsers} = useProtocol()
  useEffect(() => { 
    fetchProtocolUsers()
  }, [fetchProtocolUsers])
  
  const [selectedUserId, setSelectedUserId] = useState<User>({
    id:"",
    imageURL: "",
    recievedMessages: [],
    sentMessages: [],
    username: "",
    userAddress: ''
  });
  const [showChat, setShowChat] = useState(false);
  const { address } = useAccount()

  const handleUserSelect = (user: User) => {
    if (!address) return;
    setSelectedUserId(user);
    setShowChat(true);
  };

  const handleBackToList = () => {
    setShowChat(false);
    setSelectedUserId({
      id:"",
      imageURL: "",
      recievedMessages: [],
      sentMessages: [],
      username: "",
      userAddress: ''
    });
  };

  return (
    <div className="w-full h-full bg-chat-bg flex-1 overflow-y-auto">
      <div className="h-full">
        <div className="md:hidden h-full">
          {!showChat ? (
            <div className="h-full bg-card/50 backdrop-blur-xl border-r border-border">
              <UserList selectedUser={selectedUserId} onUserSelect={handleUserSelect} />
            </div>
          ) : (
            <div className="h-full bg-card/50 backdrop-blur-xl">
              <div className="h-full">
                <ChatWindow user={selectedUserId} handleBackToList={handleBackToList} />
              </div>
            </div>
          )}
        </div>
        <div className="hidden md:flex h-full">
          <div className="w-1/3 max-w-sm bg-card/50 backdrop-blur-xl border-r border-border">
            <UserList selectedUser={selectedUserId} onUserSelect={handleUserSelect} />
          </div>
          <div className="flex-1 bg-card/50 backdrop-blur-xl">
            <ChatWindow user={selectedUserId} handleBackToList={handleBackToList} />
          </div>
        </div>
      </div>
    </div>
  );
}