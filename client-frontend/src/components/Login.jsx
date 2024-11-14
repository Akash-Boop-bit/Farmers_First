import React, { useState, useEffect } from "react";
import classes from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import Backend from "./Backend";
import { Link } from "react-router-dom";

const Login = ({ setLogged }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const [loading, setLoading] = useState("Login");
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    let auth = localStorage.getItem("user");
    if (auth) {
      navigate("/dashboard");
    }
  }, []);

  const loginHandler = async () => {
    if (!isChecked) {
      setMsg("please check the box above!");
      return false;
    }
    if (!email || !password) {
      setError(true);
      return false;
    }
    setLoading("Loading");
    const body = { email, password };
    const data = await fetch(`${Backend}login`, {
      method: "post",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
    const result = await data.json();
    if (result.message === "User not found.") {
      setMsg("wrong details");
      setLoading("Login");
      return false;
    }
    if (result.message === "user is not Verified") {
      setMsg("Email is not Verified");
      setLoading("Login");
      return false;
    }
    if (result.message === "Invalid password.") {
      setMsg("Invalid password.");
      setLoading("Login");
      return false;
    }
    if (result.message === "Internal Server Error") {
      setMsg("some error happened");
      setLoading("Login");
      return false;
    }
    console.log(result);
    localStorage.setItem(
      "user",
      JSON.stringify({ name: result.name, id: result._id })
    );
    setLoading("Login");
    navigate("/dashboard");
    setLogged(true);
  };

  return (
    <div className={classes.bgc}>
      <div className={classes.main}>
        <h1>Welcome Back!</h1>
        <h2>Email</h2>
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

        <h2>Password</h2>
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
        <button onClick={loginHandler} className={classes.btndonate}>
          {loading}
        </button>
      </div>
    </div>
  );
};

export default Login;
