import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./footer.css";

import ActionButton from "../buttons/actionButton";
import {
  selectTodos,
  allCompleted,
  completedCleared
} from "../todos/todosSlice";
import {
  statusFilters,
  statusFilterChanged,
  colorFilterChanged
} from "../filters/filtersSlice";

function RemainingTodos(props) {
  let suffix = props.count === 1 ? "" : "s";
  let output = `${props.count} todo${suffix} left`;
  return <div>{output}</div>;
}

function StatusFilters(props) {
  const keys = Object.keys(statusFilters);

  return keys.map((key) => {
    const newStatus = key.toLowerCase();

    const handleCLick = () => {
      return props.onCLick(newStatus);
    };

    let className = "status";

    if (props.status === key.toLowerCase()) {
      className = "status selected";
    }

    return (
      <div key={keys.indexOf(key)} className={className} onClick={handleCLick}>
        {key}
      </div>
    );
  });
}

function ColorCheckboxes(props) {
  const colors = ["green", "blue", "orange", "purple", "red"];

  return colors.map((color) => {
    let colorCap = color[0].toUpperCase() + color.slice(1);

    const checked = props.colors.includes(color);

    const handleChange = () => {
      const changeType = checked ? "removed" : "added";
      console.log(props.onChange());
      props.onChange(color, changeType);
    };

    return (
      <div className="colorFlInner" key={colors.indexOf(color)}>
        <label htmlFor="checkCl"></label>
        <input
          type="checkbox"
          id="checkCl"
          name="checkCl"
          onChange={handleChange}
        />
        <div id={color} className="colorBox"></div>
        <div>{colorCap}</div>
      </div>
    );
  });
}

function Footer() {
  const status = useSelector((state) => state.filters.status);

  const colors = useSelector((state) => state.filters.colors);

  const todos = useSelector(selectTodos);

  const dispatch = useDispatch();

  const activeTodos = todos.filter((todo) => !todo.completed).length;

  const handleClickStatus = (status) => {
    dispatch(statusFilterChanged(status));
  };

  const handleClickMarkCompleted = function () {
    dispatch(allCompleted());
  };

  const handleClickClear = function () {
    dispatch(completedCleared());
  };

  const handleColorChange = function (color, changeType) {
    dispatch(colorFilterChanged(color, changeType));
  };

  return (
    <div className="outer">
      <div className="actions">
        <p>Actions</p>
        <ActionButton
          text="Mark all completed"
          onClick={handleClickMarkCompleted}
        />
        <ActionButton text="Clear completed" onClick={handleClickClear} />
      </div>
      <div className="remaining">
        <p>Remaining Todos</p>
        <RemainingTodos count={activeTodos} />
      </div>
      <div className="filterSt">
        <p>Filter by Status</p>
        <StatusFilters status={status} onCLick={handleClickStatus} />
      </div>
      <div className="filterCl">
        <p>Filter by Color</p>
        <ColorCheckboxes colors={colors} onChange={handleColorChange} />
      </div>
    </div>
  );
}

export default Footer;
