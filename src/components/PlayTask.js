import "../styles/PlayTask.css";
import React from "react";
import PropTypes from "prop-types";

import { hourMinuteConvert, TimeToCivilian } from "./TimeConversions";

import chevron_right from "../assets/chevron-right.svg";

// The PlayTask component displays each task in a "complete" or
// "incomplete" PlayTask List on the PlayRoutine page.

const PlayTask = (props) => {
  const taskTime = hourMinuteConvert(props.time);
  const civStartTime = TimeToCivilian(props.start_time);

  return (
    <ul className="playtask">
      <img
        src={chevron_right}
        alt="right chevron"
        className="playtask-chevron"
      />
      <li className="playtask-title">{props.title}</li>
      <li className="playtask-start">
        {civStartTime.hour}:{civStartTime.minute} {civStartTime.meridiem}
      </li>
      <li className="playtask-time">{taskTime}</li>
    </ul>
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
