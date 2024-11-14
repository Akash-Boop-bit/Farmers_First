import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Backend from "./Backend";
import classes from "./BuyProduct.module.css";

const BuyProduct = () => {
  const [product, setProduct] = useState([]);
  const [user, setUser] = useState();
  const [error, setError] = useState();
  const [btn, setBtn] = useState("Buy now");
  const [quantity, setQuantity] = useState();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    userData();
  }, []);

  const getData = async () => {
    let { data } = await axios.get(`${Backend}specificproduct/${params.id}`);
    setProduct(data);
  };
  const userData = async () => {
    let auth = localStorage.getItem("user");
    let id = await JSON.parse(auth).id;
    const { data } = await axios.get(`${Backend}user/${id}`);
    setUser(data[0]);
  };

  const buyHandler = async () => {
    if (!quantity || quantity < 1) {
      setError("please fill a quantity to Buy!");
      return;
    }
    if (quantity > product.pAvailable) {
      setError("too much quantity!");
      return;
    }
    if (quantity * product.pPrice > user.balance) {
      setError("not enough Balance!");
      return;
    }
    setBtn("Loading...");
    const { data } = await axios.post(`${Backend}buy`, {
      userID: user._id,
      quantity,
      productID: product._id,
    });

    if (data.msg === "error") {
      setError("something went wrong!");
      setBtn("Buy now");

      return;
    }
    navigate("/dashboard");
  };

  return (
    <>
      {product.length ? (
        <h1>loading...</h1>
      ) : (
        <div className={classes.main}>
          <div className={classes.main2}>
            <h1>Buy {product.pName}</h1>
            <p>
              <span>Product Type:</span> {product.pType} <br></br>
            </p>
            <p>
              <span>Seller's Address:</span> {product.pAddress} <br></br>
            </p>
            <p>
              <span>Product Price(per kg):</span> &#8377;{product.pPrice}{" "}
              <br></br>
            </p>
            <p>
              <span>Product Available(in kgs):</span> {product.pAvailable}{" "}
              <br></br>
            </p>
            <input
              className={classes.input}
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Enter the Quantity to Buy"
            />
            {error && <p>{error}</p>}
            <button onClick={buyHandler} className={classes.btndonate}>
              {btn}
            </button>
            <h5>
              Note: you have to go to Seller's Address to Pick your Purchase!
            </h5>
          </div>
        </div>
      )}
    </>
  );
};

export default BuyProduct;
