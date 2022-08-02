import React from "react";
import PropTypes from "prop-types";
import RoutineList from "../components/RoutineList";
import NavBar from "../components/NavBar";

const AllRoutines = (props) => {
  return (
    <>
      <nav>
        <NavBar></NavBar>
      </nav>
      <main>
        <h2>Welcome to Routines!</h2>
        <p>You can do this, I believe in you.</p>
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
