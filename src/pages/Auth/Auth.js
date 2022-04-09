import React from "react";
import { useForm } from "react-hook-form";

import "./Auth.css";
import AuthInput from "./components/AuthInput";
import BigButton from "../../shared/ui_elements/BigButton";

import { useContext, useRef } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useHttpClient } from "../../shared/hooks/HttpHook";

const Auth = (props) => {
  const { authState, setAuthState } = useContext(AuthContext);
  const formRef = useRef(null);
  const [isLoading, error, sendRequest, clearError] = useHttpClient();
  let authUrl = process.env.REACT_APP_BACKEND_URL + "/users/";

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const responseData = await sendRequest(
        authUrl,
        "POST",
        { "Content-Type": "application/json" },
        JSON.stringify({
          email: data.email,
          password: data.password,
        })
      );

      setAuthState({ type: "LOGIN", token: responseData.token });
    } catch (err) {
      console.log(err);
    }
  };

  const onRegisterHandler = () => {
    authUrl += "signup";

    handleSubmit(onSubmit)();
  };

  const onLoginHandler = () => {
    authUrl += "login";

    handleSubmit(onSubmit)();
  };

  return (
    <div>
      <h1 className="auth-heading center">Login</h1>
      <form ref={formRef} id="auth-form" onSubmit={handleSubmit((data) => {})}>
        <AuthInput
          name="email"
          label="Email:"
          placeholder="user@email.com"
          register={register}
          error={errors.email}
          errorMsg="Email required."
        />
        <AuthInput
          name="password"
          label="Password:"
          placeholder="Password"
          register={register}
          error={errors.password}
          errorMsg="Password required."
        />
        {error && <p className="center error-hint">*{error}*</p>}
        <div className="auth-button-layout">
          <BigButton
            onClick={onLoginHandler}
            color="color-yellow"
            background="background-white"
          >
            Login
          </BigButton>
          <BigButton
            onClick={onRegisterHandler}
            color="color-white"
            background="background-yellow"
          >
            Register
          </BigButton>
        </div>
      </form>
    </div>
  );
};

export default Auth;
