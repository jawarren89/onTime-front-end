import React from "react";
import PropTypes from "prop-types";

const DropdownItem = (props) => {
  return (
    <label>
      {/* {props.label} */}
      <select value={props.value} onChange={props.onChange}>
        {props.options.map((option) => (
          <option value={option}>{option}</option>
        ))}
      </select>
    </label>
  );
};

export default DropdownItem;
