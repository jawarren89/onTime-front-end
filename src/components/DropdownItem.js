import React from "react";
import PropTypes from "prop-types";

const DropdownItem = (props) => {
  // if (props.label === "minutes")

  return (
    <select
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
  );
};

DropdownItem.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DropdownItem;
