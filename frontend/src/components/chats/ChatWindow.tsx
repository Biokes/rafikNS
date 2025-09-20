import { useState, useRef, useEffect, useCallback } from "react";
import { Send, Smile, Paperclip, Phone, Video, MoreVertical, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { Message, ChatWindowProps } from "@/types";
import { useUser } from "@/contexts/useUser";
import { CONTRACT_ABI, CONTRACT_ADDRESS, GRAPH_BASE_URL, MESSAGES_QUERY, publicClient } from "@/config";
import type { Hex } from "viem";
import { toast } from "sonner";
import { useSimulateContract, useWriteContract } from "wagmi";
import request from "graphql-request";

export default function ChatWindow({ user, className, handleBackToList }: ChatWindowProps) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isFetching, setFetching] = useState<boolean>(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user: currentUser } = useUser();
  const { writeContractAsync } = useWriteContract();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchMessages = useCallback(async () => {
    setFetching(true);
    try {
      const data = await request<{messagings: Message[]}>(
        GRAPH_BASE_URL,
        MESSAGES_QUERY,
        {
          sender: currentUser?.username,
          reciever: user?.username,
        }
      );
      setMessages(data.messagings || []);
      scrollToBottom();
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    } finally {
      setFetching(false);
    }
  }, [currentUser?.username, user?.username]);

  const { data: simulation, error: simulationError } = useSimulateContract({
    address: CONTRACT_ADDRESS as Hex,
    abi: CONTRACT_ABI,
    functionName: "message",
    args: [currentUser?.username, user?.username, message],
  });

  useEffect(() => {
    if (user?.username && currentUser?.username) {
      fetchMessages();
    }
  }, [fetchMessages, user?.username, currentUser?.username]);

  const sendMessageSimulation = useCallback(async () => {
    if (simulation) {
      try {
        setLoading(true);
        const txHash = await writeContractAsync(simulation.request);
        const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash });

        if (receipt.status === "reverted") {
          toast.error("Message not sent");
        } else {
          toast.success("Message sent successfully");

          const optimisticMessage: Message = {
            id: txHash,
            messageContent: message,
            sender: currentUser!.userAddress,
            reciever: user!.userAddress,
            transaction: { blockTimestamp: String(Math.floor(Date.now() / 1000)) },
          };
          setMessages((prev) => [...prev, optimisticMessage]);
          scrollToBottom();

          await fetchMessages();
        }
      } catch (err) {
        toast.error("Transaction failed");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (simulationError) {
      toast.error(simulationError.message);
    }
  }, [simulation, simulationError, writeContractAsync, message, currentUser, user, fetchMessages]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    try {
      await sendMessageSimulation();
    } catch (error) {
      console.error("Texting error: ", error);
    }
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
      {(isLoading || isFetching) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg">
            <p className="text-lg font-semibold">Loading...</p>
            <p className="text-sm text-gray-500 mt-2">
              {isLoading ? "Waiting for confirmation" : "Fetching messages..."}
            </p>
          </div>
        </div>
      )}

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
            <p className="text-[0.65rem] md:text-sm text-chat-text-muted">
              {user.username === currentUser?.username ? "Message Yourself" : "Message now"}
            </p>
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
        {messages.map((msg) => {
          const isMine = msg.sender.toLowerCase() === currentUser?.userAddress.toLowerCase();
          return (
            <div key={msg.id} className={cn("flex", isMine ? "justify-end" : "justify-start")}>
              <div
                className={cn(
                  "p-1 max-w-[70%] px-4 py-2 rounded-2xl text-sm",
                  isMine
                    ? "bg-chat-message text-white rounded-br-md text-right"
                    : "bg-chat-message-received text-chat-text rounded-bl-md text-left"
                )}
              >
                <p>{msg.messageContent}</p>
                <span
                  className={cn(
                    "block text-xs mt-1",
                    isMine ? "text-green-100" : "text-chat-text-muted"
                  )}
                >
                  {new Date(Number(msg.transaction.blockTimestamp) * 1000).toLocaleTimeString()}
                </span>
              </div>
            </div>
          );
        })}
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
            disabled={!message.trim() || isLoading}
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full p-3"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
