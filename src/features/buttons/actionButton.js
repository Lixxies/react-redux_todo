import React from "react";
import "./buttons.css";

function ActionButton(props) {
  return (
    <div className="btnDiv">
      <button type="button" className="action" onClick={props.onClick}>
        {props.text}
      </button>
    </div>
  );
}

export default ActionButton;
