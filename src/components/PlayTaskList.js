import React from "react";
import PlayTask from "./PlayTask.js";
import PropTypes from "prop-types";

// The PlayList component maps all tasks associated with a currently
// playing routine into individual task components. Tasks might be
// complete or incomplete.

const PlayTaskList = (props) => {
  const taskComponents = props.tasks.map((task) => {
    return (
      <PlayTask
        key={task.task_id}
        task_id={task.task_id}
        routine_id={task.routine_id}
        title={task.title}
        time={task.time}
        start_time={task.start_time}
      ></PlayTask>
    );
  });

  return (
    <section>
      <ul>{taskComponents}</ul>
    </section>
  );
};

PlayTaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      task_id: PropTypes.number.isRequired,
      routine_id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      time: PropTypes.number.isRequired,
      start_time: PropTypes.object,
    })
  ),
};

export default PlayTaskList;
