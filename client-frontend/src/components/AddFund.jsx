import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Backend from "./Backend";
import "./AddFund.css";

const AddFund = () => {
  const [amount, setAmount] = useState();
  const [amountw, setAmountw] = useState();
  const [name, setName] = useState();
  const [balance, setBalance] = useState();
  const [btn, setBtn] = useState("Pay");
  const [msg, setmsg] = useState();
  const [upi, setupi] = useState();
  const navigate = useNavigate();

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
    let auth = localStorage.getItem("user");
    let id = JSON.parse(auth).id;
    const { data } = await axios.get(`${Backend}user/${id}`);

    setName(data[0].name);
    setBalance(data[0].balance);
  };

  const getId = () => {
    let auth = localStorage.getItem("user");
    let id = JSON.parse(auth).id;
    return id;
  };

  //the main function when the button clicks
  const btnHandler = async () => {
    if (!amount) {
      return false;
    }
    setBtn("Loading...");

    const {
      data: { key },
    } = await axios.get(`${Backend}kzyvx`);

    const {
      data: { order },
    } = await axios.post(`${Backend}order`, {
      amount,
    });

    console.log(order);

    const id = getId();

    const options = {
      key, // Enter the Key ID generated from the Dashboard
      amount: Number(order.amount),
      currency: "INR",
      name: "GameZone Admin",
      description: "Here to Give You a Safe Platform to Game",
      image:
        "https://previews.123rf.com/images/mariusz_prusaczyk/mariusz_prusaczyk1212/mariusz_prusaczyk121200626/17047839-3d-word-game-on-white-background.jpg",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: `${Backend}payment/${id}.${order.amount / 100}`,
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9000090000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    setBtn("Pay");
    const razor = new window.Razorpay(options);
    razor.open();
    setBtn("Pay");
  };

  const withdrawHandler = async () => {
    if (!amountw || !upi) {
      setmsg("please enter all the details");
      return false;
    }
    if (amount > balance) {
      setmsg("not enough balance");
      return false;
    }
    if (amount < 100) {
      setmsg("Minimum withdrawl amount is 100");
      return false;
    }
    let id = getId();
    const { data } = await axios.post(`${Backend}withdraw`, {
      amount: amountw,
      id,
      upi,
    });
    if (data.msg === "success") {
      window.location.reload();
      return;
    } else {
      setmsg(data.msg);
    }
  };

  return (
    <div className="app">
      <div className="app1">
        <h1>balance: {balance}</h1>
        <h1>{name}</h1>
      </div>
      <div className="app2">
        <div class="form-control">
          <input
            class="input input-alt"
            placeholder="Enter The Amount"
            required=""
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <span class="input-border input-border-alt"></span>
        </div>
        <button className="btnm" onClick={btnHandler}>
          {btn}
        </button>
        <div className="wdiv">
          <h1>WithDraw</h1>
          <div class="form-control">
            <input
              class="input input-alt"
              placeholder="Amount to Withdraw"
              required=""
              type="number"
              value={amountw}
              onChange={(e) => setAmountw(e.target.value)}
            />
            <span class="input-border input-border-alt"></span>
          </div>
          <h3>We are not responsible if You enter wrong UPI ID.</h3>
          <div class="form-control">
            <input
              class="input input-alt"
              placeholder="Your UPI ID"
              required=""
              type="text"
              value={upi}
              onChange={(e) => setupi(e.target.value)}
            />
            <span class="input-border input-border-alt"></span>
          </div>
          {msg && <p className="parap">{msg}</p>}
          <button onClick={withdrawHandler} className="buttonw">
            <svg
              viewBox="0 0 16 16"
              class="bi bi-lightning-charge-fill"
              fill="currentColor"
              height="16"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z"></path>
            </svg>
            WithDraw
          </button>
        </div>
        <br></br>
        <p>Note: Withdraw can Take 24Hours to Process</p>
      </div>
    </div>
  );
};

export default AddFund;
