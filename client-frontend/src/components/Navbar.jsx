import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Navbar.module.css";
import "./navbar.css";
import { NavLink } from "react-router-dom";
import { FaEnvelope, FaInstagramSquare, FaYoutubeSquare } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = ({ logged }) => {
  const [showMediaIcons, setShowMediaIcons] = useState(false);
  const [nav, setNav] = useState(true);
  useEffect(() => {
    let auth = localStorage.getItem("user");
    if (auth) {
      setNav(false);
    }
    if (logged) {
      setNav(false);
    }
  }, [logged]);

  const LogoutHandler = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <>
      {nav ? (
        <nav className="main-nav">
          {/* 1st logo part  */}
          <div className="logo">
            <h2>
              <span>F</span>armers
              <span>F</span>irst
            </h2>
          </div>

          {/* 2nd menu part  */}
          <div
            className={
              showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"
            }
          >
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/signup">SignUp</NavLink>
              </li>
              <li>
                <NavLink to="/verify">Verify</NavLink>
              </li>
            </ul>
          </div>

          {/* 3rd social media links */}
          <div className="social-media">
            <ul className="social-media-desktop">
              <li>
                <a href="https://www.gmail.com/" target="_thapa">
                  <FaEnvelope className="facebook" />
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/" target="_thapa">
                  <FaInstagramSquare className="instagram" />
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/" target="_thapa">
                  <FaYoutubeSquare className="youtube" />
                </a>
              </li>
            </ul>

            {/* hamburget menu start  */}
            <div className="hamburger-menu">
              <a href="#" onClick={() => setShowMediaIcons(!showMediaIcons)}>
                <GiHamburgerMenu />
              </a>
            </div>
          </div>
        </nav>
      ) : (
        <nav className="main-nav">
          {/* 1st logo part  */}
          <div className="logo">
            <h2>
              <span>F</span>armers
              <span>F</span>irst
            </h2>
          </div>

          {/* 2nd menu part  */}
          <div
            className={
              showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"
            }
          >
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard">Market</NavLink>
              </li>
              <li>
                <NavLink to="/add-funds">Balance</NavLink>
              </li>
              <li>
                <NavLink to="/ai">Farming AI</NavLink>
              </li>
              <li>
              <NavLink onClick={LogoutHandler}>Logout</NavLink>
              </li>
            </ul>
          </div>

          {/* 3rd social media links */}
          <div className="social-media">
            <ul className="social-media-desktop">
              <li>
                <a href="https://www.gmail.com/" target="_thapa">
                  <FaEnvelope className="facebook" />
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/" target="_thapa">
                  <FaInstagramSquare className="instagram" />
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/" target="_thapa">
                  <FaYoutubeSquare className="youtube" />
                </a>
              </li>
            </ul>

            {/* hamburget menu start  */}
            <div className="hamburger-menu">
              <a href="#" onClick={() => setShowMediaIcons(!showMediaIcons)}>
                <GiHamburgerMenu />
              </a>
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
