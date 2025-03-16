import React from "react";
import Image from "next/image";
import avatar1 from "@/images/avatars/Image-2.png";
import avatar2 from "@/images/avatars/Image-11.png";
import { useAppSelector } from "@/store/hook"; // Import Redux hooks
import { useSearchParams, useRouter } from "next/navigation";

interface ChatMessageProps {
  text: string;
  sender: string | { _id: string }; 
  timestamp: string;
  read: boolean;
  senderName: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ text, sender, timestamp, read }) => {

  const router = useRouter();

  const user = useAppSelector((state) => state.auth.user);

  if (!user || !user._id) {
    alert("Please log in to proceed with booking.");
    router.push("/login");
    return;
  }
  
  console.log(sender, "senderId")
  console.log(user._id, "user id")

  // const isUserMessage = sender == user._id ; 
  const senderId = typeof sender === "object" ? sender._id : sender;
  const isUserMessage = String(senderId) === String(user?._id);

  // const isUserMessage = String(sender?._id || sender) === String(user?._id);


  console.log(isUserMessage,sender, user._id, "inside chat message");
  return (
    <div className={`flex ${isUserMessage ? "justify-end" : "justify-start"} items-center`}>
      {/* ✅ Vendor Avatar (Left) */}
      {!isUserMessage && (
        <Image src={avatar2} alt="Vendor" width={30} height={30} className="rounded-full mr-2" />
      )}

      <div className={`max-w-xs p-3 rounded-lg shadow-md ${isUserMessage ? "bg-green-500 text-white" : "bg-gray-200 text-black"}`}>
        {/* ✅ Message Text */}
        <p>{text}</p>

        {/* ✅ Timestamp */}
        <p className="text-xs text-gray-500 mt-2">{timestamp}</p>

        {/* ✅ Read Status */}
        {isUserMessage && read && <p className="text-xs text-blue-300 mt-1">Read</p>}
      </div>

      {/* ✅ User Avatar (Right) */}
      {isUserMessage && (
        <Image src={avatar2} alt="Me" width={30} height={30} className="rounded-full ml-2" />
      )}
    </div>
  );
};

export default ChatMessage;
