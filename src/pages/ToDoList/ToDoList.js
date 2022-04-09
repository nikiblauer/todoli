import React, {
  useEffect,
  useState,
  useContext,
  useCallback,
  useRef,
} from "react";
import { useNavigate, useParams } from "react-router-dom";

import List from "./components/List";
import "./ToDoList.css";
import SmallButton from "../../shared/ui_elements/SmallButton";
import EditableHeader from "./components/EditableHeader";
import { AuthContext } from "../../contexts/AuthContext";
import { useHttpClient } from "../../shared/hooks/HttpHook";

import LoadingSpinner from "../../shared/ui_elements/LoadingSpinner";

const ToDoList = (props) => {
  const { authState, setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();
  const [listDeleted, setListDeleted] = useState(false);

  let params = useParams();
  const listId = params.listId;

  const [toDoList, setToDoList] = useState();
  const [isLoading, error, sendRequest, clearError] = useHttpClient();

  useEffect(() => {
    const fetchList = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/lists/${listId}`,
          "GET",
          {
            Authorization: `Bearer ${authState.token}`,
          }
        );

        setToDoList(responseData.list);
      } catch (err) {
        console.log(err);
      }
    };

    fetchList();
  }, [authState.token, sendRequest, listId]);

  const uploadChanges = useCallback(
    async (title, items) => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/lists/${listId}`,
          "PATCH",
          {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authState.token}`,
          },
          JSON.stringify({
            title,
            items,
          })
        );
      } catch (err) {
        console.log(err);
      }
    },
    [authState.token, listId, sendRequest]
  );

  const onChangeListNameHandler = (newListName) => {
    setToDoList((prev) => {
      uploadChanges(newListName, prev.items);
      return {
        id: prev.id,
        title: newListName,
        items: prev.items,
        creator: prev.creator,
      };
    });
  };

  const onAddNewHandler = (item) => {
    setToDoList((prev) => {
      const updatedItems = [...prev.items, item];

      uploadChanges(prev.title, updatedItems);

      return {
        id: prev.id,
        title: prev.title,
        items: updatedItems,
        creator: prev.creator,
      };
    });
  };

  const onDeleteHandler = (itemName) => {
    const updatedItems = toDoList.items.filter((i) => i !== itemName);

    uploadChanges(toDoList.title, updatedItems);

    setToDoList((prev) => {
      const updatedItems = prev.items.filter((i) => i !== itemName);

      return {
        id: prev.id,
        title: prev.title,
        items: updatedItems,
        creator: prev.creator,
      };
    });
  };

  const onDeleteListHandler = () => {
    const deleteList = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/lists/${listId}`,
          "DELETE",
          {
            Authorization: `Bearer ${authState.token}`,
          }
        );

        setListDeleted(true);
      } catch (err) {
        console.log(err);
      }
    };

    deleteList();
  };

  if (listDeleted) {
    navigate("/");
  }

  return (
    <div>
      {toDoList && !listDeleted ? (
        <>
          <EditableHeader onChangeListName={onChangeListNameHandler}>
            {toDoList.title}
          </EditableHeader>
          <List
            className="todolist-list"
            data={toDoList.items}
            onAddNewItem={onAddNewHandler}
            onDeleteItem={onDeleteHandler}
          />
          <SmallButton onClick={onDeleteListHandler}>Delete</SmallButton>
        </>
      ) : (
        <div className="loading-spinner">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};

export default ToDoList;
