import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./header.css";

import { saveNewTodo } from "../todos/todosSlice";

function Header() {
  const dispatch = useDispatch();
  const [todo, setTodo] = useState("");
  const [status, setStatus] = useState("idle");

  const handleChange = (event) => {
    setTodo(event.target.value);
  };

  const handleKeyDown = async (event) => {
    let trimmedTodo = todo.trim();
    if (event.key === "Enter" && trimmedTodo) {
      setStatus("loading");
      await dispatch(saveNewTodo(trimmedTodo));
      setTodo("");
      setStatus("idle");
    }
  };

  let isLoading = status == "loading";
  let placeholder = isLoading ? "" : "What needs to be done?";
  let loader = isLoading ? <div className="loader"></div> : null;

  return (
    <div className="inputOuter">
      <label htmlFor="input"></label>
      <input
        type="text"
        id="input"
        name="input"
        placeholder={placeholder}
        autoComplete="off"
        value={todo}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {loader}
    </div>
  );
}

export default Header;
