import React, { useContext, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import ChatContext from "../AppContext/Chat/ChatContext";

const Chatbox = () => {
  const { Messages } = useContext(ChatContext);

  const scrollToBottom = () => {
    try {
      const element = document.getElementById("chats-container");
      element.scrollTop = element.scrollHeight;
    } catch (error) {}
  };

  useEffect(() => {
    return () => {
      scrollToBottom();
    };
  }, [Messages]);

  return (
    <div className="chats-container" id="chats-container">
      {Messages.map((message, index) => (
        <ChatMessage key={index} message={message} />
      ))}
    </div>
  );
};

export default Chatbox;
