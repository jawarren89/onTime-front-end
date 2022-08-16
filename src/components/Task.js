import "../styles/Task.css";
import React from "react";
import PropTypes from "prop-types";

import TaskExpanded from "./TaskExpanded";

import { defaultTask } from "./Constants";
import { TimeToCivilian, hourMinuteConvert } from "./TimeConversions";

import chevron_right from "../assets/chevron-right.svg";
import chevron_down from "../assets/chevron-down.svg";

// The task component displays each task, with an optionally expanded
// component (called TaskExpanded) if the task is selected.

const Task = (props) => {
  const taskTime = hourMinuteConvert(props.time);

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
      props.setShowAddForm(false);
      props.setExpandedRow(0);
      props.setSelectedTask({
        task_id: props.task_id,
        routine_id: props.routine_id,
        title: props.title,
        time: props.time,
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
          className="task-chevron"
          onClick={expandRow}
        />
        <li className="task-title" onClick={expandRow}>
          {props.title}
        </li>
        {props.selectedRoutine.complete_time.hour ? (
          <li className="task-start">
            {civStartTime.hour}:{civStartTime.minute} {civStartTime.meridiem}
          </li>
        ) : (
          <li className="task-start" onClick={expandRow}>
            -- : -- --
          </li>
        )}
        <li className="task-time" onClick={expandRow}>
          {taskTime}
        </li>
      </ul>
      {isExpanded ? (
        <TaskExpanded
          task_id={props.task_id}
          routine_id={props.routine_id}
          time={props.time}
          selectedRoutine={props.selectedRoutine}
          setSelectedRoutine={props.setSelectedRoutine}
          selectedTask={props.selectedTask}
          setSelectedTask={props.setSelectedTask}
          updateTask={props.updateTask}
          deleteTask={props.deleteTask}
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
