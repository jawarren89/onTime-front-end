import "../styles/AllRoutines.css";
import React from "react";
import PropTypes from "prop-types";

import RoutineList from "../components/RoutineList";
import RoutineForm from "../components/RoutineForm";

import { defaultRoutine } from "../components/Constants";

// The AllRoutines page component is the page that loads as a "home" page.
// It shows all the routines stored in the database, and allows users to
// play, edit, or delete a routine. The page allows a user to add a new
// routine to the list (tasks are added separately by editing the routine).

const AllRoutines = (props) => {
  const showAddRoutineOnClick = () => {
    props.setExpandedRow(0);
    props.setSelectedRoutine(defaultRoutine);
    props.setShowAddForm(!props.showAddForm);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const submitNewRoutine = (event) => {
    event.preventDefault();
    const newRoutine = JSON.parse(JSON.stringify(props.selectedRoutine));
    delete newRoutine.routine_id;
    props.addRoutine(newRoutine);
    props.setSelectedRoutine(defaultRoutine);
    console.log(newRoutine);
  };

  // ---------------------------------------------------------------------- //

  if (props.isLoading) {
    return (
      <main className="loading-container">
        <h1 className="loading">Loading...</h1>
      </main>
    );
  } else {
    return (
      <main className="allroutines-container">
        <section>
          <button className="showform-button" onClick={showAddRoutineOnClick}>
            +
          </button>
          {props.showAddForm ? (
            <form className="addroutine-form" onSubmit={submitNewRoutine}>
              <RoutineForm
                selectedRoutine={props.selectedRoutine}
                setSelectedRoutine={props.setSelectedRoutine}
              ></RoutineForm>
              <input
                className="submit-routine-button btn"
                type="submit"
                value="Create Routine"
                disabled={
                  props.selectedRoutine.title.length < 1 ||
                  props.selectedRoutine.title.length > 40 ||
                  props.selectedRoutine.description.length > 110
                }
              ></input>
            </form>
          ) : (
            ""
          )}
        </section>
        <RoutineList
          routines={props.routines}
          selectedRoutine={props.selectedRoutine}
          setSelectedRoutine={props.setSelectedRoutine}
          expandedRow={props.expandedRow}
          setExpandedRow={props.setExpandedRow}
          setShowAddForm={props.setShowAddForm}
          updateRoutine={props.updateRoutine}
          deleteRoutine={props.deleteRoutine}
        ></RoutineList>
      </main>
    );
  }
};

AllRoutines.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  selectedRoutine: PropTypes.object.isRequired,
  setSelectedRoutine: PropTypes.func.isRequired,
  expandedRow: PropTypes.number.isRequired,
  setExpandedRow: PropTypes.func.isRequired,
  showAddForm: PropTypes.bool.isRequired,
  setShowAddForm: PropTypes.func.isRequired,
  routines: PropTypes.arrayOf(
    PropTypes.shape({
      routine_id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      destination: PropTypes.string,
      complete_time: PropTypes.object,
      start_time: PropTypes.object,
      total_time: PropTypes.number,
      tasks: PropTypes.array.isRequired,
    })
  ),
  addRoutine: PropTypes.func.isRequired,
  updateRoutine: PropTypes.func.isRequired,
  deleteRoutine: PropTypes.func.isRequired,
};

export default AllRoutines;
