import "../styles/PlayRoutine.css";

import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

import ProgressTimer from "../components/ProgressTimer";
import PlayTaskList from "../components/PlayTaskList";

import play from "../assets/play.svg";

const PlayRoutine = (props) => {
  const { routine_id } = useParams();

  const startRoutine = () => {
    props.initiateRoutine(props.selectedRoutine.routine_id);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => props.fetchOneRoutine(routine_id), []);
  // ---------------------------------------------------------------------- //

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
          <h2 className="play-header">{props.selectedRoutine.title}!</h2>
          <p>You can do this, I believe in you.</p>
          <button className="play" onClick={startRoutine}>
            <img src={play} alt="play icon" />
          </button>
          <section>
            <div className="circle">
              <ProgressTimer percentage={75} colour={"teal"}></ProgressTimer>
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
  fetchOneRoutine: PropTypes.func.isRequired,
};

export default PlayRoutine;
