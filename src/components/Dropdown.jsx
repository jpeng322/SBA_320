import React from "react";
import DropdownCategory from "./DropdownCategory";
const Dropdown = ({ filterValue, setFilterValue }) => {
  const categories = {
    target: [
      "abs",
      "quads",
      "lats",
      "calves",
      "pectorals",
      "glutes",
      "triceps",
      "adductors",
      "upper back",
    ],

    equipment: ["body weight", "band", "barbell"],

    "body part": [
      "shoulders",
      "back",
      "upper legs",
      "waist",
      "lower arms",
      "chest",
      "upper arms",
      "lower legs",
    ],
  };
  return (
    <div className="dropdown">
      {Object.entries(categories).map(([key, value]) => {
        return (
          <DropdownCategory
            key={key}
            name={key}
            subcategories={value}
            filterValue={filterValue}
            setFilterValue={setFilterValue}
          />
        );
      })}
    </div>
  );
};

export default Dropdown;
