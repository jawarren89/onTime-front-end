// Source: https://www.youtube.com/watch?v=CXa0f4-dWi4

import "../styles/NavMenu.css";
import React from "react";
import { Link } from "react-router-dom";

import NavMenuData from "./NavMenuData";
import PropTypes from "prop-types";

import menu from "../assets/menu.svg";

// The NavBar is a menu component that can collapse and expande (default is
// collapsed). It is rendered inside the header component of applicable pages.

const NavMenu = (props) => {
  return (
    <React.Fragment>
      {/* <div className="left-header"> */}
      <Link to="#" className="menu-bars">
        <img src={menu} alt="menu icon" onClick={props.toggleNavbar} />
      </Link>
      <h1 className="current-page-title">
        {props.selectedRoutine ? props.selectedRoutine.title : props.pageTitle}
      </h1>
      {/* </div> */}

      {/* collapsible menu component here */}
      <nav className={props.viewNavbar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items" onClick={props.toggleNavbar}>
          <li className="navbar-toggle">
            <Link to="#" className="menu-bars">
              <img src={menu} alt="menu icon" />
            </Link>
            <h1 className="app-title">onTime</h1>
          </li>
          {NavMenuData.map((item, index) => {
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
    </React.Fragment>
  );
};

NavMenu.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  selectedRoutine: PropTypes.object,
  viewNavbar: PropTypes.bool.isRequired,
  toggleNavbar: PropTypes.func.isRequired,
};

export default NavMenu;
