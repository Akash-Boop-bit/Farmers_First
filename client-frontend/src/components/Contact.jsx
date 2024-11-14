import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Contact.module.css";

const Contact = () => {
  // const navigate = useNavigate();
  // useEffect(() => {
  //   let auth = localStorage.getItem("user");
  //   if (!auth) {
  //     navigate("/");
  //   }
  // }, []);
  return (
    <>
      <div className={classes.main}>
        <h1>Operating Address: Panipat, Harayana, India</h1>
        <h1>Contact Number: 99999999</h1>
        <h1>Email Address: farmersfirst.contact@gmail.com</h1>
      </div>
    </>
  );
};

export default Contact;
