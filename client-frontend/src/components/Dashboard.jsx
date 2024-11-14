import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Dashboard.module.css";
import Backend from "./Backend";
import axios from "axios";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [key, setKey] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    getData();
  }, []);
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
    const { data } = await axios.get(`${Backend}products`);
    let auth = localStorage.getItem("user");
    let id = await JSON.parse(auth).id;
    let arr = data.filter((e) => e.userID !== id);
    setProducts(arr);
  };

  const getPurchases = async () => {
    let auth = localStorage.getItem("user");
    let id = await JSON.parse(auth).id;
    const { data } = await axios.get(`${Backend}purchases/u.${id}`);
    setPurchases(data);
  };

  const searchHandler = async () => {
    if (!key) {
      getData();
      return;
    }
    const { data } = await axios.get(`${Backend}searchproduct/${key}`);
    let auth = localStorage.getItem("user");
    let id = await JSON.parse(auth).id;
    let arr = data.filter((e) => e.userID !== id);
    setProducts(arr);
  };

  return (
    <div className={classes.main}>
      <div className={classes.main1}>
        {purchases.length ? (
          <div className={classes.purchase}>
            <h2>My Purchases</h2>
            <ul>
              {purchases.map((ele, i) => {
                return (
                  <li key={i}>
                    <div
                      onClick={() => navigate(`/upurchase/${ele._id}`)}
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
        <div className={classes.main2}>
          <div className={classes.searchBox}>
            <input
              className={classes.searchInput}
              type="text"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              name=""
              placeholder="Search something"
            />
            <button className={classes.searchButton} onClick={searchHandler}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="29"
                height="29"
                viewBox="0 0 29 29"
                fill="none"
              >
                <g clip-path="url(#clip0_2_17)">
                  <g filter="url(#filter0_d_2_17)">
                    <path
                      d="M23.7953 23.9182L19.0585 19.1814M19.0585 19.1814C19.8188 18.4211 20.4219 17.5185 20.8333 16.5251C21.2448 15.5318 21.4566 14.4671 21.4566 13.3919C21.4566 12.3167 21.2448 11.252 20.8333 10.2587C20.4219 9.2653 19.8188 8.36271 19.0585 7.60242C18.2982 6.84214 17.3956 6.23905 16.4022 5.82759C15.4089 5.41612 14.3442 5.20435 13.269 5.20435C12.1938 5.20435 11.1291 5.41612 10.1358 5.82759C9.1424 6.23905 8.23981 6.84214 7.47953 7.60242C5.94407 9.13789 5.08145 11.2204 5.08145 13.3919C5.08145 15.5634 5.94407 17.6459 7.47953 19.1814C9.01499 20.7168 11.0975 21.5794 13.269 21.5794C15.4405 21.5794 17.523 20.7168 19.0585 19.1814Z"
                      stroke="white"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      shape-rendering="crispEdges"
                    ></path>
                  </g>
                </g>
                <defs>
                  <filter
                    id="filter0_d_2_17"
                    x="-0.418549"
                    y="3.70435"
                    width="29.7139"
                    height="29.7139"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood
                      flood-opacity="0"
                      result="BackgroundImageFix"
                    ></feFlood>
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    ></feColorMatrix>
                    <feOffset dy="4"></feOffset>
                    <feGaussianBlur stdDeviation="2"></feGaussianBlur>
                    <feComposite in2="hardAlpha" operator="out"></feComposite>
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                    ></feColorMatrix>
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_2_17"
                    ></feBlend>
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_2_17"
                      result="shape"
                    ></feBlend>
                  </filter>
                  <clipPath id="clip0_2_17">
                    <rect
                      width="28.0702"
                      height="28.0702"
                      fill="white"
                      transform="translate(0.403503 0.526367)"
                    ></rect>
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>
          <button
            className={classes.button}
            onClick={() => navigate("/myproducts")}
          >
            My Products
          </button>
        </div>
        <div className={classes.main3}>
          {products.length ? (
            <ul>
              {products.map((ele, i) => {
                return (
                  <li key={i}>
                    <div className={classes.card}>
                      <div className={classes.firstcontent}>
                        <p>
                          <span>Product Name:</span> {ele.pName} <br></br>
                        </p>
                        <p>
                          <span>Product Type:</span> {ele.pType} <br></br>
                        </p>
                        <p>
                          <span>Seller's Address:</span> {ele.pAddress}{" "}
                          <br></br>
                        </p>
                        <p>
                          <span>Product Price(per kg):</span> &#8377;
                          {ele.pPrice} <br></br>
                        </p>
                        <p>
                          <span>Product Available(in kgs):</span>{" "}
                          {ele.pAvailable} <br></br>
                        </p>
                      </div>
                      <div className={classes.secondcontent}>
                        <button
                          onClick={() => navigate(`/buy/${ele._id}`)}
                          className={classes.btn}
                        >
                          Buy Now
                          <svg
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            className={classes.icon}
                          >
                            <path
                              clip-rule="evenodd"
                              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                              fill-rule="evenodd"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>No Products Found!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
