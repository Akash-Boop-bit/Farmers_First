import React, { useEffect, useState } from "react";
import classes from "./Profile.module.css";
import axios from "axios";
import Backend from "./Backend";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [data, setData] = useState();
  const navigate = useNavigate()
  useEffect(() => {
    let auth = localStorage.getItem("user");
    if (!auth) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    getData();
  });
  const getData = async () => {
    let auth = localStorage.getItem("user");
    let id = await JSON.parse(auth).id;
    const { data } = await axios.get(`${Backend}user/${id}`);
    setData(data[0]);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };
  return (
    <div className={classes.main}>
      {data ? (
        <div>
          <h1>{data.name}</h1>
          <h1>{data.email}</h1>
          <h1>{data.balance}</h1>
          <button className={classes.button} onClick={handleLogout}>logout</button>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default Profile;
