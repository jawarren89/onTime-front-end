import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="navbar">
      <nav>
        <Link to="/">Routines</Link>
      </nav>
      <nav>
        <Link to="/taskbank">Task Bank</Link>
      </nav>
      <nav>
        <Link to="/about">About</Link>
      </nav>
      <nav>
        <Link to="/settings">Settings</Link>
      </nav>
    </div>
  );
};

export default NavBar;
