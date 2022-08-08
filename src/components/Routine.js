import "../styles/Routine.css";
import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import RoutineExpanded from "./RoutineExpanded";

import play from "../assets/play.svg";
import edit from "../assets/edit-2.svg";
import trash from "../assets/trash-2.svg";
import chevron_right from "../assets/chevron-right.svg";
import chevron_down from "../assets/chevron-down.svg";

// The Routine component displays each routine, with an optionally expanded
// component (called RoutineExpanded) if the routine is selected. Displayed
// times from the Routine object are converted and displayed in civilian times,
// and are passed as such to the option RoutineEpanded component.

const Routine = (props) => {
  const deleteOnClick = () => {
    props.deleteRoutine(props.routine_id);
  };

  const expandRow = () => {
    if (props.expandedRow === props.routine_id) {
      props.setExpandedRow(0);
      props.setSelectedRoutine({});
    } else {
      props.setExpandedRow(props.routine_id);
      props.setSelectedRoutine({
        routine_id: props.routine_id,
        // title: props.title,
        // description: props.description,
        // destination: props.destination,
        complete_time: props.complete_time,
        // start_time: props.start_time,
        // total_time: props.total_time,
        // tasks: props.tasks,
      });
    }
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
          <Link to={`/routines/${props.routine_id}/play`}>
            <button className="play">
              <img src={play} alt="play icon" />
            </button>
          </Link>
          <Link to={`/routines/${props.routine_id}/edit`}>
            <button className="edit">
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
            Start: {props.start_time.hour}:{props.start_time.minute}{" "}
            {props.start_time.meridiem}
          </li>
          <li className="time-complete">
            Complete: {props.complete_time.hour}:{props.complete_time.minute}{" "}
            {props.complete_time.meridiem}
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
            complete_time={props.complete_time}
            updateRoutine={props.updateRoutine}
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
  complete_time: PropTypes.object.isRequired,
  start_time: PropTypes.object.isRequired,
  total_time: PropTypes.number,
  tasks: PropTypes.array.isRequired,
  setSelectedRoutine: PropTypes.func.isRequired,
  updateRoutine: PropTypes.func.isRequired,
  deleteRoutine: PropTypes.func.isRequired,
  expandedRow: PropTypes.number.isRequired,
  setExpandedRow: PropTypes.func.isRequired,
};

export default Routine;
