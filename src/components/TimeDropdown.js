import React from "react";
import PropTypes from "prop-types";

const TimeDropdown = (props) => {
  return (
    <label htmlFor={props.label}>
      <select
        id={props.id}
        className="dropdown-item"
        value={props.value}
        onChange={props.onChange}
      >
        {props.options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
};

TimeDropdown.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default TimeDropdown;
