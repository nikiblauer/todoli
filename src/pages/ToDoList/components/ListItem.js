import React, { useEffect, useState, useRef } from "react";

import "./ListItem.css";
import "./Checkbox.css";

const ListItem = (props) => {
  const [isChecked, setIsChecked] = useState(false);
  const timerRef = useRef(null);

  const handleChecked = (event) => {
    setIsChecked((prev) => {
      return !prev;
    });

    timerRef.current = setTimeout(() => {
      props.onDeleteItem(props.children);
    }, 500);
  };

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <li className="todolist-listitem" /*onClick={handleChecked}*/>
      <input
        id={props.id}
        type="checkbox"
        checked={isChecked}
        onChange={handleChecked}
      />
      <label htmlFor={props.id}>{props.children}</label>
    </li>
  );
};

export default ListItem;
