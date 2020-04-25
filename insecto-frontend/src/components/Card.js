import React from "react";

export default function Card(props) {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">{props.title}</h3>

        <div className="card-tools">
          {/* Buttons, labels, and many other things can be placed here! */}
          {/* Here is a label for example */}
          <span className="badge">
            {props.badge}
          </span>
        </div>
        {/* /.card-tools */}
      </div>
      {/* /.card-header */}
      <div className="card-body ">{props.body}</div>
      {/* /.card-body */}
      <div className="card-footer">{props.footer}</div>
      {/* /.card-footer */}
    </div>
    // {/* /.card */}
  );
}
