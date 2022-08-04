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

  const time_parser = (time_string) => {
    if (time_string) {
      const hours = time_string.split();
      return hours[0];
    } else {
      return "--";
    }
  };

  const start_time = time_parser(props.start_time);
  const complete_time = time_parser(props.complete_time);

  const deleteOnClick = () => {
    return console.log("deleted");
  };

  return (
    <div>
      <ul className="routine">
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
          Start: {start_time} | Complete: {complete_time}
        </li>
      </ul>

      <div>
        {isActive ? (
          <ExpandedRoutine tasks={props.tasks}></ExpandedRoutine>
        ) : (
          ""
        )}
      </div>

      {/* <div>
        <ul className="drop-down">
          <li className="total-time">Total time: {props.total_time}</li>
          <li className="total-tasks">Tasks: {total_tasks} </li>
          <li className="description">Description: {props.description}</li>
          <div className="complete-by">
            <li>Complete by: (insert selectors)</li>
          </div>
          <div className="update-button-container">
            <button className="update-button" onClick={updateOnClick}>
              Update
            </button>
          </div>
        </ul>
      </div> */}
    </div>
  );
};

Routine.propTypes = {
  routines: PropTypes.arrayOf(
    PropTypes.shape({
      routine_id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      destination: PropTypes.string,
      complete_time: PropTypes.string,
      start_time: PropTypes.string,
      total_time: PropTypes.number,
      tasks: PropTypes.array.isRequired,
    })
  ),
};

export default Routine;
