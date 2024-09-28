import React from "react";

const Star = ({ filled }) => {
  return (
    <span className="star">
      {filled ? (
        <i className="bx bxs-star" style={{ color: "gold" }}></i>
      ) : (
        <i className="bx bxs-star" style={{ color: "lightgray" }}></i>
      )}
    </span>
  );
};

export default Star;
