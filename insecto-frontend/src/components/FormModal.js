import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function FormModal(props) {
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      animation={false} //! error when set to true wait for fix https://github.com/react-bootstrap/react-bootstrap/issues/5075
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <form method={props.method} onSubmit={props.onSubmit}>
        <Modal.Body>{props.body}</Modal.Body>
        <Modal.Footer>
          {props.close && <Button variant="secondary" onClick={props.onHide}>
            {props.close}
          </Button>}
          {props.button && <Button type="submit" variant="primary">
            {props.button}
          </Button>}
        </Modal.Footer>
      </form>
    </Modal>
  );
}
