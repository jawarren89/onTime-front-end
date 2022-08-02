import React from "react";
import PropTypes from "prop-types";

const Routine = (props) => {
  return (
    <div className="routine">
      <li className="title">{props.title}</li>
    </div>
  );
};

Routine.propTypes = {
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

export default Routine;
