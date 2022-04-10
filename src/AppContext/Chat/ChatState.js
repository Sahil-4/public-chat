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
        socket = io("http://localhost:8585/", {
            withCredentials: true,
            extraHeaders: {
                "App-Name": "App-Name",
            },
            reconnection: false,
        });

        socket.on('connect', () => {
            console.log("connected to server");
            socket.emit('join-chat', loginCredentials.name);
        })

        socket.on('users', users => {
            setUsers(users);
            console.log(users);
        })

        socket.on('recv-chat', (data) => {
            console.log(data);
            setMessages(Messages => [...Messages, data]);
        })
    }

    const sendChat = (msg) => {
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