import React, { useState } from "react";
import BurgerIcon from "./BurgerIcon";

function MobileMenu(props) {
  let [collapsed, setCollapsed] = useState(true);

  function toggle() {
    setCollapsed((prev) => {
      return !prev;
    });
  }

  return (
    <div
      id="hamburger-icon"
      className={collapsed ? "" : "open"}
      onClick={toggle}
    >
      <BurgerIcon />
      <ul className="mobile-menu">{props.children}</ul>
    </div>
  );
}

export default MobileMenu;
