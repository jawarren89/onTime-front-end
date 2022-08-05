// Source: https://www.youtube.com/watch?v=CXa0f4-dWi4

import "../styles/NavBar.css";
import React from "react";
import { Link } from "react-router-dom";

import NavbarData from "./NavBarData";
import PropTypes from "prop-types";

import menu from "../assets/menu.svg";

const NavBar = (props) => {
  return (
    <div className="menu">
      <div className="navbar">
        <Link to="#" className="menu-bars">
          <img
            src={menu}
            alt="menu icon"
            onClick={props.toggleNavbarCallback}
          />
        </Link>
        <header className="page-header">
          <h1>{props.pageTitle}</h1>
        </header>
      </div>
      <nav className={props.navbar ? "nav-menu active" : "nav-menu"}>
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
  navbar: PropTypes.bool.isRequired,
  toggleNavbarCallback: PropTypes.func.isRequired,
};

export default NavBar;
