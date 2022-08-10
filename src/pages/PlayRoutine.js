import "../styles/PlayRoutine.css";

import React from "react";
import PropTypes from "prop-types";

import ProgressTimer from "../components/ProgressTimer";

import play from "../assets/play.svg";

const PlayRoutine = (props) => {
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
          <h2 className="play-header">Routine will play on this screen!</h2>
          <p>You can do this, I believe in you.</p>
          <button className="play">
            <img src={play} alt="play icon" />
          </button>
          <section>
            <div className="circle">
              <ProgressTimer percentage={85} colour={"teal"}></ProgressTimer>
            </div>
          </section>
        </main>
      </>
    );
  }
};

PlayRoutine.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  pageTitle: PropTypes.string.isRequired,
  selectedRoutine: PropTypes.object.isRequired,
};

export default PlayRoutine;
