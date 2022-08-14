import "../styles/PlayTask.css";
import React from "react";
import PropTypes from "prop-types";

import { hourMinuteConvert } from "./TimeConversions";

import chevron_right from "../assets/chevron-right.svg";

// The PlayTask component displays each task in a "complete" or
// "incomplete" PlayTask List on the PlayRoutine page.

const PlayTask = (props) => {
  const taskTime = hourMinuteConvert(props.time);

  return (
    <div className="playtask-container">
      <ul className="playtask">
        <img src={chevron_right} alt="right chevron" className="chevron" />
        <li className="task-title">
          {props.title} | {taskTime}
        </li>
        <div className="times-container">
          <li className="time-start">Start:</li>
        </div>
      </ul>
    </div>
  );
};

PlayTask.propTypes = {
  task_id: PropTypes.number.isRequired,
  routine_id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
  start_time: PropTypes.object.isRequired,
};

export default PlayTask;
