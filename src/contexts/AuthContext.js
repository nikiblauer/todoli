import React from "react";

const AuthContext = React.createContext({
  authState: { token: null, isLoggedIn: false },
  setAuthState: () => {},
});

export { AuthContext };
