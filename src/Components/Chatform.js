import React, { useContext, useState } from "react";
import ChatContext from "../AppContext/Chat/ChatContext";

const Chatform = () => {
  const { sendChat } = useContext(ChatContext);

  const [message, setMessage] = useState("");

  const handleOnSubmit = (e) => {
    e.preventDefault();
    sendChat(message);
    setMessage("");
  };

  const handleOnChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <form
      id="chat-form"
      className="chat-form W100"
      method="POST"
      onSubmit={handleOnSubmit}
    >
      <input
        type="text"
        className="message-box chat-form-element"
        value={message}
        onChange={handleOnChange}
      />
      <button id="emoji-button" className="chat-button chat-form-element">
        Emoji
      </button>
      <button
        className="chat-button chat-form-element send-chat-button"
        type="submit"
      >
        Send
      </button>
    </form>
  );
};

export default Chatform;