import React from "react";
import PropTypes from "prop-types";

// The TimeDropdown component renders a single time dropdown selector. It is
// used in the TimeSelector component, and will render whichever dropdown
// options are mapped into it from there.

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
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TimeDropdown;
