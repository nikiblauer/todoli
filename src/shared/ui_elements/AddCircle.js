import React from "react";

import "./AddCircle.css";

const AddButton = (props) => {
  return <div className={`circle plus ${props.size}`}></div>;
};

export default AddButton;
