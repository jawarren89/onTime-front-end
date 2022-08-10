import "../styles/Task.css";
import React from "react";
import PropTypes from "prop-types";

import TaskExpanded from "./TaskExpanded";

import trash from "../assets/trash-2.svg";
import chevron_right from "../assets/chevron-right.svg";
import chevron_down from "../assets/chevron-down.svg";

// The task component displays each task, with an optionally expanded
// component (called TaskExpanded) if the task is selected.

const Task = (props) => {
  const deleteOnClick = () => {
    props.deleteTask(props.task_id);
  };

  const expandRow = () => {
    if (props.expandedTask === props.task_id) {
      props.setExpandedRow(0);
      props.setSelectedTask({
        task_id: 0,
        routine_id: 0,
        title: "",
        start_time: { hour: 0, minute: 0 },
      });
    } else {
      props.setShowAddForm(false);
      props.setExpandedRow(props.task_id);
      props.setSelectedTask({
        task_id: props.task_id,
        routine_id: props.routine_id,
        title: props.title,
        start_time: props.start_time,
      });
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
            selectedTask={props.selectedTask}
            setSelectedTask={props.setSelectedTask}
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
  selectedTask: PropTypes.object.isRequired,
  setSelectedTask: PropTypes.func.isRequired,
  expandedRow: PropTypes.number.isRequired,
  setExpandedRow: PropTypes.func.isRequired,
  // showAddForm: PropTypes.bool.isRequired,
  setShowAddForm: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

export default Task;
