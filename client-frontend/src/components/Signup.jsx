import React, { useEffect, useState } from "react";
import classes from "./Signup.module.css";
import { useNavigate } from "react-router-dom";
import Backend from "./Backend";
import { Link } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState();
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    let auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);

  const submitHandler = async () => {
    if (!isChecked) {
      setMsg("please check the box above!");
      return false;
    }
    if (!name || !email || !password) {
      setError(true);
      return false;
    }
    const body = { name, email, password };
    const data = await fetch(`${Backend}signup`, {
      method: "post",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
    const result = await data.json();
    if (result.message === "error sending email") {
      setMsg("error sending mail. please the details again");
      return false;
    }
    if (result.message === "something went wrong") {
      setMsg("email might be sent to you please check. if not try again");
      return false;
    }
    console.log(result);
    navigate("/verify");
  };

  return (
    <div className={classes.main}>
      <h1>Create Account!</h1>
      <div>
        {/* <h2>Name</h2> */}
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setMsg("");
          }}
          className={classes.input}
          type="text"
          placeholder="Enter your Name"
        />
        {error && !name && <p>Please enter your name</p>}
      </div>
      <div>
        {/* <h2>Email</h2> */}
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setMsg("");
          }}
          className={classes.input}
          type="text"
          placeholder="Enter your email"
        />
        {error && !email && <p>Please enter your email</p>}
      </div>
      <div>
        {/* <h2>Password</h2> */}
        <input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setMsg("");
          }}
          className={classes.input}
          type="password"
          placeholder="Enter your password"
        />
        {error && !password && <p>Please enter your password</p>}
      </div>
      <br></br>
      <div className={classes.main2}>
        <div className={classes.checkboxwrapper}>
          <input
            id="_checkbox-26"
            type="checkbox"
            checked={isChecked}
            onChange={(e) => {
              setIsChecked(e.target.checked);
              setMsg("");
            }}
          />
          <label for="_checkbox-26">
            <div className={classes.tickmark}></div>
          </label>
        </div>
        <h3>
          I agree to <Link to="/privacypolicy">Privacy Policy</Link> and{" "}
          <Link to="/termsandcondition">terms and condition</Link>{" "}
        </h3>
      </div>

      <p>{msg}</p>

      <button onClick={submitHandler} className={classes.btndonate}>
        Sign Up
      </button>
    </div>
  );
};

export default Signup;
