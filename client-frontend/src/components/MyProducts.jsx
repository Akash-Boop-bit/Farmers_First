import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./MyProducts.module.css";
import axios from "axios";
import Backend from "./Backend";

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [s, setS] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    getData();
  }, [s]);
  useEffect(() => {
    getPurchases();
  }, []);
  useEffect(() => {
    let auth = localStorage.getItem("user");
    if (!auth) {
      navigate("/");
    }
  }, []);

  const getData = async () => {
    let auth = localStorage.getItem("user");
    let id = await JSON.parse(auth).id;
    const { data } = await axios.get(`${Backend}products/${id}`);
    console.log(data);
    setProducts(data);
  };

  const getPurchases = async () => {
    let auth = localStorage.getItem("user");
    let id = await JSON.parse(auth).id;
    const { data } = await axios.get(`${Backend}purchases/s.${id}`);
    console.log(data);
    setPurchases(data);
  };

  const handleDelete = async (id) => {
    const { data } = await axios.get(`${Backend}deleteproduct/${id}`);
    setS(!s);
  };

  return (
    <>
      <div className={classes.main}>
        <div className={classes.main2}>
          {purchases.length ? (
            <div className={classes.purchase}>
              <h2>My Sellings</h2>
              <ul>
                {purchases.map((ele, i) => {
                  return (
                    <li key={i}>
                      <div
                      onClick={() => navigate(`/spurchase/${ele._id}`)}
                        className={classes.card2}
                      >
                        <p>
                          <span>product Name:</span> {ele.pName}
                        </p>
                        <p>
                          <span>product Type:</span> {ele.pType}
                        </p>
                        <p>
                          <span>product Quantity:</span> {ele.quantity}
                        </p>
                        <p>
                          <span>Total Price:</span> {ele.balance}
                        </p>
                        <h3>Click to see</h3>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : (
            <></>
          )}
          <h1>My Products</h1>

          <button
            className={classes.butt}
            onClick={() => {
              navigate("/addproduct");
            }}
          >
            Add Product
          </button>
          {products.length ? (
            <ul>
              {products.map((ele, i) => {
                return (
                  <li className={classes.li} key={i}>
                    <p>
                      Product Name: {ele.pName} <br></br>
                    </p>
                    <p>
                      Product Type: {ele.pType} <br></br>
                    </p>
                    <p>
                      Seller's Address: {ele.pAddress} <br></br>
                    </p>
                    <p>
                      Product Price(per kg): &#8377;{ele.pPrice} <br></br>
                    </p>
                    <p>
                      Product Available(in kgs): {ele.pAvailable} <br></br>
                    </p>
                    <button
                      onClick={() => handleDelete(ele._id)}
                      className={classes.button}
                    >
                      <svg viewBox="0 0 448 512" className={classes.svgIcon}>
                        <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                      </svg>
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>No Products Yet!</p>
          )}
        </div>
      </div>
    </>
  );
};

export default MyProducts;
