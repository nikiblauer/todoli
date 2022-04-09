import React from "react";

import "./AuthInput.css";

const AuthInput = (props) => {
  return (
    <div className="auth-input-container">
      <label htmlFor={props.name}>{props.label}</label>
      <input
        type={props.name}
        id={props.name}
        placeholder={props.placeholder}
        {...props.register(props.name, { required: true })}
      />
      {props.error && <p className="error-msg">*{props.errorMsg}</p>}
    </div>
  );
};

export default AuthInput;
