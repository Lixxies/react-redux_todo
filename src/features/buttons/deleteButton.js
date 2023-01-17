import React from "react";

function DeleteButton(props) {
  return (
    <div className="btnDiv">
      <button type="button" className="delete" onClick={props.onClick}></button>
    </div>
  );
}

export default DeleteButton;
