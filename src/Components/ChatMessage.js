import React, { useContext } from "react";
import ChatContext from "../AppContext/Chat/ChatContext";

const ChatMessage = (props) => {
  const { loginCredentials } = useContext(ChatContext);

  if (props.message.author === loginCredentials.name) {
    return (
      <div className={`chat chat-send`}>
        <p className="chat-author">{props.message.author}</p>
        <p className="chat-message">{props.message.message}</p>
        <p className="chat-time">{props.message.timestamp}</p>
      </div>
    );
  } else {
    return (
      <div className={`chat chat-recv`}>
        <p className="chat-author">{props.message.author}</p>
        <p className="chat-message">{props.message.message}</p>
        <p className="chat-time">{props.message.timestamp}</p>
      </div>
    );
  }
};

export default ChatMessage;
