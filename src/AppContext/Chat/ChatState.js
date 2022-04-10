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
        console.log("connecting to server");
        socket = io("https://public-chat-backend.herokuapp.com/", {
            withCredentials: true,
            extraHeaders: {
                "my-custom-header": "abcd"
            },
            reconnection: false,
        });

        socket.on('connect', () => {
            console.log("connected to server");
            socket.emit('join-chat', loginCredentials.name);
        })

        socket.on('users', users => {
            console.log("users array from server");
            setUsers(users);
        })

        socket.on('recv-chat', (data) => {
            console.log("chat recv from server");
            setMessages(Messages => [...Messages, data]);
        })
    }

    const sendChat = (msg) => {
        console.log("chat send to server");
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