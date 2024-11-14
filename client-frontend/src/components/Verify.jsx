// components/VerifyEmail.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Backend from "./Backend";
import classes from "./Login.module.css";

const Verify = ({ setLogged }) => {
  const [token, setToken] = useState("");
  const [verifying, setVerifying] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);

  // Send verification request to your Node.js server
  const verifyEmail = async () => {
    if (!token.trim()) {
      return false;
    }
    setVerifying("verifying...");
    const response = await fetch(`${Backend}verify`, {
      method: "post",
      body: JSON.stringify({ token }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    console.log(result);
    if (result.msg === "Invalid verification token.") {
      setVerifying("invalid token");
      return false;
    }
    if (result.msg === "Internal Server Error") {
      setVerifying("something went wrong. try again!");
      return false;
    }
    localStorage.setItem(
      "user",
      JSON.stringify({ name: result.name, id: result._id })
    );
    navigate("/");
    setLogged(true);
  };

  return (
    <div className={classes.main}>
      <h1>Please check your mail for the token.</h1>
      <input
        type="text"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="Enter the token"
        className={classes.input}
      />
      <h3>{verifying}</h3>
      <button onClick={verifyEmail} className={classes.btndonate}>
        Submit
      </button>
    </div>
  );
};

export default Verify;
