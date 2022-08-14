import "../styles/Task.css";
import React from "react";
import PropTypes from "prop-types";

import TaskExpanded from "./TaskExpanded";

import { defaultTask } from "./Constants";
import { TimeToCivilian } from "./TimeConversions";

import trash from "../assets/trash-2.svg";
import chevron_right from "../assets/chevron-right.svg";
import chevron_down from "../assets/chevron-down.svg";

// The task component displays each task, with an optionally expanded
// component (called TaskExpanded) if the task is selected.

const Task = (props) => {
  const deleteOnClick = () => {
    props.deleteTask(props.task_id);
  };

  // select task only once to expand dropdown
  // const expandRow = () => {
  //   if (props.expandedRow === props.task_id) {
  //     props.setExpandedRow(0);
  //     props.setSelectedTask(defaultTask);
  //   } else {
  //     props.setShowAddForm(false);
  //     props.setExpandedRow(props.task_id);
  //     props.setSelectedTask({
  //       task_id: props.task_id,
  //       routine_id: props.routine_id,
  //       title: props.title,
  //       start_time: props.start_time,
  //     });
  //   }
  // };

  // select task and highlight it before allowing dropdown
  const expandRow = () => {
    if (props.expandedRow !== props.task_id) {
      props.setSelectedTask(defaultTask);
      props.setShowAddForm(false);
      props.setExpandedRow(0);
      props.setSelectedTask({
        task_id: props.task_id,
        routine_id: props.routine_id,
        title: props.title,
        start_time: props.start_time,
      });
    }
    if (props.selectedTask.task_id === props.task_id) {
      props.setExpandedRow(props.task_id);
    }
    if (props.expandedRow === props.task_id) {
      props.setExpandedRow(0);
      props.setSelectedTask(defaultTask);
    }
  };

  const isSelected = props.selectedTask.task_id === props.task_id;
  const isExpanded = props.expandedRow === props.task_id;

  const civStartTime = TimeToCivilian(props.start_time);

  // ---------------------------------------------------------------------- //

  return (
    <React.Fragment>
      <ul className={isSelected ? "task selected" : "task"}>
        <img
          src={isExpanded ? chevron_down : chevron_right}
          alt="expand/collapse icon"
          className="chevron"
          onClick={expandRow}
        />
        <li className="task-title" onClick={expandRow}>
          {props.title} ({props.time} minutes)
        </li>
        <div className="button-container">
          <button className="delete iconbtn" onClick={deleteOnClick}>
            <img src={trash} alt="trash icon" />
          </button>
        </div>
        <div className="times-container" onClick={expandRow}>
          {/* <li className="total-time">Total Time: {props.time}</li> */}
          <li className="time-start">
            Start: {civStartTime.hour}:{civStartTime.minute}{" "}
            {civStartTime.meridiem}
          </li>
        </div>
      </ul>
      {isExpanded ? (
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
    </React.Fragment>
  );
};

Task.propTypes = {
  task_id: PropTypes.number.isRequired,
  routine_id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
  start_time: PropTypes.object,
  selectedRoutine: PropTypes.object.isRequired,
  setSelectedRoutine: PropTypes.func.isRequired,
  selectedTask: PropTypes.object.isRequired,
  setSelectedTask: PropTypes.func.isRequired,
  expandedRow: PropTypes.number.isRequired,
  setExpandedRow: PropTypes.func.isRequired,
  setShowAddForm: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

export default Task;
