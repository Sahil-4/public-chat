import { useState } from "react";
import ChatContext from "./ChatContext";
import { io } from "socket.io-client"
import Tap from "./../../Components/assets/tick.mp3";

var socket;

const ChatState = (props) => {
    const [loginCredentials, setLoginCredentials] = useState({ name: "" });
    const [users, setUsers] = useState([]);
    const [Messages, setMessages] = useState([]);
    const [status, setStatus] = useState(false);

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
        // setStatus(true);
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
            // setStatus(false);
            socket.emit('join-chat', loginCredentials.name);
        })

        socket.on('users', users => {
            console.log("users recv from Server");
            setUsers(users);
            let data = { message: `${loginCredentials.name}, joined the chat.`, author: loginCredentials.name, timestamp: giveTimestamp() }
            socket.emit('send-chat', data);
        })

        socket.on('recv-chat', (data) => {
            tap.play();
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
        <ChatContext.Provider value={{ loginCredentials, setLoginCredentials, connectToServer, users, Messages, sendChat, status }}>
            {props.children}
        </ChatContext.Provider>
    )
}


export default ChatState;