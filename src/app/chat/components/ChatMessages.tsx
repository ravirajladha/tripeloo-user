import React from "react";
import ChatMessage from "./ChatMessage";

interface ChatMessagesProps {
  messages: { _id: string; message: string; sender_id: string; sender_name: string; timestamp: string;read:boolean }[];
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {
  console.log("💬 Rendering Messages:", messages);

  if (!messages || messages.length === 0) {
    return <p className="text-gray-500 text-center">No messages yet.</p>;
  }

  return (
    <div className="space-y-3 mb-4">
      {messages.map((msg) => (
        <ChatMessage key={msg._id} text={msg.message} sender={msg.sender_id} senderName={msg.sender_name} timestamp={msg.timestamp}  read={msg.read}/>
      ))}
    </div>
  );
};

export default ChatMessages;
