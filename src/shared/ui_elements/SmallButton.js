import React from "react";

import "./SmallButton.css";

const SmallButton = (props) => {
  return (
    <div className="center">
      <button onClick={props.onClick} className="small-btn">
        {props.children}
      </button>
    </div>
  );
};

export default SmallButton;
