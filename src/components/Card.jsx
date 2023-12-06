import React from "react";

const Card = ({ equipment, gif, name, target, bodyPart }) => {
  return (
    <div className="card">
      <h2>{name}</h2>
      <img src={gif} alt="" />
      <div>Body Part: {bodyPart} </div>
      <div>Target: {target}</div>
      <div>Equipment Required: {equipment}</div>
    </div>
  );
};

export default Card;
