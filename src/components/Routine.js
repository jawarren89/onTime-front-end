import "../styles/Routine.css";
import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import play from "../assets/play.svg";
import edit from "../assets/edit-2.svg";
import trash from "../assets/trash-2.svg";
import chevron_right from "../assets/chevron-right.svg";
import chevron_down from "../assets/chevron-down.svg";

const Routine = (props) => {
  const time_parser = (time_string) => {
    if (time_string) {
      const hours = time_string.split();
      return hours[0];
    } else {
      return "--";
    }
  };

  const deleteOnClick = () => {
    return console.log("deleted");
  };

  const updateOnClick = () => {
    return console.log("updated");
  };

  const total_tasks = props.tasks.length;
  const start_time = time_parser(props.start_time);
  const complete_time = time_parser(props.complete_time);

  return (
    <div>
      <ul className="routine">
        <img src={chevron_right} alt="right arrow" className="chevron-right" />
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

      <div className="drop-down">
        <ul>
          <li className="total-time">Total time: {props.total_time}</li>
          <li className="total-tasks">Tasks: {total_tasks} </li>
          <li className="description">Description: {props.description}</li>
          <div className="edit-time">
            <li>Complete by: (insert 3 drop down selectors)</li>
          </div>
          <button className="update-button" onClick={updateOnClick}>
            Update
          </button>
        </ul>
      </div>
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
