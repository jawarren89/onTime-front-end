import React from "react";
import PropTypes from "prop-types";

import NavMenu from "../components/NavMenu";
import ProgressTimer from "../components/ProgressTimer";

const PlayRoutine = (props) => {
  return (
    <>
      <header className="navbar">
        <NavMenu
          pageTitle={props.pageTitle}
          viewNavbar={props.viewNavbar}
          toggleNavbar={props.toggleNavbar}
        ></NavMenu>
      </header>
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

PlayRoutine.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  viewNavbar: PropTypes.bool.isRequired,
  toggleNavbar: PropTypes.func.isRequired,
};

export default PlayRoutine;
