import "../styles/AllRoutines.css";
import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";

import RoutineList from "../components/RoutineList";
import NewRoutineForm from "../components/NewRoutineForm";

import add from "../assets/plus-circle.svg";

// The AllRoutines page component is the page that loads as a "home" page.
// It shows all the routines stored in the database, and allows them to
// play, edit, or delete a routine. The page allows a user to add a new
// routine to the list (tasks are added separately by editing the routine).

const AllRoutines = (props) => {
  const showFormOnClick = () => {
    props.toggleAddRoutineForm();
  };

  return (
    <>
      <main className="routines-container">
        <section
          className={
            props.showAddRoutine ? "routine-form expanded" : "routine-form"
          }
        >
          {/* <NewRoutineForm></NewRoutineForm> */}
        </section>
        <RoutineList
          routines={props.routines}
          selectedRoutine={props.selectedRoutine}
          setSelectedRoutine={props.setSelectedRoutine}
          updateRoutine={props.updateRoutine}
          deleteRoutine={props.deleteRoutine}
        ></RoutineList>
        <div>
          <button className="right-button" onClick={showFormOnClick}>
            <img src={add} alt="add icon" />
          </button>
        </div>
      </main>
    </>
  );
};

AllRoutines.propTypes = {
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
  selectedRoutine: PropTypes.object.isRequired,
  setSelectedRoutine: PropTypes.func.isRequired,
  updateRoutine: PropTypes.func.isRequired,
  deleteRoutine: PropTypes.func.isRequired,
  showAddRoutine: PropTypes.bool.isRequired,
};

export default AllRoutines;
