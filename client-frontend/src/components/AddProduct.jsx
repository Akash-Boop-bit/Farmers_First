import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from "./AddProduct.module.css";
import { useNavigate } from "react-router-dom";
import Backend from "./Backend";

function AddProduct() {
  const [pName, setPName] = useState();
  const [pType, setPType] = useState();
  const [pPrice, setPPrice] = useState();
  const [pAvailable, setPAvailable] = useState();
  const [error, setError] = useState();
  const [pAddress, setPAddress] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    let auth = localStorage.getItem("user");
    if (!auth) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async () => {
    let auth = localStorage.getItem("user");
    let user = await JSON.parse(auth);

    if (
      !pName ||
      !pPrice ||
      !pType ||
      !pAvailable ||
      !pAddress ||
      pPrice < 1 ||
      pAvailable < 1
    ) {
      setError("please fill all the details");
      return;
    }
    let { data } = await axios.post(`${Backend}addproduct`, {
      username: user.name,
      userid: user.id,
      pName,
      pPrice,
      pType,
      pAvailable,
      pAddress,
    });
    if (data.msg === "success") {
      setError("Product Added Successfully");
    } else {
      setError("An Error occured");
    }
    setPAvailable("");
    setPName("");
    setPPrice("");
    setPType("");
    setPAddress("");
  };

  return (
    <>
      <div className={classes.main}>
        <div>
          <h1>Add Your Products!</h1>

          <div className={classes.inputgroup}>
            <label className={classes.label}>Product Name</label>
            <input
              className={classes.input}
              value={pName}
              onChange={(e) => setPName(e.target.value)}
              type="text"
              placeholder=""
            />
            <div></div>
          </div>

          <div className={classes.inputgroup}>
            <label className={classes.label}>Product Type</label>
            <input
              className={classes.input}
              value={pType}
              onChange={(e) => setPType(e.target.value)}
              type="text"
              placeholder=""
            />
            <div></div>
          </div>

          <div className={classes.inputgroup}>
            <label className={classes.label}>Seller's Address</label>
            <input
              className={classes.input}
              value={pAddress}
              onChange={(e) => setPAddress(e.target.value)}
              type="text"
              placeholder=""
            />
            <div></div>
          </div>

          <div className={classes.inputgroup}>
            <label className={classes.label}>Product Price per kg</label>
            <input
              className={classes.input}
              value={pPrice}
              onChange={(e) => setPPrice(e.target.value)}
              type="number"
              placeholder=""
            />
            <div></div>
          </div>

          <div className={classes.inputgroup}>
            <label className={classes.label}>product available in kgs</label>
            <input
              className={classes.input}
              value={pAvailable}
              onChange={(e) => setPAvailable(e.target.value)}
              type="number"
              placeholder=""
            />
            <div></div>
          </div>

          {error && <p>{error}</p>}
          <button className={classes.Btn} onClick={handleSubmit}>
            Add Product
          </button>
        </div>
      </div>
    </>
  );
}

export default AddProduct;
