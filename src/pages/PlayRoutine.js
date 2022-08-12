import "../styles/PlayRoutine.css";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

import ProgressTimer from "../components/ProgressTimer";
import PlayTaskList from "../components/PlayTaskList";

import play from "../assets/play.svg";
import skip from "../assets/skip-forward.svg";

const PlayRoutine = (props) => {
  const { routine_id } = useParams();

  const startRoutine = () => {
    props.initiateRoutine(props.selectedRoutine.routine_id);
    props.setIsPlaying(true);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => props.fetchOneRoutine(routine_id), []);

  useEffect(() => {
    if (props.isPlaying) {
      const intervalTime = props.requestInterval;
      let interval = setInterval(
        () => props.fetchInitiatedRoutine(props.selectedRoutine.routine_id),
        { intervalTime }
      );
      return () => clearInterval(interval);
    } else {
    }
  }, [props.isPlaying]);

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
          {props.isPlaying ? (
            <h2 className="play-header">Now: {props.selectedTask.title}</h2>
          ) : (
            <h2>Press play to start routine</h2>
          )}
          <p>You can do this, I believe in you.</p>
          <section>
            {props.isPlaying ? (
              <div className="circle">
                <ProgressTimer
                  percentage={props.progressPercent}
                  colour={"teal"}
                ></ProgressTimer>
              </div>
            ) : (
              <button onClick={startRoutine}>
                <img src={play} alt="play icon" />
              </button>
            )}
          </section>
          <div className="controls">
            <button>
              <img src={skip} alt="skip icon" />
              <span>Next Task</span>
            </button>
          </div>

          <h2 className="task-section">List your tasks here!</h2>

          {props.isPlaying ? (
            <section>
              <div className="incomplete-container">
                <PlayTaskList tasks={props.incompleteTasks}></PlayTaskList>
              </div>
              <div className="complete-container">
                <h3 className="complete">Complete</h3>
                <PlayTaskList tasks={props.completeTasks}></PlayTaskList>
              </div>
            </section>
          ) : (
            <section className="incomplete-container">
              <PlayTaskList tasks={props.tasks}></PlayTaskList>
            </section>
          )}

          <div>Saved Time:</div>
        </main>
      </>
    );
  }
};

PlayRoutine.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  setIsPlaying: PropTypes.func.isRequired,
  requestInterval: PropTypes.number.isRequired,
  progressPercent: PropTypes.number.isRequired,
  selectedTask: PropTypes.object.isRequired,
  selectedRoutine: PropTypes.object.isRequired,
  tasks: PropTypes.array.isRequired,
  completeTasks: PropTypes.array.isRequired,
  incompleteTasks: PropTypes.array.isRequired,
  initiateRoutine: PropTypes.func.isRequired,
  fetchInitiatedRoutine: PropTypes.func.isRequired,
  fetchOneRoutine: PropTypes.func.isRequired,
};

export default PlayRoutine;
