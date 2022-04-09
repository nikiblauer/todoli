import React from "react";
import ListItem from "./ListItem";
import uuid from "react-uuid";

import "./List.css";
import AddListItemButton from "./AddListItemButton";

const List = (props) => {
  const listData = props.data;

  const renderList = () => {
    return listData.map((item, index) => {
      return (
        <ListItem key={uuid()} id={uuid()} onDeleteItem={props.onDeleteItem}>
          {item}
        </ListItem>
      );
    });
  };

  return (
    <ul className="form-group">
      {renderList()}
      <AddListItemButton onAddNewItem={props.onAddNewItem} />
    </ul>
  );
};

export default List;
