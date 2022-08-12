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

  const expandRow = () => {
    if (props.expandedRow === props.routine_id) {
      props.setExpandedRow(0);
      props.setSelectedRoutine(defaultRoutine);
    } else {
      props.setShowAddForm(false);
      props.setExpandedRow(props.routine_id);
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
  };

  // select routine and highlight it before allowing dropdown
  // const expandRow = () => {
  //   if (props.expandedRow !== props.routine_id) {
  //     console.log("select this, close others");
  //     props.setSelectedRoutine(props.routine_id);
  //     props.setShowAddForm(false);
  //     props.setExpandedRow(0);
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
  //   if (props.selectedRoutine.routine_id === props.routine_id) {
  //     props.setExpandedRow(props.routine_id);
  //   }
  //   if (props.expandedRow === props.routine_id) {
  //     console.log("you've already selected this, close it please");
  //     props.setExpandedRow(0);
  //     props.setSelectedRoutine(defaultRoutine);
  //   }
  // };

  const isActive = props.expandedRow === props.routine_id;

  const civStartTime = TimeToCivilian(props.start_time);
  const civCompleteTime = TimeToCivilian(props.complete_time);

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
            Start: {civStartTime.hour}:{civStartTime.minute}{" "}
            {civStartTime.meridiem}
          </li>
          <li className="time-complete">
            Complete: {civCompleteTime.hour}:{civCompleteTime.minute}{" "}
            {civCompleteTime.meridiem}
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
            selectedRoutine={props.selectedRoutine}
            setSelectedRoutine={props.setSelectedRoutine}
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
