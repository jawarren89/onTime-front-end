import React from "react";
import PropTypes from "prop-types";

const DropdownItem = (props) => {
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

DropdownItem.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DropdownItem;
