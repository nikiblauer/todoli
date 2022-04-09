import React from "react";

import "./ListItem.css";

const ListItem = (props) => {
  return (
    <div className="lists_overview-listitem" onClick={props.onClick}>
      <h2 className="lists_overview-listitem-header center">
        {props.children}
      </h2>
    </div>
  );
};

export default ListItem;
