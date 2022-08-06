import "../styles/Routine.css";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import ExpandedRoutine from "./ExpandedRoutine";

import play from "../assets/play.svg";
import edit from "../assets/edit-2.svg";
import trash from "../assets/trash-2.svg";
import chevron_right from "../assets/chevron-right.svg";
import chevron_down from "../assets/chevron-down.svg";

const Routine = (props) => {
  const [isActive, setIsActive] = useState(false);

  const deleteOnClick = () => {
    props.deleteRoutineCallback(props.routine_id);
  };

  const meridiemParser = (time) => {
    if (time.hour >= 12) {
      return "PM";
    } else {
      return "AM";
    }
  };

  const timeParser = (time, duration) => {
    if (time && duration) {
      const meridiem = meridiemParser(time);
      if (time.minute === 0) {
        return `${time.hour}:00 ${meridiem}`;
      } else {
        return `${time.hour}:${time.minute} ${meridiem}`;
      }
    } else {
      return "--";
    }
  };

  const start = timeParser(props.start_time, props.total_time);
  const complete = timeParser(props.complete_time, true);

  return (
    <div className="routine-item-container">
      <ul className={isActive ? "routine expanded" : "routine"}>
        <img
          src={isActive ? chevron_down : chevron_right}
          alt="expand/collapse icon"
          className="chevron"
          onClick={() => setIsActive(!isActive)}
        />
        <li className="routine-title">{props.title}</li>
        <div className="button-container">
          <Link to="/playroutine">
            <button className="play">
              <img src={play} alt="play icon" />
            </button>
          </Link>
          <Link to="/editroutine">
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
        <div className="times-container">
          <li className="time-start">Start: {start}</li>
          <li className="time-complete">Complete: {complete}</li>
        </div>
      </ul>
      <div className="expanded-routine-container">
        {isActive ? (
          <ExpandedRoutine
            routine_id={props.routine_id}
            tasks={props.tasks}
            total_time={props.total_time}
            description={props.description}
            complete_time={props.complete_time}
          ></ExpandedRoutine>
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
};

export default Routine;
