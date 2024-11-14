import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import Backend from "./Backend";
// import axios from "axios";
import "./About.css";

const About = () => {
  // const [name, setName] = useState();
  // const [balance, setBalance] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    let auth = localStorage.getItem("user");
    if (!auth) {
      navigate("/");
    }
  }, []);

  // useEffect(() => {
  //   getData();
  // }, []);

  // const getData = async () => {
  //   let auth = localStorage.getItem("user");
  //   let id = JSON.parse(auth).id;
  //   const { data } = await axios.get(`${Backend}user/${id}`);

  //   setName(data[0].name);
  //   setBalance(data[0].balance);
  // };

  return (
    <div className="appp1">
      <div className="about-us-container">
        <h1>About Us</h1>
        <section className="mission">
          <h2>Our Mission</h2>
          <p>
            At Farmers First, our mission is to empower farmers by providing
            them with a platform to sell their produce directly to customers. We
            aim to eliminate middlemen and ensure that farmers receive fair
            prices for their hard work, while customers get fresh, high-quality
            products straight from the source.
          </p>
        </section>
        <section className="vision">
          <h2>Our Vision</h2>
          <p>
            Our vision is to revolutionize the agricultural market by becoming
            the go-to platform for direct farm-to-table sales. We strive to
            create a sustainable, transparent, and equitable food system where
            farmers and consumers are both equally valued.
          </p>
        </section>
        <section className="team">
          <h2>Our Team</h2>
          <p>
            Farmers First is driven by a team of passionate individuals who are
            committed to bridging the gap between farmers and consumers. Our
            team includes agricultural experts, tech enthusiasts, and customer
            support professionals who are dedicated to making a positive impact
            in the farming community.
          </p>
        </section>
        <section className="contact">
          <h2>Contact Information</h2>
          <p>
            <strong>Email:</strong> farmersfirst.contact@example.com
          </p>
          <p>
            <strong>Operating Address:</strong> Panipat, Haryana, India, 132103
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
