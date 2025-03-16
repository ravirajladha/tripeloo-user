"use client"; // ✅ Required for Next.js App Router

import { useParams } from "next/navigation";
import { useSearchParams, useRouter } from "next/navigation";

import { useEffect, useState, useRef } from "react";
import BookingHeader from "../components/BookingHeader";
import ChatMessages from "../components/ChatMessages";
import ChatInput from "../components/ChatInput";
import { fetchChatMessages, sendMessage, markMessagesAsRead } from "@/actions/chatActions";
import { useAppSelector } from "@/store/hook"; // ✅ Import Redux hooks
import { useCallback } from "react";

interface Message {
    _id: string;
    message: string;
    sender_id: string;
    sender_name: string;
    receiver_id: string;
    timestamp: string;
    read: boolean;
}


interface ChatMessage {
    _id: string;
    message: string;
    sender_id: { _id: string } | string;
    receiver_id: { _id: string } | string;
    timestamp: string;
    read: boolean;
}
interface ChatUser {
    _id: string;
    name: string;
    // Add other properties if needed
}



const ChatPage = () => {
    const { bookingId } = useParams(); // ✅ Get booking ID from URL
    const user = useAppSelector((state) => state.auth.user); // ✅ Fetch user from Redux store
    const router = useRouter();

    const [messages, setMessages] = useState<Message[]>([]);
    const [chatUser, setChatUser] = useState<ChatUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const messagesEndRef = useRef(null);

  // ✅ Redirect if user is not logged in (useEffect instead of early return)
  useEffect(() => {
    if (!user || !user._id) {
      alert("Please log in to proceed with booking.");
      router.push("/login");
    }
  }, [user, router]);


 


    // ✅ Ensure UI doesn't break while redirecting
  if (!user) {
    return <p>Redirecting...</p>;
  }

    // ✅ Fetch messages for this booking

    const fetchChat = useCallback(async () => {
        if (!bookingId) return;
    
        try {
            console.log("🔍 Fetching chat for booking ID:", bookingId);
            const data = await fetchChatMessages(bookingId as string);
    
            if (!Array.isArray(data.messages)) {
                console.error("❌ Invalid messages format received:", data.messages);
                return;
            }
    
            setMessages(
                data.messages.map((msg: any) => ({
                    _id: msg._id,
                    message: msg.message,
                    sender_id: msg.sender_id?._id || msg.sender_id,
                    sender_name: msg.sender_id?.fullName || "Unknown",
                    receiver_id: msg.receiver_id?._id || msg.receiver_id,
                    timestamp: new Date(msg.timestamp).toLocaleString(),
                    read: msg.read,
                }))
            );
    
            setChatUser(data.user || null);
            setIsLoading(false);
    
            const unreadMessages = data.messages.some(
                (msg: ChatMessage) =>
                    !msg.read &&
                    typeof msg.receiver_id === "object" &&
                    msg.receiver_id._id === user._id
            );
    
            if (unreadMessages) {
                await markMessagesAsRead(bookingId as string, user._id);
            }
        } catch (error) {
            console.error("❌ Error fetching chat:", error);
            setIsLoading(false);
        }
    }, [bookingId, user?._id]); // ✅ Includes dependencies
    
    useEffect(() => {
        let intervalId: NodeJS.Timeout;
    
        fetchChat(); // ✅ Fetch once immediately
    
        intervalId = setInterval(() => {
            fetchChat();
        }, 50000); // ✅ Fetch every 50 seconds
    
        return () => clearInterval(intervalId); // ✅ Cleanup on component unmount
    }, [bookingId, fetchChat]); // ✅ No more missing dependencies
    
    
    // ✅ Runs only when these values change


    // ✅ Send a new message
    const handleSendMessage = async (textMessage: string) => {
        if (!user || !user._id || !chatUser?._id) {
            console.error("❌ User details missing!");
            return;
        }

        try {
            console.log("✉️ Sending message:", textMessage);
            console.log("👤 Sender ID:", user._id);
            console.log("📩 Receiver ID:", chatUser._id);

            // ✅ Create a temporary message with correct sender ID
            const tempMessage = {
                _id: `temp-${Date.now()}`, // Temporary ID
                message: textMessage,
                sender_id: user._id, // ✅ Ensure sender ID matches user ID
                sender_name: user.fullName, // ✅ Display as "Me"
                receiver_id: chatUser._id,
                timestamp: new Date().toLocaleString(),
                read: false,
            };

            console.log("📝 Temporary Message Before Sending:", tempMessage);

            // ✅ Append to UI immediately
            setMessages((prevMessages) => {
                const updatedMessages = [...prevMessages, tempMessage];
                console.log("📌 Updated Messages in State:", updatedMessages);
                return updatedMessages;
            });

            // ✅ Send message via API
            const newMessage = await sendMessage(bookingId as string, user._id, chatUser._id, textMessage);

            console.log("✅ Message successfully sent:", newMessage);

            // ✅ Replace temp message with real API response
            setMessages((prevMessages) => {
                const finalMessages = prevMessages.map((msg) =>
                    msg._id.startsWith("temp-") ? newMessage : msg
                );
                console.log("📌 Final Messages in State (After API Response):", finalMessages);
                return finalMessages;
            });

        } catch (error) {
            console.error("❌ Error sending message:", error);
        }
    };


    return (
        <div className="max-w-2xl mx-auto p-4">
            {/* ✅ Fixed Header */}
            <div className="sticky top-0 bg-white z-10 p-2 shadow-md">
                <BookingHeader bookingId={bookingId as string} />
            </div>

            {/* ✅ Scrollable Messages Box */}
            <div className="overflow-y-auto max-h-[400px] p-2" ref={messagesEndRef}>
                {isLoading ? <p>Loading chat...</p> : <ChatMessages messages={messages} />}
            </div>

            {/* ✅ Chat Input */}
            <ChatInput sendMessage={handleSendMessage} />
        </div>
    );

};

export default ChatPage;
