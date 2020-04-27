import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function MyModal(props) {
  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      animation={false} //! error when set to true wait for fix https://github.com/react-bootstrap/react-bootstrap/issues/5075
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.body}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={props.onSubmit}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
