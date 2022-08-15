import "../styles/Routine.css";
import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import RoutineExpanded from "./RoutineExpanded";

import { TimeToCivilian } from "./TimeConversions";
import { defaultRoutine } from "./Constants";

import play from "../assets/play.svg";
import edit from "../assets/edit-2.svg";
import trash from "../assets/trash-2.svg";
import chevron_right from "../assets/chevron-right.svg";
import chevron_down from "../assets/chevron-down.svg";

// The Routine component displays each routine, with an optionally expanded
// component (called RoutineExpanded) if the routine is selected. Routines
// can be deleted, edited, or selected for "play".

const Routine = (props) => {
  const deleteOnClick = () => {
    props.deleteRoutine(props.routine_id);
  };

  // select routine only once to expand dropdown
  // const expandRow = () => {
  //   if (props.expandedRow === props.routine_id) {
  //     props.setExpandedRow(0);
  //     props.setSelectedRoutine(defaultRoutine);
  //   } else {
  //     props.setShowAddForm(false);
  //     props.setExpandedRow(props.routine_id);
  //     props.setSelectedRoutine({
  //       routine_id: props.routine_id,
  //       title: props.title,
  //       description: props.description,
  //       destination: props.destination,
  //       complete_time: props.complete_time,
  //       start_time: props.start_time,
  //       total_time: props.total_time,
  //       tasks: props.tasks,
  //     });
  //   }
  // };

  // select routine and highlight it before allowing dropdown
  const expandRow = () => {
    if (props.expandedRow !== props.routine_id) {
      props.setSelectedRoutine(props.routine_id);
      props.setShowAddForm(false);
      props.setExpandedRow(0);
      props.setSelectedRoutine({
        routine_id: props.routine_id,
        title: props.title,
        description: props.description,
        destination: props.destination,
        complete_time: props.complete_time,
        start_time: props.start_time,
        total_time: props.total_time,
        tasks: props.tasks,
      });
    }
    if (props.selectedRoutine.routine_id === props.routine_id) {
      props.setExpandedRow(props.routine_id);
    }
    if (props.expandedRow === props.routine_id) {
      props.setExpandedRow(0);
      props.setSelectedRoutine(defaultRoutine);
    }
  };

  const isSelected = props.selectedRoutine.routine_id === props.routine_id;
  const isExpanded = props.expandedRow === props.routine_id;

  const civStartTime = TimeToCivilian(props.start_time);
  const civCompleteTime = TimeToCivilian(props.complete_time);

  return (
    <React.Fragment>
      <ul className={isSelected ? "routine selected" : "routine"}>
        <img
          src={isExpanded ? chevron_down : chevron_right}
          alt="expand/collapse icon"
          className="routine-chevron"
          onClick={expandRow}
        />
        <li className="routine-title" onClick={expandRow}>
          {props.title}
        </li>
        <div className="routinebutton-container">
          <Link to={`/routines/${props.routine_id}/play`}>
            <button className="play iconbtn">
              <img src={play} alt="play icon" />
            </button>
          </Link>
          <Link to={`/routines/${props.routine_id}/edit`}>
            <button className="edit iconbtn">
              <img src={edit} alt="edit icon" />
            </button>
          </Link>
          <div>
            <button className="delete iconbtn" onClick={deleteOnClick}>
              <img src={trash} alt="trash icon" />
            </button>
          </div>
        </div>
        <div className="routinetimes-container" onClick={expandRow}>
          <li className="routine-start">
            Start: {civStartTime.hour}:{civStartTime.minute}{" "}
            {civStartTime.meridiem}
          </li>
          <li className="routine-complete">
            Complete: {civCompleteTime.hour}:{civCompleteTime.minute}{" "}
            {civCompleteTime.meridiem}
          </li>
        </div>
      </ul>
      {isExpanded ? (
        <RoutineExpanded
          routine_id={props.routine_id}
          tasks={props.tasks}
          total_time={props.total_time}
          description={props.description}
          complete_time={props.complete_time}
          selectedRoutine={props.selectedRoutine}
          setSelectedRoutine={props.setSelectedRoutine}
          updateRoutine={props.updateRoutine}
        ></RoutineExpanded>
      ) : (
        ""
      )}
    </React.Fragment>
  );
};

Routine.propTypes = {
  routine_id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  destination: PropTypes.string,
  complete_time: PropTypes.object,
  start_time: PropTypes.object,
  total_time: PropTypes.number,
  tasks: PropTypes.array.isRequired,
  selectedRoutine: PropTypes.object.isRequired,
  setSelectedRoutine: PropTypes.func.isRequired,
  expandedRow: PropTypes.number.isRequired,
  setExpandedRow: PropTypes.func.isRequired,
  setShowAddForm: PropTypes.func.isRequired,
  updateRoutine: PropTypes.func.isRequired,
  deleteRoutine: PropTypes.func.isRequired,
};

export default Routine;
