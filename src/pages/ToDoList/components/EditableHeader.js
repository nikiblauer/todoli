import React, { useState } from "react";
import "./EditableHeader.css";

const EditableHeader = (props) => {
  const [headerText, setHeaderText] = useState(props.children);

  const handleHeaderText = (event) => {
    const text = event.target.value;

    setHeaderText(text);
  };

  const onLeaveFocus = (event) => {
    const text = event.target.value;
    props.onChangeListName(text);
  };

  return (
    <div className="center">
      <input
        type="text"
        spellCheck="false"
        className="editable-header"
        value={headerText}
        onChange={handleHeaderText}
        onBlur={onLeaveFocus}
      />
    </div>
  );
};

export default EditableHeader;
