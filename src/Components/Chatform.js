import React, { useContext, useState } from "react";
import ChatContext from "../AppContext/Chat/ChatContext";
import EmojiIcon from "./assets/EmojiIcon.png";
import SendIcon from "./assets/SendIcon.png";
import Picker from "emoji-picker-react";

const Chatform = () => {
  const { sendChat } = useContext(ChatContext);

  const [message, setMessage] = useState("");
  const [pickerHeight, setPickerHeight] = useState("0%");

  const toggleEmojiPicker = () => {
    if (pickerHeight === "0%") {
      setPickerHeight("40%");
    } else {
      setPickerHeight("0%");
    }
  };

  const onEmojiClick = (event, emojiObject) => {
    setMessage(message + emojiObject.emoji);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (message !== "") {
      sendChat(message);
      setMessage("");
    }
  };

  const handleOnChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <>
      <Picker
        onEmojiClick={onEmojiClick}
        pickerStyle={{
          height: pickerHeight,
          width: "100%",
          maxWidth: "720px",
          position: "absolute",
          bottom: "32px",
        }}
      />
      <form
        className="chat-form W100"
        id="chat-form"
        method="POST"
        onSubmit={handleOnSubmit}
      >
        <input
          className="input chat-input H100"
          type="text"
          required="True"
          placeholder="Type your message..."
          value={message}
          onChange={handleOnChange}
        />
        <button className="button chat-btn send-btn H100" type="submit">
          <img src={SendIcon} alt="Send icon" className="H100" />
        </button>
        <button
          className="button chat-btn H100"
          type="button"
          onClick={toggleEmojiPicker}
        >
          <img src={EmojiIcon} alt="Emoji icon" className="H100" />
        </button>
      </form>
    </>
  );
};

export default Chatform;
