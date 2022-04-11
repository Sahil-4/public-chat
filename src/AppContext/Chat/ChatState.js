import { useState } from "react";
import ChatContext from "./ChatContext";
import { io } from "socket.io-client"

var socket;

const ChatState = (props) => {
    const [loginCredentials, setLoginCredentials] = useState({ name: "" });
    const [users, setUsers] = useState([]);
    const [Messages, setMessages] = useState([]);

    const giveTimestamp = () => {
        let d = new Date();

        let cur_time = `${d.getHours()}:${d.getMinutes()} AM`;
        if (d.getHours() > 12) {
            cur_time = `${d.getHours() - 12}:${d.getMinutes()} PM`
        }

        return cur_time;
    }

    const connectToServer = () => {
        console.log("connecting To Server");
        socket = io("https://public-chat-backend.herokuapp.com/", {
            withCredentials: true,
            extraHeaders: {
                "my-custom-header": "abcd"
            },
            reconnection: false,
        });

        socket.on('connect', () => {
            console.log("connected To Server");
            socket.emit('join-chat', loginCredentials.name);
        })

        socket.on('users', users => {
            console.log("users recv from Server");
            setUsers(users);
        })

        socket.on('recv-chat', (data) => {
            console.log("chat recv from Server");
            setMessages(Messages => [...Messages, data]);
        })

        socket.on('connect_error', (err) => {
            console.log("error recv from Server");
            console.log(err);
        })
    }

    const sendChat = (msg) => {
        console.log("chat send to Server");
        let data = { message: msg, author: loginCredentials.name, timestamp: giveTimestamp() }
        setMessages(Messages => [...Messages, data]);
        socket.emit('send-chat', data);
    }

    return (
        <ChatContext.Provider value={{ loginCredentials, setLoginCredentials, connectToServer, users, Messages, sendChat }}>
            {props.children}
        </ChatContext.Provider>
    )
}


export default ChatState;