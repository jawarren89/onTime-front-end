import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

import NavbarData from "./NavBarData";
import menu from "../assets/menu.svg";
import x from "../assets/x.svg";

const NavBar = () => {
  const [navbar, setNavbar] = useState(false);

  const showNavbar = () => setNavbar(!navbar);

  return (
    <>
      <div className="navbar">
        <Link to="#" className="menu-bars">
          <img src={menu} alt="menu bars" />
        </Link>
      </div>
      <nav className={navbar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items">
          <li className="navbar-toggle">
            <Link to="#" className="menubars">
              <img src={x} alt="close menu" />
            </Link>
          </li>
          {NavbarData.map((item, index) => {
            console.log("get navbar data");
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
    </>
  );
};

export default NavBar;
