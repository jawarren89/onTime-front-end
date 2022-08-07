import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

import NewRoutineForm from "../components/NewRoutineForm";

const defaultRoutineForm = {
  title: "",
  description: "",
  complete_by: "--",
};

const EditRoutine = (props) => {
  const { routine_id } = useParams();

  const [routineForm, setRoutineForm] = useState(defaultRoutineForm);

  const onFormChange = (event) => {
    const stateName = event.target.name;
    const inputValue = event.target.value;

    const newRoutineForm = { ...routineForm };
    newRoutineForm[stateName] = inputValue;

    setRoutineForm(newRoutineForm);
  };

  const handleAddRoutine = (event) => {
    event.preventDefault();
    props.addRoutine(routineForm);
    setRoutineForm(defaultRoutineForm);
    // set form back to hidden
  };

  return (
    <>
      <main className="edit-routine-container">
        <h2>Edit Your Routine Here!</h2>
        <p>You can do this, I believe in you.</p>

        <section className="boardform-container">
          <form onSubmit={handleAddRoutine}>
            <NewRoutineForm
              onFormChange={onFormChange}
              routineForm={routineForm}
              setRoutineForm={setRoutineForm}
              complete={props.selectedRoutine.complete_by}
            ></NewRoutineForm>
            <div className="button-container">
              <input
                className="startButton"
                type="submit"
                value="Update Routine"
                disabled={
                  routineForm.title.length < 1 ||
                  routineForm.title.length > 40 ||
                  routineForm.description.length > 110
                }
              ></input>
            </div>
          </form>
        </section>
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
