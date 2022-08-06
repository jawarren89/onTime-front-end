import "../styles/AllRoutines.css";
import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import RoutineList from "../components/RoutineList";

import add from "../assets/plus-circle.svg";
import NewRoutineForm from "../components/NewRoutineForm";

const AllRoutines = (props) => {
  // const [showRoutineForm, setShowRoutineForm] = useState(false);

  // const showFormOnClick = () => {
  //   setShowRoutineForm(!showRoutineForm);
  // };

  return (
    <>
      <main className="routines-container">
        {/* <div className="add-routine">
          <button className="add-button" onClick={showFormOnClick}>
            <img src={add} alt="add icon" />
          </button>
        </div> */}
        {/* <section
          className={showRoutineForm ? "routine-form expanded" : "routine-form"}
        >
          {showRoutineForm ? <NewRoutineForm></NewRoutineForm> : ""}
        </section> */}
        <RoutineList
          routines={props.routines}
          selectedRoutine={props.selectedRoutine}
          setSelectedRoutine={props.setSelectedRoutine}
          updateRoutine={props.updateRoutine}
          deleteRoutine={props.deleteRoutine}
        ></RoutineList>
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
      tasks: PropTypes.array.isRequired,
    })
  ),
  selectedRoutine: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
  }),
  setSelectedRoutine: PropTypes.func.isRequired,
  updateRoutine: PropTypes.func.isRequired,
  deleteRoutine: PropTypes.func.isRequired,
};

export default AllRoutines;
