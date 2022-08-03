import React from "react";
import { Link } from "react-router-dom";
// import { useState } from "react";

import NavbarData from "./NavBarData";
import "./NavBar.css";
import menu from "../assets/menu.svg";
import x from "../assets/x.svg";

const NavBar = (props) => {
  return (
    <div className="menu">
      <div className="navbar">
        <Link to="#" className="menu-bars">
          <img
            src={menu}
            alt="menu bars"
            onClick={props.toggleNavbarCallback}
          />
        </Link>
        <header className="page-header">
          <h1>onTime</h1>
        </header>
      </div>
      <nav className={props.navbar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items" onClick={props.toggleNavbarCallback}>
          <li className="navbar-toggle">
            <Link to="#" className="menu-bars">
              <img src={x} alt="close menu" />
            </Link>
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

export default NavBar;
