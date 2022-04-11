import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Chatbox from "./Chatbox";
import Chatform from "./Chatform";
import ChatContext from "../AppContext/Chat/ChatContext";

const Chats = () => {
  const Navigate = useNavigate();
  const { connectToServer, loginCredentials } = useContext(ChatContext);

  useEffect(() => {
    if (!loginCredentials.name) {
      Navigate("/");
    } else {
      connectToServer();
    }
  }, []);

  return (
    <div className="chats-page H100">
      <div className="status"></div>
      <Chatbox />
      <Chatform />
    </div>
  );
};

export default Chats;
