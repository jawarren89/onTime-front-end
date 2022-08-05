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

  const timeParser = (time) => {
    if (time) {
      return `${time.hour}:${time.minute}`;
    } else {
      return "--";
    }
  };

  const start = timeParser(props.start_time);
  const complete = timeParser(props.complete_by);

  return (
    <div>
      <ul className={isActive ? "routine expanded" : "routine"}>
        <img
          src={isActive ? chevron_down : chevron_right}
          alt="expand/collapse icon"
          className="chevron"
          onClick={() => setIsActive(!isActive)}
        />
        <li className="title">{props.title}</li>
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
        <li className="timing">
          Start: {start} | Complete: {complete}
        </li>
      </ul>
      <div className="expanded-routine">
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
