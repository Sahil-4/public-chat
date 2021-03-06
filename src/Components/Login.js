import React, { useContext } from "react";
import ChatContext from "../AppContext/Chat/ChatContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { loginCredentials, setLoginCredentials } = useContext(ChatContext);
  const Navigate = useNavigate();

  const handleOnChange = (e) => {
    setLoginCredentials({
      ...loginCredentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    Navigate("/chat");
  };

  return (
    <div className="H100 W100 login-page">
      <form method="POST" onSubmit={handleOnSubmit}>
        <legend>Welcome to Public Chat</legend>
        <input
          type="text"
          name="name"
          required="True"
          className="input"
          placeholder="Enter your Name"
          value={loginCredentials.name}
          onChange={handleOnChange}
        />
        <button className="button" type="submit">
          Start Chat
        </button>
      </form>
    </div>
  );
};

export default Login;
