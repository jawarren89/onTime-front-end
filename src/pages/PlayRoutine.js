import React from "react";
import PropTypes from "prop-types";

import PageHeader from "../components/PageHeader";
import ProgressTimer from "../components/ProgressTimer";

import play from "../assets/play.svg";

const PlayRoutine = (props) => {
  return (
    <>
      <PageHeader
        pageTitle={props.selectedRoutine.title}
        viewNavSystem={props.viewNavSystem}
      ></PageHeader>
      <main className="play-routine-container">
        <h2>Routine will play on this screen!</h2>
        <p>You can do this, I believe in you.</p>
        <button className="play">
          <img src={play} alt="play icon" />
        </button>
        <section>
          <ProgressTimer percentage={85} colour={"teal"}></ProgressTimer>
        </section>
      </main>
    </>
  );
};

PlayRoutine.propTypes = {
  // pageTitle: PropTypes.string.isRequired,
  // viewNavbar: PropTypes.bool.isRequired,
  // toggleNavbar: PropTypes.func.isRequired,
};

export default PlayRoutine;
