import "../styles/Routine.css";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import TimeParser from "./TimeParser";
import ExpandedRoutine from "./ExpandedRoutine";

import play from "../assets/play.svg";
import edit from "../assets/edit-2.svg";
import trash from "../assets/trash-2.svg";
import chevron_right from "../assets/chevron-right.svg";
import chevron_down from "../assets/chevron-down.svg";

const Routine = (props) => {
  const start = TimeParser(props.start_time, props.total_time);
  const finish = TimeParser(props.complete_time, true);

  const [isActive, setIsActive] = useState(false);
  const [complete, setComplete] = useState({
    hours: finish[0],
    minutes: finish[1],
    meridiem: finish[2],
  });

  const deleteOnClick = () => {
    props.deleteRoutine(props.routine_id);
  };

  return (
    <div className="routine-item-container">
      <ul className={isActive ? "routine expanded" : "routine"}>
        <img
          src={isActive ? chevron_down : chevron_right}
          alt="expand/collapse icon"
          className="chevron"
          onClick={() => setIsActive(!isActive)}
        />
        <li className="routine-title" onClick={() => setIsActive(!isActive)}>
          {props.title}
        </li>
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
        <div className="times-container" onClick={() => setIsActive(!isActive)}>
          <li className="time-start">
            Start: {start[0]}:{start[1]} {start[2]}
          </li>
          <li className="time-complete">
            Complete: {complete.hours}:{complete.minutes} {complete.meridiem}
          </li>
        </div>
      </ul>
      <div className="expanded-routine-container">
        {isActive ? (
          <ExpandedRoutine
            routine_id={props.routine_id}
            tasks={props.tasks}
            total_time={props.total_time}
            description={props.description}
            complete={complete}
            setComplete={setComplete}
            updateRoutine={props.updateRoutine}
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
  updateRoutine: PropTypes.func.isRequired,
};

export default Routine;
