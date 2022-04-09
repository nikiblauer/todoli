import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useHttpClient } from "../../shared/hooks/HttpHook";
import SmallButton from "../../shared/ui_elements/SmallButton";
import LoadingSpinner from "../../shared/ui_elements/LoadingSpinner";
import List from "./components/List";
import "./ListsOverview.css";

const ListsOverview = (props) => {
  const { authState, setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();

  const [lists, setLists] = useState(null);
  const [isLoading, error, sendRequest, clearError] = useHttpClient();

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/lists`,
          "GET",
          {
            Authorization: `Bearer ${authState.token}`,
          }
        );

        setLists(responseData.lists);
      } catch (err) {
        console.log(err);
      }
    };

    fetchLists();
  }, [authState.token, sendRequest]);

  const handleLogoutButton = () => {
    setAuthState({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    <div>
      <h1 className="center lists_overview-heading">
        <b>ToDoLi</b>sts
      </h1>

      {/* <List data={DUMMY_LISTS} /> */}
      {!isLoading && lists ? (
        <>
          <List data={lists} token={authState.token} />
          <SmallButton onClick={handleLogoutButton}>Log out</SmallButton>
        </>
      ) : (
        <div className="loading-spinner">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};

export default ListsOverview;
