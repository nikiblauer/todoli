import React from "react";
import { Link } from "react-router-dom";

function NavbarHeading(props) {
  return (
    // <h1><Link to="/">TYMER</Link></h1>
    <h1>
      <Link to="/">{props.children}</Link>
    </h1>
  );
}

export default NavbarHeading;
