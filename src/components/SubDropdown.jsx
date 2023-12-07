import React from "react";

const SubDropdown = ({ type, name, style, setFilterValue, filterValue }) => {
  return (
    <div
      className={`subdropdown ${style}`}
      onClick={() => setFilterValue([type, name])}
    >
      {name}
    </div>
  );
};

export default SubDropdown;
