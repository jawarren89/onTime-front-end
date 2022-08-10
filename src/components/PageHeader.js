import "../styles/PageHeader.css";
import React from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";

import close from "../assets/x.svg";

// The PageHeader component appears on Edit and Play Routine pages and
// is conditionally rendered in lieu of the regular header/menu
//navigation system.

const PageHeader = (props) => {
  return (
    <header className="header">
      <Link to="/" className="left-button">
        <img src={close} alt="x icon" />
      </Link>
      <h1 className="page-title">{props.pageTitle}</h1>
      {/* <button className="right-button" onClick={showFormOnClick}>
            <img src={add} alt="add icon" />
        </button> */}
    </header>
  );
};

PageHeader.propTypes = {
  pageTitle: PropTypes.string.isRequired,
};

export default PageHeader;
