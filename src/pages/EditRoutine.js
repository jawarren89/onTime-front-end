import NewRoutineForm from "../components/NewRoutineForm";
import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

// import TimeToCivilian from "../components/TimeToCivilian";

// The EditRoutine page is accessed when a user clicks on a routine to edit or
// when a user navigates to a specific edit route. As such, the routine fetched
// is based on the routineId in the browserURL.

const EditRoutine = (props) => {
  const { routine_id } = useParams();
  useEffect(() => props.fetchOneRoutine(routine_id), []);

  const [routineForm, setRoutineForm] = useState({
    title: "banana",
    description: "jk",
  });

  // const [timeForm, setTimeForm] = useState({
  //   hours: props.complete_time[0],
  //   minutes: props.complete_time[1],
  //   meridiem: props.complete_time[2],
  // });

  // useEffect(() => setRoutineForm(props.currentRoutine), []);

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

  return (
    <>
      <main className="edit-routine-container">
        <h2>Edit {props.currentRoutine.title}</h2>
        <p>You can do this, I believe in you.</p>
        <section className="routineform-container">
          <form onSubmit={handleEditRoutine}>
            <NewRoutineForm
              routineForm={routineForm}
              setRoutineForm={setRoutineForm}
              onFormChange={onFormChange}
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
  currentRoutine: PropTypes.object.isRequired,
  fetchOneRoutine: PropTypes.func.isRequired,
  updateRoutine: PropTypes.func.isRequired,
};

export default EditRoutine;
