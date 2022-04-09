import React from "react";
import "./Navbar.css";
import NavbarHeading from "./NavbarHeading";
import Menu from "./Menu";
import MobileMenu from "./MobileMenu";
import NavigationItem from "./NavigationItem";

import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import LogoutButton from "./LogoutButton";

function Navbar(props) {
  const { authState, setAuthState } = useContext(AuthContext);

  let navItems;
  if (authState.isLoggedIn) {
    navItems = [
      ,// <NavigationItem key="nav1" to="/">
      //   HOME
      // </NavigationItem>,
      // <NavigationItem key="nav2" to="/newlist">
      //   NEW LIST
      // </NavigationItem>,
    ];
  } else {
    navItems = [
      // <NavigationItem key="nav1" to="/">
      //   HOME
      // </NavigationItem>,
    ];
  }

  return (
    <header>
      <NavbarHeading>ToDoLi</NavbarHeading>
      {authState.isLoggedIn && (
        <>
          <Menu>
            <LogoutButton key="logout-nav" />
          </Menu>
          <MobileMenu>
            <LogoutButton key="logout-nav" />
          </MobileMenu>
        </>
      )}
    </header>
  );
}

export default Navbar;
