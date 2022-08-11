import "../styles/TaskExpanded.css";
import React from "react";
import PropTypes from "prop-types";

import TaskForm from "./TaskForm";

import { defaultTask } from "./Constants";

// The TaskExpanded component holds additional data about each task,
// and allows the user to update the total time for a task.

const TaskExpanded = (props) => {
  const submitTaskUpdate = (event) => {
    event.preventDefault();
    const newTask = JSON.parse(JSON.stringify(props.selectedTask));
    newTask.time = parseInt(newTask.time);
    props.updateTask(props.task_id, newTask);
    props.setSelectedTask(defaultTask);
    console.log(newTask);
  };

  return (
    <div className="drop-down-container">
      <ul className="drop-down">
        <li className="time-selector-container">
          <div className="complete-by-text">Total Time:</div>
          <form className="complete-by-form" onSubmit={submitTaskUpdate}>
            <TaskForm
              selectedTask={props.selectedTask}
              setSelectedTask={props.setSelectedTask}
            ></TaskForm>
            <input
              className="update-button"
              type="submit"
              value="Update"
              disabled={
                props.selectedTask.title.length < 1 ||
                props.selectedTask.title.length > 50 ||
                props.selectedTask.time < 1
              }
            ></input>
          </form>
        </li>
      </ul>
    </div>
  );
};

TaskExpanded.propTypes = {
  task_id: PropTypes.number.isRequired,
  time: PropTypes.number.isRequired,
  selectedRoutine: PropTypes.object.isRequired,
  setSelectedRoutine: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
};

export default TaskExpanded;
