import "../styles/ExpandedRoutine.css";
import React from "react";
import PropTypes from "prop-types";

const ExpandedRoutine = (props) => {
  const total_tasks = props.tasks.length;

  const updateOnClick = () => {
    return console.log("updated");
  };

  return (
    <div className="drop-down-container">
      <ul className="drop-down">
        <li className="total-time">Total time: {props.total_time}</li>
        <li className="total-tasks">Tasks: {total_tasks} </li>
        <li className="description">Description: {props.description}</li>
        <div className="complete-by">
          <li>Complete by: (insert selectors)</li>
        </div>
        <div className="update-button-container">
          <button className="update-button" onClick={updateOnClick}>
            Update Time
          </button>
        </div>
      </ul>
    </div>
  );
};

ExpandedRoutine.propTypes = {
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

export default ExpandedRoutine;
