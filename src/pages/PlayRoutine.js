import "../styles/PlayRoutine.css";

import React from "react";
import PropTypes from "prop-types";

import ProgressTimer from "../components/ProgressTimer";

import play from "../assets/play.svg";
import PlayTaskList from "../components/PlayTaskList";

const PlayRoutine = (props) => {
  const startRoutine = () => {
    props.initiateRoutine(props.selectedRoutine.routine_id);
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
        <main className="playroutine-container">
          <h2 className="play-header">{props.selectedTask.title}!</h2>
          <p>You can do this, I believe in you.</p>
          <button className="play" onClick={startRoutine}>
            <img src={play} alt="play icon" />
          </button>
          <section>
            <div className="circle">
              <ProgressTimer percentage={85} colour={"teal"}></ProgressTimer>
            </div>
          </section>
          {/* <section> */}
          {/* <PlayTaskList tasks={props.completeTasks}></PlayTaskList>
            <PlayTaskList tasks={props.incompleteTasks}></PlayTaskList>
          </section> */}
        </main>
      </>
    );
  }
};

PlayRoutine.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  selectedTask: PropTypes.object.isRequired,
  selectedRoutine: PropTypes.object.isRequired,
  progressPercent: PropTypes.number.isRequired,
  completeTasks: PropTypes.array.isRequired,
  incompleteTasks: PropTypes.array.isRequired,
  initiateRoutine: PropTypes.func.isRequired,
  fetchInitiatedRoutine: PropTypes.func.isRequired,
};

export default PlayRoutine;
