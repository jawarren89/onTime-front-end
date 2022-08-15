import "../styles/TaskExpanded.css";
import React from "react";
import PropTypes from "prop-types";

import TaskForm from "./TaskForm";

import { defaultTask } from "./Constants";

import trash from "../assets/trash-2.svg";

// The TaskExpanded component holds additional data about each task,
// and allows the user to update the total time for a task.

const TaskExpanded = (props) => {
  const deleteOnClick = () => {
    props.deleteTask(props.task_id);
  };

  const submitTaskUpdate = (event) => {
    event.preventDefault();
    const newTask = JSON.parse(JSON.stringify(props.selectedTask));
    newTask.time = parseInt(newTask.time);
    props.updateTask(props.task_id, newTask);
    props.setSelectedTask(defaultTask);
    console.log(newTask);
  };

  return (
    <ul className="dropdown-task">
      <form className="update-task-form" onSubmit={submitTaskUpdate}>
        <TaskForm
          selectedTask={props.selectedTask}
          setSelectedTask={props.setSelectedTask}
        ></TaskForm>
        <input
          className="submit-task-button btn"
          type="submit"
          value="Update"
          disabled={
            props.selectedTask.title.length < 1 ||
            props.selectedTask.title.length > 50 ||
            props.selectedTask.time < 1
          }
        ></input>
      </form>
      <div className="delete-container">
        <button className="delete iconbtn" onClick={deleteOnClick}>
          <img src={trash} alt="trash icon" />
        </button>
      </div>
    </ul>
  );
};

TaskExpanded.propTypes = {
  task_id: PropTypes.number.isRequired,
  time: PropTypes.number.isRequired,
  selectedRoutine: PropTypes.object.isRequired,
  setSelectedRoutine: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

export default TaskExpanded;
