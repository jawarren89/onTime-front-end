import "../styles/Task.css";
import React from "react";
import PropTypes from "prop-types";

import TaskExpanded from "./TaskExpanded";

import trash from "../assets/trash-2.svg";
import chevron_right from "../assets/chevron-right.svg";
import chevron_down from "../assets/chevron-down.svg";

// The task component displays each task, with an optionally expanded
// component (called TaskExpanded) if the task is selected. Displayed
// times from the Task object are converted and displayed in civilian times,
// and are passed as such to the option TaskEpanded component.

const Task = (props) => {
  const deleteOnClick = () => {
    props.deleteTask(props.task_id);
  };

  const expandRow = () => {
    if (props.expandedTask === props.task_id) {
      props.setExpandedRow(0);
    } else {
      props.setExpandedRow(props.task_id);
    }
  };

  const isActive = props.expandedRow === props.task_id;

  return (
    <div className="task-item-container">
      <ul className={isActive ? "task expanded" : "task"}>
        <img
          src={isActive ? chevron_down : chevron_right}
          alt="expand/collapse icon"
          className="chevron"
          onClick={expandRow}
        />
        <li className="task-title" onClick={expandRow}>
          {props.title}
        </li>
        <div className="button-container">
          <button className="delete" onClick={deleteOnClick}>
            <img src={trash} alt="trash icon" />
          </button>
        </div>
        <div className="times-container" onClick={expandRow}>
          <li className="total-time">Total Time:</li>
          <li className="time-start">Start:</li>
        </div>
      </ul>
      <div className="expanded-task-container">
        {isActive ? (
          <TaskExpanded
            task_id={props.task_id}
            time={props.time}
            selectedRoutine={props.selectedRoutine}
            setSelectedRoutine={props.setSelectedRoutine}
            updateTask={props.updateTask}
          ></TaskExpanded>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

Task.propTypes = {
  task_id: PropTypes.number.isRequired,
  routine_id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
  start_time: PropTypes.shape({
    hour: PropTypes.number,
    minute: PropTypes.number,
  }),
  selectedRoutine: PropTypes.object.isRequired,
  setSelectedRoutine: PropTypes.func.isRequired,
  expandedRow: PropTypes.number.isRequired,
  setExpandedRow: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

export default Task;
