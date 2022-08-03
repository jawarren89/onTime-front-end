import React from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";

import "./Routine.css";
import play from "../assets/play.svg";
import edit from "../assets/edit-2.svg";
import trash from "../assets/trash-2.svg";

const Routine = (props) => {
  const time_parser = (time_string) => {
    if (time_string) {
      const hours = time_string.split();
      return hours[0];
    }
  };

  const deleteOnClick = () => {
    return console.log("deleted");
  };

  const updateOnClick = () => {
    return console.log("updated");
  };

  const total_tasks = props.tasks.length;
  const complete_time = time_parser(props.complete_time);

  return (
    <div className="routine">
      <ul>
        <li className="title">{props.title}</li>
        <li className="timing">
          Start: {props.start_time} | Complete: {props.complete_time}
        </li>
        <div className="buttons">
          <Link to="/playroutine">
            <img src={play} alt="play icon" />
          </Link>
          <Link to="/editroutine">
            <img src={edit} alt="edit icon" />
          </Link>
          <button onClick={deleteOnClick}>
            <img src={trash} alt="trash icon" />
          </button>
        </div>
        <div className="drop-down">
          <ul>
            <li>Total time: {props.total_time}</li>
            <li>Tasks: {total_tasks} </li>
            <li className="description">Description: {props.description}</li>
            <div>
              <li>Complete by: {complete_time}</li>
            </div>
            <button onClick={updateOnClick}>Submit</button>
          </ul>
        </div>
      </ul>
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
