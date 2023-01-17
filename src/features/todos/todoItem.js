import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import DeleteButton from "../buttons/deleteButton";
import {
  colorSelected,
  selectTodoById,
  todoToggled,
  todoDeleted
} from "./todosSlice";

function Item(props) {
  return (
    <div className="todoItem">
      <div className="checkbox">
        <label htmlFor="check"></label>
        <input
          type="checkbox"
          id="check"
          name="check"
          checked={props.completed}
          onChange={props.onChange}
        />
      </div>
      <div className="todo">{props.text}</div>
      <div className="wrapper">
        <div className="selectColor">
          <label htmlFor="select"></label>
          <select
            name="select"
            id="select"
            className={props.color}
            onChange={props.onChangeColor}
          >
            <option style={{ display: "none" }} value=""></option>
            <option value="green" className="green">
              Green
            </option>
            <option value="blue" className="blue">
              Blue
            </option>
            <option value="orange" className="orange">
              Orange
            </option>
            <option value="purple" className="purple">
              Purple
            </option>
            <option value="red" className="red">
              Red
            </option>
          </select>
        </div>
        <DeleteButton onClick={props.onClick} />
      </div>
    </div>
  );
}

function TodoItem(props) {
  const dispatch = useDispatch();

  const todo = useSelector((state) => selectTodoById(state, props.id));

  const [color, setColor] = useState("");

  const handleSelect = (event) => {
    setColor(event.target.value);
    dispatch(colorSelected(todo.id, event.target.value));
  };

  const handleChange = function () {
    return dispatch(todoToggled(todo.id));
  };

  const handleClick = function () {
    return dispatch(todoDeleted(todo.id));
  };

  return (
    <Item
      completed={todo.completed}
      onChange={handleChange}
      text={todo.text}
      color={color}
      onChangeColor={handleSelect}
      onClick={handleClick}
    />
  );
}

export default TodoItem;
