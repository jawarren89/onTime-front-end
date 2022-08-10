import "../styles/TaskExpanded.css";
import React from "react";
import PropTypes from "prop-types";

// The TaskExpanded component holds additional data about each task,
// and allows the user to update the total time for a task.

const TaskExpanded = (props) => {
  const submitTimeUpdate = (event) => {
    event.preventDefault();
    props.updateRoutine(props.routine_id, props.selectedRoutine);
    console.log("PUT: total task time updated");
    console.log(props.selectedRoutine);
  };

  return (
    <div className="drop-down-container">
      <ul className="drop-down">
        <li className="time-selector-container">
          <div className="complete-by-text">Total Time:</div>
          <form className="complete-by-form" onSubmit={submitTimeUpdate}>
            {/* <TaskForm
              selectedTask={props.selectedTask}
              onFormChange={onAddTaskChange}
            ></TaskForm> */}
            <input
              className="update-button"
              type="submit"
              value="Update"
            ></input>
          </form>
        </li>
      </ul>
    </div>
  );
};

TaskExpanded.propTypes = {
  task_id: PropTypes.number.isRequired,
  time: PropTypes.number,
  selectedRoutine: PropTypes.object.isRequired,
  setSelectedRoutine: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
};

export default TaskExpanded;
