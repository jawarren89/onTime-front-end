import "../styles/RoutineForm.css";
import React from "react";
import PropTypes from "prop-types";

// The TaskForm component is used to add or edit a task related
// to a specific routine on the EditRoutine page. The values are
// managed with selectedTask state.

const TaskForm = (props) => {
  return (
    <React.Fragment>
      <div className="input-container">
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          name="title"
          placeholder="title required"
          value={props.selectedTask.title}
          onChange={props.onChange}
          className="input-title"
        />
      </div>
      {/* <div className="input-container">
        <label htmlFor="hour">Hours: </label>
        <input
          type="number"
          name="hour"
          placeholder="0"
          value={props.selectedTask.time}
          onChange={props.onChange}
          className="input-title"
        />
      </div> */}
      <div>
        <label htmlFor="minute">Minutes: </label>
        <input
          type="number"
          min="1"
          name="minute"
          placeholder="time required"
          value={props.selectedTask.time}
          onChange={props.onChange}
          className="input-title"
        />
      </div>
    </React.Fragment>
  );
};

TaskForm.propTypes = {
  selectedTask: PropTypes.object.isRequired,
  setSelectedTask: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TaskForm;
