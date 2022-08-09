// Source: https://www.youtube.com/watch?v=CXa0f4-dWi4

import "../styles/NavMenu.css";
import React from "react";
import { Link } from "react-router-dom";

import NavMenuData from "./NavMenuData";
import PropTypes from "prop-types";

import menu from "../assets/menu.svg";

// The NavBar is a menu component that can collapse and expande (default is
// collapsed). It is rendered as a fragmen inside the header component of
// applicable pages.

const NavMenu = (props) => {
  // const showFormOnClick = () => {
  //   props.toggleAddRoutineForm();
  // };

  return (
    <header className={props.viewNavSystem ? "nav-system" : "nav-hidden"}>
      <Link to="#" className="left-button">
        <img src={menu} alt="menu icon" onClick={props.toggleNavMenu} />
      </Link>
      <h1 className="page-title">{props.pageTitle}</h1>
      {/* <button className="right-button" onClick={showFormOnClick}>
            <img src={add} alt="add icon" />
        </button> */}

      {/* collapsible menu component here */}
      <nav className={props.expandNavMenu ? "menu" : "menu-hidden"}>
        <ul className="menu-items" onClick={props.toggleNavMenu}>
          <li className="navbar-toggle">
            <Link to="#" className="left-button">
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
    </header>
  );
};

NavMenu.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  viewNavSystem: PropTypes.bool.isRequired,
  expandNavMenu: PropTypes.bool.isRequired,
  toggleNavMenu: PropTypes.func.isRequired,
};

export default NavMenu;
