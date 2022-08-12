import "../styles/PageHeader.css";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import close from "../assets/x.svg";

// The PageHeader component appears on Edit and Play Routine pages and
// is conditionally rendered in lieu of the regular header/menu
//navigation system.

const PageHeader = (props) => {
  let location = useLocation();
  const path = () => {
    if (location.pathname.includes("edit")) {
      return "edit";
    } else if (location.pathname.includes("play")) {
      return "play";
    }
  };

  const pageButton = path();

  const endRoutine = () => {
    props.setIsPlaying(false);
  };

  return (
    <header className="header">
      <Link to="/" className="left-button">
        <img src={close} alt="x icon" />
      </Link>
      <h1 className="page-title">{props.pageTitle}</h1>

      {pageButton === "edit" ? (
        <Link to={`/`}>
          <button className="save-routine btn">Save Changes</button>
        </Link>
      ) : (
        <button className="stop-routine btn" onClick={endRoutine}>
          End Routine
        </button>
      )}
    </header>
  );
};

PageHeader.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  setIsPlaying: PropTypes.func.isRequired,
};

export default PageHeader;
