import { useState } from "react";
import ChatContext from "./ChatContext";
import { io } from "socket.io-client"
import Tap from "./../../Components/assets/tick.mp3";

var socket = null;

const ChatState = (props) => {
    const [loginCredentials, setLoginCredentials] = useState({ name: "" });
    const [users, setUsers] = useState([]);
    const [Messages, setMessages] = useState([]);
    const [status, setStatus] = useState("inactive");

    const tap = new Audio(Tap);

    const giveTimestamp = () => {
        let d = new Date();

        let cur_time = `${d.getHours()}:${d.getMinutes()} AM`;
        if (d.getHours() > 12) {
            cur_time = `${d.getHours() - 12}:${d.getMinutes()} PM`;
        }

        let hr = cur_time.split(":")[0];
        let mn = cur_time.split(":")[1].split(" ")[0];
        let md = cur_time.split(":")[1].split(" ")[1];

        if (hr < 10) {
            hr = "0" + hr;
        }
        if (mn < 10) {
            mn = "0" + mn;
        }

        cur_time = `${hr}:${mn} ${md}`;
        return cur_time;
    };

    const connectToServer = () => {
        setStatus("active");
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
            setStatus("inactive");
            socket.emit('join-chat', loginCredentials.name);
            let data = { message: `${loginCredentials.name}, joined the chat.`, author: loginCredentials.name, timestamp: giveTimestamp() }
            socket.emit('send-chat', data);
        })

        socket.on('users', users => {
            setUsers(users);
        })

        socket.on('recv-chat', (data) => {
            tap.play();
            setMessages(Messages => [...Messages, data]);
        })

        socket.on('connect_error', (err) => {
            console.log(err);
        })
    }

    const sendChat = (msg) => {
        let data = { message: msg, author: loginCredentials.name, timestamp: giveTimestamp() }
        setMessages(Messages => [...Messages, data]);
        socket.emit('send-chat', data);
    }

    return (
        <ChatContext.Provider value={{ loginCredentials, setLoginCredentials, connectToServer, users, Messages, sendChat, status }}>
            {props.children}
        </ChatContext.Provider>
    )
}

export default ChatState;