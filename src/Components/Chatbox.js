import React, { useContext } from "react";
import ChatMessage from "./ChatMessage";
import ChatContext from "../AppContext/Chat/ChatContext";

const Chatbox = () => {
  const { Messages } = useContext(ChatContext);

  return (
    <div className="chats-container">
      {Messages.map((message, index) => (
        <ChatMessage key={index} message={message} />
      ))}
    </div>
  );
};

export default Chatbox;
