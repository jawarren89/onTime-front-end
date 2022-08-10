import "../styles/RoutineForm.css";
import React from "react";
import PropTypes from "prop-types";

// The TaskForm component is used to add or edit a task to a specific
// routine on the EditRoutine page. The values are managed with
// selectedTask state in App.js.

const TaskForm = (props) => {
  return (
    <React.Fragment>
      <div className="input-container">
        <label htmlFor="hour">hours: </label>
        <input
          type="text"
          name="hour"
          placeholder="0"
          value={props.selectedTask.time}
          onChange={props.onFormChange}
          className="input-title"
        />
      </div>
      <div>
        <label htmlFor="minute">minutes: </label>
        <input
          type="text"
          name="minute"
          placeholder="0"
          value={props.selectedTask.time}
          onChange={props.onFormChange}
        />
      </div>
    </React.Fragment>
  );
};

TaskForm.propTypes = {
  selectedTask: PropTypes.object.isRequired,
  onFormChange: PropTypes.func.isRequired,
};

export default TaskForm;
