import React from "react";
import Routine from "./Routine.js";
import PropTypes from "prop-types";

const RoutineList = (props) => {
  const routineComponents = props.routines.map((routine) => {
    return (
      <Routine
        key={routine.routine_id}
        routine_id={routine.routine_id}
        title={routine.title}
        description={routine.description}
        destination={routine.destination}
        complete_time={routine.complete_time}
        start_time={routine.start_time}
        total_time={routine.total_time}
        tasks={routine.tasks}
      ></Routine>
    );
  });

  return (
    <section>
      <ul>{routineComponents}</ul>
    </section>
  );
};

RoutineList.propTypes = {
  routines: PropTypes.arrayOf(
    PropTypes.shape({
      routine_id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      destination: PropTypes.string,
      complete_time: PropTypes.string,
      start_time: PropTypes.string,
      total_time: PropTypes.number,
      tasks: PropTypes.array.isRequired,
    })
  ),
};

export default RoutineList;
