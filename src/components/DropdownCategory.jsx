import React, { useState } from "react";
import SubDropdown from "./SubDropdown";
const DropdownCategory = ({
  name,
  subcategories,
  filterValue,
  setFilterValue,
}) => {
  const [showSubDropdown, setShowSubDropdown] = useState(false);
  return (
    <div className="dropdown-category">
      <div
        onClick={() => {
          setShowSubDropdown(!showSubDropdown);
        }}
      >
        {" "}
        {name}
      </div>

      {showSubDropdown && (
        <div
          className={`subdropdown-container dropdown_menu-6 ${
            showSubDropdown ? "subdropdown_animation" : ""
          }`}
        >
          {subcategories.map((subcategory) => {
            return (
              <SubDropdown
                type={name}
                name={subcategory}
                style={showSubDropdown ? "slide-down" : ""}
                setFilterValue={setFilterValue}
                filterValue={filterValue}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DropdownCategory;
