import "../styles/AllRoutines.css";
import React from "react";
import PropTypes from "prop-types";
import RoutineList from "../components/RoutineList";

const AllRoutines = (props) => {
  return (
    <>
      <main className="allroutines">
        <h2 className="page-header">Welcome to Routines!</h2>
        <section className="routines-container">
          <RoutineList
            routines={props.routines}
            deleteRoutineCallback={props.deleteRoutineCallback}
          ></RoutineList>
        </section>
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
      complete_time: PropTypes.string,
      start_time: PropTypes.string,
      total_time: PropTypes.number,
      tasks: PropTypes.array.isRequired,
    })
  ),
  deleteRoutineCallback: PropTypes.func.isRequired,
};

export default AllRoutines;
