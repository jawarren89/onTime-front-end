import React from "react";
import { useParams } from "react-router-dom";
// import PropTypes from "prop-types";

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

export default EditRoutine;
