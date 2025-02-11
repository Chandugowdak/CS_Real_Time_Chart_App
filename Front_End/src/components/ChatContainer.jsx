import { useChatStore } from "../store/UseChatStore";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/UseAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages = [], // ✅ Prevents undefined errors
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToNewMessage, // ✅ Subscribe to real-time messages
    unsubscribeToNewMessage, // ✅ Unsubscribe when component unmounts
  } = useChatStore();

  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (!selectedUser || !selectedUser._id) {
      console.error("⚠️ Error: selectedUser is null or undefined");
      return;
    }

    console.log("📩 Fetching messages for:", selectedUser._id);
    getMessages(selectedUser._id);

    // ✅ Subscribe to real-time messages
    subscribeToNewMessage(selectedUser._id);

    // ✅ Cleanup: Unsubscribe when component unmounts
    return () => {
      console.log("🔴 Unsubscribing from new messages...");
      unsubscribeToNewMessage(selectedUser._id);
    };
  }, [
    selectedUser,
    getMessages,
    subscribeToNewMessage,
    unsubscribeToNewMessage,
  ]);

  useEffect(() => {
    if (messageEndRef.current && messages.length > 0) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  console.log("📩 Messages in ChatContainer:", messages);

  if (isMessagesLoading) {
    return (
      <div className="flex flex-col flex-1 overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 overflow-auto">
      <ChatHeader />

      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <div
              key={message._id || index}
              className={`chat ${
                message.senderId === authUser?._id ? "chat-end" : "chat-start"
              }`}
              ref={index === messages.length - 1 ? messageEndRef : null}
            >
              <div className="chat-image avatar">
                <div className="border rounded-full size-10">
                  <img
                    src={
                      message.senderId === authUser?._id
                        ? authUser?.profilePic || "/avatar.png"
                        : selectedUser?.profilePic || "/avatar.png"
                    }
                    alt="profile pic"
                  />
                </div>
              </div>
              <div className="mb-1 chat-header">
                <time className="ml-1 text-xs opacity-50">
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>
              <div className="flex flex-col chat-bubble">
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="sm:max-w-[200px] rounded-md mb-2"
                  />
                )}
                {message.text && <p>{message.text}</p>}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">No messages yet</div>
        )}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
