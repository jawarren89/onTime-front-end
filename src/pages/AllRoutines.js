import React from "react";
import PropTypes from "prop-types";
import RoutineList from "../components/RoutineList";

const AllRoutines = (props) => {
  return (
    <>
      <main className="allroutines">
        <h2>Welcome to Routines!</h2>
        <section>
          <RoutineList routines={props.routines}></RoutineList>
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
};

export default AllRoutines;
