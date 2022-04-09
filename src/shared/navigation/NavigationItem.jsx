import React from "react";
import { Link } from "react-router-dom";

function NavigationItem(props) {
  return (
    <li>
      <Link to={props.to}>{props.children}</Link>
    </li>
  );
}

export default NavigationItem;
