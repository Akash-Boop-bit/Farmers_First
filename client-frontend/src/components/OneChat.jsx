import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import Backend from "./Backend";
const socket = io(`${Backend}`);
import classes from "./oneChat.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import VoiceToTextInput from "./VoiceToTextInput";

function OneChat({ room, name }) {
  const [msg, setMsg] = useState("");
  const [user, setUser] = useState([]);
  const [chats, setChats] = useState([]);
  const chatContainerRef = useRef(null);
  const [inputText, setInputText] = useState("");
    console.log(room)
  const getData = () => {
    socket.emit("join_room", { room, name });
    socket.on("chat", (data) => {
      setChats(data);
      console.log(data);
    });
    socket.on("connected_users", (users) => {
      setUser(users);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setMsg(inputText);
  }, [inputText]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chats]);

  const sendChat = () => {
    if (!msg) {
      return false;
    }

    socket.emit("send_message", {
      msg,
      name,
      room,
      chats,
    });

    setInputText("");
    setMsg("");
  };

  const deleteChat = (i) => {
    socket.emit("delete_message", {
      i,
      room,
      chats,
    });
  };


  return (
    <>
      <div className={classes.main}>
          <div className={classes.box}>
            <input
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              type="text"
              placeholder="enter a chat"
            />
            <button type="submit" onClick={sendChat}>
              <FontAwesomeIcon icon={faArrowUp} style={{ color: "black" }} />
            </button>
            <VoiceToTextInput
              inputText={inputText}
              setInputText={setInputText}
            />
          </div>
        <div className={classes.users}>
          <h3>Online Users</h3>
          <ol>
            {user.map((e, i) => {
              return <li key={i}>{e.name}</li>;
            })}
          </ol>
        </div>
        <div className={classes.chats}>
          <ul ref={chatContainerRef} className={classes.container}>
            {chats.map((e, i) => {
              return e[0] === name ? (
                <li className={classes.mechat} key={i}>
                  <div className={classes.name}>{e[0]}</div>
                  <div className={classes.chat}> {e[1]}</div>
                  <button
                    className={classes.delroom}
                    onClick={() => deleteChat(i)}
                  >
                    <FontAwesomeIcon icon={faTrashCan} />
                  </button>
                </li>
              ) : (
                <li className={classes.elchat} key={i}>
                  <div className={classes.name}>{e[0]} </div>
                  <div className={classes.chat}> {e[1]}</div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default OneChat;
