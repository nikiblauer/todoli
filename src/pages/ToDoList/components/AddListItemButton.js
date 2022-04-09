import React, { useState } from "react";
import AddCircle from "../../../shared/ui_elements/AddCircle";
import "./AddListItemButton.css";

const AddListItemButton = (props) => {
  const [inputText, setInputText] = useState("");

  const inputTextHandler = (event) => {
    const text = event.target.value;
    setInputText(text);
  };

  const addItem = (event) => {
    event.preventDefault();

    props.onAddNewItem(inputText);
    setInputText("");
  };
  return (
    <li className="todolist-listitem">
      <form className="add-new-form" onSubmit={addItem}>
        <AddCircle size="small" />

        <input
          onChange={inputTextHandler}
          type="text"
          className="add_item_input"
          placeholder="Add new..."
          value={inputText}
        />
      </form>
    </li>
  );
};

export default AddListItemButton;
