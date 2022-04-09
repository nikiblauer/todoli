import React, { useContext } from "react";
import "./LogoutButton.css";

import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function LogoutButton(props) {
  const { authState, setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = () => {
    setAuthState({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    <li>
      <button onClick={handleClick} className="logout-button">
        LOG OUT
      </button>
    </li>
  );
}

export default LogoutButton;
