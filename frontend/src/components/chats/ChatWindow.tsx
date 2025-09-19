import { useState, useRef, useEffect } from "react";
import { Send, Smile, Paperclip, Phone, Video, MoreVertical, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { User } from "@/types";

interface Message {
  id: string;
  text: string;
  timestamp: string;
  isOwn: boolean;
}

interface ChatWindowProps {
  user?: User;
  className?: string;
  handleBackToList?: () => void;
}

export default function ChatWindow({ user, className, handleBackToList }: ChatWindowProps) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (user?.userAddress) {
      setMessages([]);
    }
  }, [user]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    const newMessage: Message = {
      id: Date.now().toString(),
      text: message,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isOwn: true,
    };
    setMessages([...messages, newMessage]);
    setMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!user?.userAddress) {
    return (
      <div className={cn("flex items-center justify-center h-full", className)}>
        <div className="text-center">
          <div className="text-4xl mb-4">💬</div>
          <h3 className="text-xl font-semibold text-chat-text mb-2">
            Welcome to Chat
          </h3>
          <p className="text-chat-text-muted">
            Select a conversation to start messaging
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col h-full", className)}>
      <div className="flex items-center justify-between px-4 py-2 border-b border-chat-border">
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={handleBackToList} className="text-foreground hover:bg-accent">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.imageURL} alt={user.username} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {user.username
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
          <div>
            <h3 className="font-semibold text-chat-text">{user.username}</h3>
            <p className="text-sm text-chat-text-muted">Online</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-chat-text hover:bg-chat-hover">
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-chat-text hover:bg-chat-hover">
            <Video className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-chat-text hover:bg-chat-hover">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={cn("flex", msg.isOwn ? "justify-end" : "justify-start")}>
            <div className={cn("max-w-[70%] px-4 py-2 rounded-2xl text-sm", msg.isOwn ? "bg-chat-message text-white rounded-br-md" : "bg-chat-message-received text-chat-text rounded-bl-md")}>
              <p className="mb-1">{msg.text}</p>
              <span className={cn("block text-xs", msg.isOwn ? "text-green-100" : "text-chat-text-muted")}>
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="px-2 pt-2 border-t border-chat-border">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-chat-text hover:bg-chat-hover">
            <Paperclip className="h-5 w-5" />
          </Button>
          <div className="flex-1 relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={1}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="w-full px-4 py-3 pr-12 bg-chat-hover border border-chat-border rounded-2xl text-chat-text placeholder-chat-text-muted resize-none focus:outline-none focus:ring-2 focus:ring-primary max-h-32"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-chat-text hover:bg-chat-panel"
            >
              <Smile className="h-5 w-5" />
            </Button>
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full p-3"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
