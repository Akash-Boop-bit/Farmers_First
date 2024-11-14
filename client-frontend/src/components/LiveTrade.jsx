import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./LiveTrade.module.css";

const LiveTrade = () => {
  const navigate = useNavigate();
  useEffect(() => {
    let auth = localStorage.getItem("user");
    if (!auth) {
      navigate("/");
    }
  }, []);
  return (
    <div className={classes.main}>
      <div className={classes.main1}>
        <h1>Balance : $0</h1>
        <div className={classes.main2}>
          <div>
            <p>Period</p>
            <h2>1000000000</h2>
          </div>
          <div>
            <p>Count Down</p>
            <h2>00:00</h2>
          </div>
        </div>
        <div className={classes.main3}>
            <button className={classes.greenbutton}>Join Green</button>
            <button className={classes.redbutton}>Join Red</button>
        </div>
      </div>
    </div>
  );
};

export default LiveTrade;
