import React from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

const EditRoutine = () => {
  const { routine_id } = useParams();

  return (
    <>
      <main className="edit-routine-container">
        <h2>Edit Your Routine Here!</h2>
        <p>You can do this, I believe in you.</p>
      </main>
    </>
  );
};

EditRoutine.propTypes = {
  selectedRoutine: PropTypes.shape({
    routine_id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    destination: PropTypes.string,
    complete_time: PropTypes.shape({
      hour: PropTypes.number,
      minute: PropTypes.number,
      second: PropTypes.number,
      day: PropTypes.number,
      month: PropTypes.number,
      year: PropTypes.number,
    }),
    start_time: PropTypes.shape({
      hour: PropTypes.number,
      minute: PropTypes.number,
      second: PropTypes.number,
      day: PropTypes.number,
      month: PropTypes.number,
      year: PropTypes.number,
    }),
    total_time: PropTypes.number,
    tasks: PropTypes.array,
  }),
  updateRoutine: PropTypes.func.isRequired,
};

export default EditRoutine;
