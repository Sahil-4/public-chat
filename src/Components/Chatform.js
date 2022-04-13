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
    <form className="chat-form W100" method="POST" onSubmit={handleOnSubmit}>
      <input
        className="chat-input H100"
        type="text"
        value={message}
        onChange={handleOnChange}
      />
      <button
        className="chat-btn send-btn H100"
        type="submit"
        onClick={() => {
          console.log("hello sf");
        }}
      >
        <img src={SendIcon} alt="Send icon" className="H100" />
      </button>
      <button className="chat-btn H100" type="button">
        <img
          src={EmojiIcon}
          alt="Emoji icon"
          className="H100"
          onClick={() => {
            console.log("hello mf");
          }}
        />
      </button>
    </form>
  );
};

export default Chatform;
