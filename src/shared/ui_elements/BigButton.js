import React from "react";

import "./BigButton.css";

const BigButton = (props) => {
  return (
    <div className="">
      <button
        onClick={props.onClick}
        className={`big-btn ${props.color} ${props.background}`}
      >
        {props.children}
      </button>
    </div>
  );
};

export default BigButton;
