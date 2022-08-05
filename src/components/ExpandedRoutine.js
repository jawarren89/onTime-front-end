import "../styles/ExpandedRoutine.css";
import React from "react";
import PropTypes from "prop-types";

import TimeSelector from "./TimeSelector";

const ExpandedRoutine = (props) => {
  const updateOnClick = () => {
    return console.log("updated");
  };

  return (
    <div className="drop-down-container">
      <ul className="drop-down">
        <div className="drop-row1">
          <li className="total-tasks">
            Tasks: {props.tasks.length ? props.tasks.length : "--"}
          </li>
          <li className="total-time">
            Total time: {props.total_time ? props.total_time : "--"}
          </li>
          <div className="update-button-container">
            <button className="update-button" onClick={updateOnClick}>
              Update
            </button>
          </div>
        </div>
        <li className="description">Description: {props.description}</li>
        <li className="complete-by-container">
          <TimeSelector complete_time={props.complete_time}></TimeSelector>
        </li>
      </ul>
    </div>
  );
};

ExpandedRoutine.propTypes = {
  routine_id: PropTypes.number.isRequired,
  description: PropTypes.string,
  complete_time: PropTypes.shape({
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

export default ExpandedRoutine;
