import NewRoutineForm from "../components/NewRoutineForm";
import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

import TimeToCivilian from "../components/TimeToCivilian";

// The EditRoutine page is accessed when a user clicks on a routine to edit or
// when a user navigates to a specific edit route. As such, the routine fetched
// is based on the routineId in the browserURL.

const EditRoutine = (props) => {
  const { routineId } = useParams();
  useEffect(() => props.fetchOneRoutine(routineId), [props, routineId]);

  const [routineForm, setRoutineForm] = useState(props.currentRoutine);

  const onFormChange = (event) => {
    const stateName = event.target.name;
    const inputValue = event.target.value;

    const newRoutineForm = { ...routineForm };
    newRoutineForm[stateName] = inputValue;

    setRoutineForm(newRoutineForm);
  };

  const handleEditRoutine = (event) => {
    event.preventDefault();
    props.updateRoutine(routineForm);
    setRoutineForm(routineForm);
  };

  const startCivTime = props.currentRoutine.total_time
    ? TimeToCivilian(props.currentRoutine.start_time)
    : ["--", "--", "--"];
  const completeCivTime = props.currentRoutine.complete_time
    ? TimeToCivilian(props.currentRoutine.complete_time)
    : ["--", "--", "--"];

  return (
    <>
      <main className="edit-routine-container">
        <h2>Edit Your Routine Here!</h2>
        <p>You can do this, I believe in you.</p>

        <section className="routineform-container">
          <form onSubmit={handleEditRoutine}>
            <NewRoutineForm
              routineForm={routineForm}
              setRoutineForm={setRoutineForm}
              // title={props.selectedRoutine.title}
              // description={props.selectedRoutine.desciption}
              onFormChange={onFormChange}
            ></NewRoutineForm>
            <div className="button-container">
              <input
                className="startButton"
                type="submit"
                value="Update Routine"
                // disabled={
                //   routineForm.title.length < 1 ||
                //   routineForm.title.length > 40 ||
                //   routineForm.description.length > 110
                // }
              ></input>
            </div>
          </form>
        </section>
      </main>
    </>
  );
};

EditRoutine.propTypes = {
  currentRoutine: PropTypes.object.isRequired,
  fetchOneRoutine: PropTypes.func.isRequired,
  updateRoutine: PropTypes.func.isRequired,
};

export default EditRoutine;
