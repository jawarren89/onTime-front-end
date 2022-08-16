import "../styles/PageHeader.css";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import { TimeToMilitary } from "./TimeConversions";

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

  const saveAndClose = () => {
    const saveRoutineForm = JSON.parse(JSON.stringify(props.selectedRoutine));
    const time = TimeToMilitary(props.selectedRoutine.complete_time);
    saveRoutineForm.complete_time = time;
    props.updateRoutine(props.selectedRoutine.routine_id, saveRoutineForm);
    console.log(saveRoutineForm);
  };

  const endRoutine = () => {
    props.setIsPlaying(false);
  };

  return (
    <header className="navheader">
      <Link to="/" className="left-button" onClick={endRoutine}>
        <img src={close} alt="x icon" />
      </Link>
      <h1 className="page-title">{props.pageTitle}</h1>

      {pageButton === "edit" ? (
        <Link to={`/`}>
          <button className="right-button" onClick={saveAndClose}>
            Save
          </button>
        </Link>
      ) : (
        <button className="right-button" onClick={endRoutine}>
          End
        </button>
      )}
    </header>
  );
};

PageHeader.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  selectedRoutine: PropTypes.object.isRequired,
  updateRoutine: PropTypes.func.isRequired,
  setIsPlaying: PropTypes.func.isRequired,
};

export default PageHeader;
