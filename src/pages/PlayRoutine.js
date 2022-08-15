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
    window.scrollTo(0, 0);
  }, []);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <h2 className="playroutine-header">{props.selectedRoutine.title}</h2>
          <section>
            {props.isPlaying ? (
              <h3 className="currently-playing">
                Now: {props.selectedTask.title}
              </h3>
            ) : (
              <h3 className="currently-playing">Press play to start</h3>
            )}
            {props.isPlaying ? (
              <div className="circle-container">
                <ProgressTimer
                  percentage={props.progressPercent}
                  colour={"teal"}
                ></ProgressTimer>
              </div>
            ) : (
              <div className="play-container">
                <button className="big-play" onClick={startRoutine}>
                  <img src={play} alt="play icon" />
                </button>
              </div>
            )}
          </section>
          {/* <div className="controls">
            <button className="skip iconbtn">
              <img src={skip} alt="skip icon" />
              <span className="skip-text">Next Task</span>
            </button>
          </div> */}
          <h2 className="tasklist-header">Tasks</h2>
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
            <section className="alltasks-container">
              <PlayTaskList tasks={props.tasks}></PlayTaskList>
            </section>
          )}
          <div className="saved-time">Saved Time:</div>
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
