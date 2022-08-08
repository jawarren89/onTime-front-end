import "../styles/EditRoutine.css";
import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

import NavMenu from "../components/NavMenu";
import NewRoutineForm from "../components/NewRoutineForm";

// The EditRoutine page is accessed when a user clicks on a routine to edit or
// when a user navigates to a specific edit route. As such, the routine fetched
// is based on the routineId in the browserURL.

const EditRoutine = (props) => {
  const { routine_id } = useParams();
  useEffect(() => props.fetchOneRoutine(routine_id), []);

  const onFormChange = (event) => {
    const stateName = event.target.name;
    const inputValue = event.target.value;

    const newRoutineForm = { ...props.selectedRoutine };
    newRoutineForm[stateName] = inputValue;

    props.setSelectedRoutine(newRoutineForm);
  };

  const handleEditRoutine = (event) => {
    event.preventDefault();
    props.updateRoutine(props.selectedRoutine);
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
              selectedRoutine={props.selectedRoutine}
              setSelectedRoutine={props.setSelectedRoutine}
              onFormChange={onFormChange}
            ></NewRoutineForm>
            <div className="button-container">
              <input
                className="startButton"
                type="submit"
                value="Update Routine"
                // disabled={
                //   props.selectedRoutine.title.length < 1 ||
                //   props.selectedRoutine.title.length > 40 ||
                //   props.selectedRoutine.description.length > 110
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
  fetchOneRoutine: PropTypes.func.isRequired,
  updateRoutine: PropTypes.func.isRequired,
  addTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  selectedRoutine: PropTypes.object.isRequired,
  setSelectedRoutine: PropTypes.func.isRequired,
};

export default EditRoutine;
