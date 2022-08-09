import "../styles/TaskExpanded.css";
import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";

import TimeSelector from "./TimeSelector";

// The TaskExpanded component holds additional data about each task,
// and allows the user to update the CompleteBy time using the TimeSelector
// component. The state of the TimeSelector component is managed here, as well
// as the form submission event.

const TaskExpanded = (props) => {
  const [taskForm, setTaskForm] = useState(props.time);

  const convertForSubmit = (form, task_id) => {
    if (form.meridiem === "PM") {
      const timeData = {
        task_id: task_id,
        complete_time: {
          hour: parseInt(form.hour) + 12,
          minute: parseInt(form.minute),
        },
      };
      return timeData;
    } else {
      const timeData = {
        task_id: task_id,
        complete_time: {
          hour: parseInt(form.hour),
          minute: parseInt(form.minute),
        },
      };
      return timeData;
    }
  };

  // const convertForSubmit = (form) => {
  //   if (form.complete_time.meridiem === "PM") {
  //     form.complete_time = {
  //       hour: parseInt(form.complete_time.hour) + 12,
  //       minute: parseInt(form.complete_time.minute),
  //     };
  //   } else {
  //     form.complete_time = {
  //       hour: parseInt(form.complete_time.hour),
  //       minute: parseInt(form.complete_time.minute),
  //     };
  //   }
  //   return form;
  // };

  //Convert back to military time before submitting.
  const handleSubmitTime = (event) => {
    event.preventDefault();
    const submitTime = convertForSubmit(taskForm, props.task_id);
    // const submitTime = convertForSubmit(timeForm);
    props.updateTask(props.task_id, submitTime);
    console.log(submitTime);
  };

  return (
    <div className="drop-down-container">
      <ul className="drop-down">
        <li className="time-selector-container">
          <div className="complete-by-text">Time:</div>
          <form className="complete-by-form" onSubmit={handleSubmitTime}>
            <TimeSelector
              timeForm={taskForm}
              setTimeForm={setTaskForm}
            ></TimeSelector>
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
  updateTask: PropTypes.func.isRequired,
};

export default TaskExpanded;
