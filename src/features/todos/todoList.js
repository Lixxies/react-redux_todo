import React from "react";
import "./todoList.css";
import { useSelector } from "react-redux";

import TodoItem from "./todoItem";
import { selectFilteredTodoIds } from "./todosSlice";

function TodoList() {
  const todoIds = useSelector(selectFilteredTodoIds);
  const loadingStatus = useSelector((state) => state.todos.status);

  if (loadingStatus === "loading") {
    return (
      <div className="loaderOuter">
        <div className="loader"></div>;
      </div>
    );
  }

  const list = todoIds.map((id) => {
    return <TodoItem id={id} key={id} />;
  });

  return <div className="list">{list}</div>;
}

export default TodoList;
