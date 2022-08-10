import "../styles/AllRoutines.css";
import React from "react";
import PropTypes from "prop-types";

import RoutineList from "../components/RoutineList";
import RoutineForm from "../components/RoutineForm";

import add from "../assets/plus-circle.svg";

// The AllRoutines page component is the page that loads as a "home" page.
// It shows all the routines stored in the database, and allows users to
// play, edit, or delete a routine. The page allows a user to add a new
// routine to the list (tasks are added separately by editing the routine).

const AllRoutines = (props) => {
  const showAddRoutineOnClick = () => {
    props.setExpandedRow(0);
    // props.setSelectedRoutine({
    //   routine_id: 0,
    //   title: "",
    //   description: "",
    //   destination: "",
    //   complete_time: { hour: 0, minute: 0 },
    //   start_time: { hour: 0, minute: 0 },
    //   total_time: 0,
    //   tasks: [],
    // });
    props.setShowAddForm(!props.showAddForm);
  };

  const onAddRoutineChange = (event) => {
    const newRoutineForm = { ...props.newRoutine };
    newRoutineForm[event.target.name] = event.target.value;
    props.setNewRoutine(newRoutineForm);
  };

  const submitNewRoutine = (event) => {
    event.preventDefault();
    props.addRoutine(props.newRoutine);
    props.setNewRoutine({
      title: "",
      description: "",
      complete_time: { hour: 0, minute: 0 },
    });
    console.log("POST: new routine added");
    console.log(props.newRoutine);
  };

  if (props.isLoading) {
    return (
      <main className="loading-container">
        <h1 className="loading">Loading...</h1>
      </main>
    );
  } else {
    return (
      <>
        <main className="allroutines-container">
          <section>
            <div>
              <button className="add-button" onClick={showAddRoutineOnClick}>
                <img src={add} alt="add icon" />
              </button>
            </div>
            {props.showAddForm ? (
              <form
                className="routine-form expanded"
                onSubmit={submitNewRoutine}
              >
                <RoutineForm
                  selectedRoutine={props.newRoutine}
                  setSelectedRoutine={props.setNewRoutine}
                  onFormChange={onAddRoutineChange}
                ></RoutineForm>
                <input
                  className="add-button"
                  type="submit"
                  value="Create Routine"
                  disabled={
                    props.newRoutine.title.length < 1 ||
                    props.newRoutine.title.length > 40 ||
                    props.newRoutine.description.length > 110
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
      </>
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
  newRoutine: PropTypes.object.isRequired,
  setNewRoutine: PropTypes.func.isRequired,
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
