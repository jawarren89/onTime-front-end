import React from "react";
// import PropTypes from "prop-types";

import ProgressTimer from "../components/ProgressTimer";

const PlayRoutine = () => {
  return (
    <>
      <main className="play-routine-container">
        <h2>Routine will play on this screen!</h2>
        <p>You can do this, I believe in you.</p>
        <section>
          <ProgressTimer percentage={85} colour={"teal"}></ProgressTimer>
        </section>
      </main>
    </>
  );
};

export default PlayRoutine;
