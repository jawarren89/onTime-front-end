// Source: https://www.youtube.com/watch?v=CXa0f4-dWi4

import "../styles/NavBar.css";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import NavbarData from "./NavBarData";
import PropTypes from "prop-types";

import add from "../assets/plus-circle.svg";
import menu from "../assets/menu.svg";

const NavBar = (props) => {
  const [showRoutineForm, setShowRoutineForm] = useState(false);

  const showFormOnClick = () => {
    setShowRoutineForm(!showRoutineForm);
  };

  return (
    <div className="navbar-container">
      {/* horizontal bar with menu icon and current page title */}
      <div className="navbar">
        <Link to="#" className="menu-bars">
          <img
            src={menu}
            alt="menu icon"
            onClick={props.toggleNavbarCallback}
          />
        </Link>
        <h1 className="current-page-title">
          {props.pageTitle}
          {/* {props.selectedRoutine ? props.selectedRoutine : props.pageTitle} */}
        </h1>
      </div>
      <div className="add-routine">
        <button className="right-button" onClick={showFormOnClick}>
          <img src={add} alt="add icon" />
        </button>
      </div>

      {/* actual menu component here */}
      <nav className={props.viewNavbar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items" onClick={props.toggleNavbarCallback}>
          <li className="navbar-toggle">
            <Link to="#" className="menu-bars">
              <img src={menu} alt="menu icon" />
            </Link>
            <h1 className="app-title">onTime</h1>
          </li>
          {NavbarData.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

NavBar.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  selectedRoutine: PropTypes.object.isRequired,
  viewNavbar: PropTypes.bool.isRequired,
  toggleNavbarCallback: PropTypes.func.isRequired,
};

export default NavBar;
