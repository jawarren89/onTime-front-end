import React from "react";
import { useState } from "react";
import Task from "./Task.js";
import PropTypes from "prop-types";

// The TaskList component maps all fetched tasks associated with a task
// into individual task components.

const TaskList = (props) => {
  const [expandedTask, setExpandedTask] = useState(0);

  const taskComponents = props.tasks.map((task) => {
    return (
      <Task
        key={task.task_id}
        task_id={task.task_id}
        routine_id={task.routine_id}
        title={task.title}
        time={task.time}
        start_time={task.start_time}
        updateTask={props.updateTask}
        deleteTask={props.deleteTask}
        expandedTask={expandedTask}
        setExpandedTask={setExpandedTask}
      ></Task>
    );
  });

  return (
    <section>
      <ul>{taskComponents}</ul>
    </section>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      task_id: PropTypes.number.isRequired,
      routine_id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      time: PropTypes.number.isRequired,
      start_time: PropTypes.shape({
        hour: PropTypes.number,
        minute: PropTypes.number,
      }),
    })
  ),
  updateTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

export default TaskList;
