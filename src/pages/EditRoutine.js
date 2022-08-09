import "../styles/EditRoutine.css";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

import NavMenu from "../components/NavMenu";
import NewRoutineForm from "../components/NewRoutineForm";

// The EditRoutine page is accessed when a user clicks on a routine to edit or
// when a user navigates to a specific edit route. As such, the routine fetched
// is based on the routineId in the browserURL.

const EditRoutine = (props) => {
  const [routineForm, setRoutineForm] = useState({});

  const { routine_id } = useParams();

  // const selectedRoutineCopy = JSON.parse(JSON.stringify(props.selectedRoutine));
  // setRoutineForm(selectedRoutineCopy);

  useEffect(() => props.fetchOneRoutine(routine_id), []);

  // useEffect(() => {
  //   let ignore = false;
  //   async function fetchData() {
  //     const result = await props.fetchOneRoutine(routine_id);
  //     if (!ignore) setRoutineForm(result.data);
  //   }
  //   fetchData();
  //   return () => {
  //     ignore = true;
  //   };
  // }, []);

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
  };

  return (
    <>
      <header className="navbar">
        <NavMenu
          pageTitle={props.pageTitle}
          viewNavbar={props.viewNavbar}
          toggleNavbar={props.toggleNavbar}
        ></NavMenu>
      </header>
      <main className="edit-routine-container">
        <h2>Edit Routine: {props.selectedRoutine.title}</h2>
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
                // disabled={
                //   routineForm.title.length < 1 ||
                //   routineForm.title.length > 40 ||
                //   routineForm.description.length > 110
                // }
              ></input>
            </div>
          </form>
        </section>
        <section>
          <h2>List your tasks here!</h2>
        </section>
      </main>
    </>
  );
};

EditRoutine.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  viewNavbar: PropTypes.bool.isRequired,
  toggleNavbar: PropTypes.func.isRequired,
  setSelectedRoutine: PropTypes.func.isRequired,
  selectedRoutine: PropTypes.object.isRequired,
  routineLoading: PropTypes.bool.isRequired,
  fetchOneRoutine: PropTypes.func.isRequired,
  updateRoutine: PropTypes.func.isRequired,
  addTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

export default EditRoutine;
