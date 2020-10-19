import React from "react";

export default function FormDateInput(props) {
  return (
    <form method={props.method} onSubmit={props.onSubmit}>
      {props.body}
    </form>
  );
}
