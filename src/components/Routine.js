import "../styles/Routine.css";
import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import TimeToCivilian from "./TimeToCivilian";
import RoutineExpanded from "./RoutineExpanded";

import play from "../assets/play.svg";
import edit from "../assets/edit-2.svg";
import trash from "../assets/trash-2.svg";
import chevron_right from "../assets/chevron-right.svg";
import chevron_down from "../assets/chevron-down.svg";

const Routine = (props) => {
  const startCivTime = props.total_time
    ? TimeToCivilian(props.start_time)
    : ["--", "--", "--"];
  const completeCivTime = props.complete_time
    ? TimeToCivilian(props.complete_time)
    : ["--", "--", "--"];

  const deleteOnClick = () => {
    props.deleteRoutine(props.routine_id);
  };

  const expandRow = () => {
    if (props.expandedRow === props.routine_id) {
      props.setExpandedRow(0);
    } else {
      props.setExpandedRow(props.routine_id);
    }
  };

  //Do not need this if making an axios call in app for one routine
  const selectRoutineonClick = () => {
    const currentRoutine = {
      routine_id: props.routine_id,
      title: props.title,
      description: props.description,
      destination: props.destination,
      complete_time: completeCivTime,
      start_time: startCivTime,
      total_time: props.total_time,
      tasks: props.tasks,
    };
    props.setSelectedRoutine(currentRoutine);
  };

  const isActive = props.expandedRow === props.routine_id;

  return (
    <div className="routine-item-container">
      <ul className={isActive ? "routine expanded" : "routine"}>
        <img
          src={isActive ? chevron_down : chevron_right}
          alt="expand/collapse icon"
          className="chevron"
          onClick={expandRow}
        />
        <li className="routine-title" onClick={expandRow}>
          {props.title}
        </li>
        <div className="button-container">
          <Link to={`/routine/${props.routine_id}/play`}>
            <button className="play" onClick={selectRoutineonClick}>
              <img src={play} alt="play icon" />
            </button>
          </Link>
          <Link to={`/routine/${props.routine_id}/edit`}>
            <button className="edit" onClick={selectRoutineonClick}>
              <img src={edit} alt="edit icon" />
            </button>
          </Link>
          <div>
            <button className="delete" onClick={deleteOnClick}>
              <img src={trash} alt="trash icon" />
            </button>
          </div>
        </div>
        <div className="times-container" onClick={expandRow}>
          <li className="time-start">
            Start: {startCivTime[0]}:{startCivTime[1]} {startCivTime[2]}
          </li>
          <li className="time-complete">
            Complete: {completeCivTime[0]}:{completeCivTime[1]}{" "}
            {completeCivTime[2]}
          </li>
        </div>
      </ul>
      <div className="expanded-routine-container">
        {isActive ? (
          <RoutineExpanded
            routine_id={props.routine_id}
            tasks={props.tasks}
            total_time={props.total_time}
            description={props.description}
            completeCivTime={completeCivTime}
            updateRoutine={props.updateRoutine}
            toMilitaryDict={props.toMilitaryDict}
          ></RoutineExpanded>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

Routine.propTypes = {
  routine_id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  destination: PropTypes.string,
  complete_time: PropTypes.shape({
    hour: PropTypes.number,
    minute: PropTypes.number,
    second: PropTypes.number,
    day: PropTypes.number,
    month: PropTypes.number,
    year: PropTypes.number,
  }),
  start_time: PropTypes.shape({
    hour: PropTypes.number,
    minute: PropTypes.number,
    second: PropTypes.number,
    day: PropTypes.number,
    month: PropTypes.number,
    year: PropTypes.number,
  }),
  total_time: PropTypes.number,
  tasks: PropTypes.array.isRequired,
  updateRoutine: PropTypes.func.isRequired,
  deleteRoutine: PropTypes.func.isRequired,
  setSelectedRoutine: PropTypes.func.isRequired,
  expandedRow: PropTypes.number.isRequired,
  setExpandedRow: PropTypes.func.isRequired,
  toMilitaryDict: PropTypes.func.isRequired,
};

export default Routine;
