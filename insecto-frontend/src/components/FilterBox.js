import React from "react";
import { Button, InputGroup, FormControl } from "react-bootstrap";

export default function FilterBox({ filterText, onFilter, onClear }) {
  return (
    <InputGroup className="col-sm-3">
      <FormControl
        type="text"
        className="form-control"
        name="room_name"
        placeholder="Search"
        aria-label="Search Input"
        value={filterText}
        onChange={onFilter}
      />
      <InputGroup.Append>
        <Button variant="outline-secondary" type="button" onClick={onClear}>
          x
        </Button>
      </InputGroup.Append>
    </InputGroup>
  );
}
