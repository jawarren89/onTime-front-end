import React from "react";
import Task from "./Task.js";
import PropTypes from "prop-types";

// The TaskList component maps all fetched tasks associated with a
// routine nto individual task components.

const TaskList = (props) => {
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
        selectedRoutine={props.selectedRoutine}
        setSelectedRoutine={props.setSelectedRoutine}
        selectedTask={props.selectedTask}
        setSelectedTask={props.setSelectedTask}
        expandedRow={props.expandedRow}
        setExpandedRow={props.setExpandedRow}
        setShowAddForm={props.setShowAddForm}
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
  selectedRoutine: PropTypes.object.isRequired,
  setSelectedRoutine: PropTypes.func.isRequired,
  selectedTask: PropTypes.object.isRequired,
  setSelectedTask: PropTypes.func.isRequired,
  expandedRow: PropTypes.number.isRequired,
  setExpandedRow: PropTypes.func.isRequired,
  setShowAddForm: PropTypes.func.isRequired,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      task_id: PropTypes.number.isRequired,
      routine_id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      time: PropTypes.number.isRequired,
      start_time: PropTypes.object,
    })
  ),
  updateTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

export default TaskList;
