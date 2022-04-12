import React, { useContext, useState } from "react";
import ChatContext from "../AppContext/Chat/ChatContext";
import EmojiIcon from "./assets/EmojiIcon.png";
import SendIcon from "./assets/SendIcon.png";

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
        required="True"
        className="message-input chat-form-element"
        value={message}
        onChange={handleOnChange}
      />
      <button id="emoji-button" className="emji-button chat-form-element">
        <img src={EmojiIcon} alt="Emoji icon" className="H100"/>
      </button>
      <button className="chat-button chat-form-element" type="submit">
        <img src={SendIcon} alt="Send icon" className="H100"/>
      </button>
    </form>
  );
};

export default Chatform;
