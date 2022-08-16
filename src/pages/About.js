import "../styles/About.css";
import React, { useEffect } from "react";

const About = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <main className="aboutpage-container">
        <section className="about-section">
          <h2 className="about-header">About onTime</h2>
          <p className="about-content">
            onTime is a time visualization tool and routine planner for daily
            tasks and events. It allows users to back-plan departures and prep
            time needed to complete a customizable list of tasks, aka a
            "routine", where individual task start times are pre-determined
            based on the routine's desired completion time.
          </p>
          <p className="about-content">
            Originally conceptualized as a time management tool for
            neuro-divergent children and adults, onTime can be used by anyone
            looking to stay organized—or help others stay organized—and on track
            in their day. If you or a loved one struggle with getting ready to
            leave the house on time, identifying or remembering tasks and task
            order, staying focused on the task at hand, or managing activity
            transitions, onTime can help!
          </p>
          <ul className="features-list">
            Current features allow a user to:
            <li>Create new routines and save them for later use</li>
            {/* <li>
              Keep a list of favorited tasks for quick access in creating
              routines
            </li> */}
            <li>
              Easily modify allotted time for each task and instantly update
              total routine time
            </li>
            <li>
              Add a "complete by" time to see when to start each task in the
              routine
            </li>
            <li>
              "Play" a routine to step through each task with the time
              visualizer tool
            </li>
            <li>See how much time is left on each task</li>
            <li>View task time represented in analog form</li>
            {/* <li>
              If a task is completed early, "save" time and skip to the next
              task
            </li> */}
          </ul>
          <p className="about-content">
            onTime's back-end is written in Python, utilizing Flask and a
            PostgreSQL database. The front-end is built with React.
          </p>
        </section>
        <section className="authors-section">
          <h2 className="about-header">Who are we?</h2>
          <p className="about-content">
            onTime was developed by Julie Warren and Joan Kovacs as a capstone
            project for Cohort 17 of Ada Developers Academy.
          </p>
        </section>
      </main>
    </>
  );
};

export default About;
