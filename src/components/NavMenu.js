// Source: https://www.youtube.com/watch?v=CXa0f4-dWi4

import "../styles/NavMenu.css";
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import NavMenuData from "./NavMenuData";
import PropTypes from "prop-types";

import menu from "../assets/menu.svg";

// The NavBar is a menu component that can collapse and expand (default is
// collapsed). It is rendered conditionally.

const NavMenu = (props) => {
  const toggleNavMenu = () => props.setExpandNavMenu(!props.expandNavMenu);

  const ref = useRef();

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (
        props.expandNavMenu &&
        ref.current &&
        !ref.current.contains(e.target)
      ) {
        props.setExpandNavMenu(false);
      }
    };

    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, [props.expandNavMenu]);

  return (
    <div className="nav-system" ref={ref}>
      <Link to="#" className="left-button">
        <img src={menu} alt="menu icon" onClick={toggleNavMenu} />
      </Link>
      <h1 className="page-title">{props.pageTitle}</h1>

      {/* collapsible menu component here */}
      <nav className={props.expandNavMenu ? "menu" : "menu-hidden"}>
        <ul className="menu-items" onClick={toggleNavMenu}>
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
                  <span className="menu-link">{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

NavMenu.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  expandNavMenu: PropTypes.bool.isRequired,
  setExpandNavMenu: PropTypes.func.isRequired,
};

export default NavMenu;
