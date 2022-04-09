import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import ListItem from "./ListItem";

import "./List.css";
import AddButton from "../../../shared/ui_elements/AddCircle";
import { useHttpClient } from "../../../shared/hooks/HttpHook";

const List = (props) => {
  const navigate = useNavigate();
  const [isLoading, error, sendRequest, clearError] = useHttpClient();
  const [newList, setNewList] = useState(null);

  const renderList = () => {
    const list = props.data;

    return list.map((item) => {
      return (
        <Link
          key={item.id}
          to={`/list/${item.id}`}
          style={{ textDecoration: "none" }}
        >
          <ListItem key={item.id}>{item.title}</ListItem>
        </Link>
      );
    });
  };

  const onAddNewListHandler = () => {
    const createList = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/lists`,
          "POST",
          {
            "Content-Type": "application/json",
            Authorization: `Bearer ${props.token}`,
          },
          JSON.stringify({
            title: "Neue Liste",
          })
        );

        setNewList(responseData.createdList);
      } catch (err) {
        console.log(err);
      }
    };

    createList();
  };

  if (!isLoading && newList) {
    navigate(`/list/${newList.id}`);
  }

  return (
    <div className="todolists-list-layout">
      {renderList()}
      {/* <Link to="/newlist"> */}
      <ListItem onClick={onAddNewListHandler}>
        <AddButton size="big" />
      </ListItem>
      {/* </Link> */}
    </div>
  );
};

export default List;
