import ListsOverview from "./pages/ListsOverview/ListsOverview";
import Auth from "./pages/Auth/Auth";
import ToDoList from "./pages/ToDoList/ToDoList";
import RenderApp from "./RenderApp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import { AuthContext } from "./contexts/AuthContext";
import React, { useReducer } from "react";

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("auth-token", action.token);
      return { ...state, token: action.token, isLoggedIn: true };

    case "LOGOUT":
      localStorage.removeItem("auth-token");
      return { ...state, token: null, isLoggedIn: false };

    default:
      return state;
  }
};

function App() {
  const [authState, dispatch] = useReducer(authReducer, {
    token: localStorage.getItem("auth-token"),
    isLoggedIn: !!localStorage.getItem("auth-token"),
  });

  const authValue = { authState, setAuthState: dispatch };

  let routes;

  if (authState.isLoggedIn) {
    routes = (
      <Routes>
        <Route path="/" element={<RenderApp />}>
          <Route index element={<ListsOverview />} />
          <Route path="list/:listId" element={<ToDoList />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<RenderApp />}>
          <Route index element={<Auth />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    );
  }

  return (
    <AuthContext.Provider value={authValue}>
      <div className="App">
        <BrowserRouter>{routes}</BrowserRouter>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
