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
        // routine_id={task.routine_id}
        title={task.title}
        time={task.time}
        // start_time={task.start_time}
        // selectedRoutine={props.selectedRoutine}
        // setSelectedRoutine={props.setSelectedRoutine}
        // selectedTask={props.selectedTask}
        // setSelectedTask={props.setSelectedTask}
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
  // selectedRoutine: PropTypes.object.isRequired,
  // setSelectedRoutine: PropTypes.func.isRequired,
  // selectedTask: PropTypes.object.isRequired,
  // setSelectedTask: PropTypes.func.isRequired,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      task_id: PropTypes.number.isRequired,
      // routine_id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      time: PropTypes.number.isRequired,
      // start_time: PropTypes.shape({
      //   hour: PropTypes.number,
      //   minute: PropTypes.number,
      // }),
    })
  ),
};

export default PlayTaskList;
