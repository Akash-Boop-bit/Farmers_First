import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import classes from "./Upurchase.module.css";
import axios from "axios";
import Backend from "./Backend";
import OneChat from "./OneChat";

const Spurchase = () => {
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
    const { data } = await axios.get(`${Backend}productuser/s.${params.id}`);
    setUser(data);
  };

  return (
    <div className={classes.main}>
      {user && <OneChat room={params.id} name={user.name} />}
    </div>
  );
};

export default Spurchase;
