import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Chatbox from "./Chatbox";
import Chatform from "./Chatform";
import ChatContext from "../AppContext/Chat/ChatContext";

const Chats = () => {
  const Navigate = useNavigate();
  const { connectToServer, loginCredentials, users } = useContext(ChatContext);

  useEffect(() => {
    if (!loginCredentials.name) {
      Navigate("/");
    } else {
      connectToServer();
    }
  }, [loginCredentials]);

  return (
    <div className="chats-page H100">
      <div className="status">Active Users : {users.length || 0}</div>
      <Chatbox />
      <Chatform />
    </div>
  );
};

export default Chats;
