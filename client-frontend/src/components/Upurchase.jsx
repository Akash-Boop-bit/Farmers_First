import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import classes from "./Upurchase.module.css";
import axios from "axios";
import Backend from "./Backend";
import OneChat from "./OneChat";

const Upurchase = () => {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    let auth = localStorage.getItem("user");
    if (!auth) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const { data } = await axios.get(`${Backend}productuser/u.${params.id}`);
    setUser(data);
  };

  const confirmHandler = async () => {
    const { data } = await axios.get(
      `${Backend}upurchase/confirm.${params.id}`
    );
    if (data.msg === "error") {
      return;
    }
    navigate("/dashboard");
  };
  const cancelHandler = async () => {
    const { data } = await axios.get(`${Backend}upurchase/cancel.${params.id}`);
    console.log(data);
    if (data.msg === "error") {
      return;
    }
    navigate("/dashboard");
  };

  return (
    <div className={classes.main}>
      <div className={classes.main2}>
        <button className={classes.btn} onClick={confirmHandler}>
          confirm
        </button>
        <button className={classes.button} onClick={cancelHandler}>
          cancel
        </button>
      </div>
      <br></br>
      {user && <OneChat room={params.id} name={user.name} />}
    </div>
  );
};

export default Upurchase;
