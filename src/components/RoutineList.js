import React from "react";
import { useState } from "react";
import Routine from "./Routine.js";
import PropTypes from "prop-types";

// The RoutineList component maps all fetched routine data in App.js
// (passed as props.routines) into individual routine components. It
// also manages the state of which routine is currently set to expanded.
// Only one routine can be expanded at a time.

const RoutineList = (props) => {
  const [expandedRow, setExpandedRow] = useState(0);

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
        // setSelectedRoutine={props.setSelectedRoutine}
        updateRoutine={props.updateRoutine}
        deleteRoutine={props.deleteRoutine}
        expandedRow={expandedRow}
        setExpandedRow={setExpandedRow}
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
      complete_time: PropTypes.object.isRequired,
      start_time: PropTypes.object.isRequired,
      total_time: PropTypes.number,
      tasks: PropTypes.array.isRequired,
    })
  ),
  // setSelectedRoutine: PropTypes.func.isRequired,
  updateRoutine: PropTypes.func.isRequired,
  deleteRoutine: PropTypes.func.isRequired,
};

export default RoutineList;
