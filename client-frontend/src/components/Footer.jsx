import React from "react";
import "./Footer.css"; // Import your CSS file for styling
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-links">
          <Link className="footer-link" to="/privacypolicy">
            Privacy Policy
          </Link>
          <Link className="footer-link" to="/termsandcondition">
            Terms and Conditions
          </Link>
          <Link className="footer-link" to="/refundpolicy">
            Refund Policy
          </Link>
          <Link className="footer-link" to="/shippingpolicy">
            Shipping Policy
          </Link>
          <Link className="footer-link" to="/contact">
            Contact Us
          </Link>
          <Link className="footer-link" to="/about">
            About Us
          </Link>

        </div>
        <div className="footer-info">
          <p>
            &copy; {new Date().getFullYear()}  Farmers First. Empowering farmers, enhancing livelihoods.
          </p>
        </div>
       
      </div>
    </footer>
  );
};

export default Footer;
