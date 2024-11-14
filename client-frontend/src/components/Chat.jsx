import React, { useEffect, useState } from "react";
import VoiceToTextInput from "./VoiceToTextInput";
import classes from "./Chat.module.css";
import { useNavigate } from "react-router-dom";

const API = "Your api key";

function Chat() {
  const [inputText, setInputText] = useState("");
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState([]);
  const [btn, setBtn] = useState("Send");
  const [loading, setLoading] = useState("<h1>hello</h1><p>hi</p>");

  const navigate = useNavigate()
  useEffect(() => {
    let auth = localStorage.getItem("user");
    if (!auth) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    setMessage(inputText);
  }, [inputText]);

  const getData = async () => {
    setBtn("loading...");
    if (!message) {
      setBtn("Send");
      return false;
    }
    const data = await fetch(`https://api.openai.com/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `${message}`,
          },
        ],
      }),
    });
    const res = await data.json();
    console.log(res);
    let result = res.choices[0].message.content;
    let hello = result.split("\n");
    console.log(hello);
    let arr = [...response, [message, hello]];
    setResponse(arr);
    setBtn("Send");
    setLoading("");
    setMessage("");
  };

  const sendMessage = async () => {
    setResponse([]);
    setLoading("loading...");
    if (!message) {
      setResponse([]);
      setLoading("please enter a chat");
      return false;
    }
    const data = await fetch(`http://localhost:8000/chat/${message}`);
    const result = await data.text();
    if (result === "error") {
      console.log(result);
      setResponse(
        "sorry cannot provide information on that. This is against my rules and regulations"
      );
      setLoading("");
      return false;
    }
    const linesArray = result.split("\n");
    console.log(linesArray);
    setResponse(linesArray);
    setLoading("");
  };

  return (
    <div className={classes.main}>
      <h1>Farming AI</h1>
      <div className={classes.box}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={getData}>{btn}</button>
        <VoiceToTextInput inputText={inputText} setInputText={setInputText} />
        {/* <p>this bot can make some mistakes. Please Re-Check the information</p> */}
      </div>
      <div className={classes.container}>
        {!loading ? (
          <ol>
            {response.map((e, i) => {
              return (
                <li key={i}>
                  <b>YOU. </b>
                  <br></br>
                  <p>{e[0]}</p>
                  <br></br>
                  <b>Farming AI. </b>
                  <br></br>
                  <br></br>
                  <ul className={classes.list}>
                    {e[1].map((ele, ind) => {
                      return (
                        <>
                          <li key={ind}>{ele}</li>
                        </>
                      );
                    })}
                  </ul>
                  <br></br>
                  <br></br>
                </li>
              );
            })}
          </ol>
        ) : (
          <>
            {/* <h3 className={classes.h3}>Description: </h3> */}
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <p className={classes.para}>
              Hi , this is Farming AI .<br></br> I am your digital assistant .
              <br></br> Ask me anything related to Farming.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default Chat;
