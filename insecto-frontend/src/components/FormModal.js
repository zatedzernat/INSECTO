import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function FormModal(props) {
  return (
    <Modal
      size={props.size}
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
        <Modal.Body>
          <h6>{props.subTitle}</h6>
          {props.body}
        </Modal.Body>
        <h6 className="m-3 text-right">{props.subBody}</h6>
        <Modal.Footer>
          {props.close && (
            <Button style={{ backgroundColor: '#e3e6ef', borderStyle: "none", color: 'black'  }} onClick={props.onHide}>
              {props.close}
            </Button>
          )}
          {props.button && (
            <Button  style={{ backgroundColor: '#4b7dff', borderStyle: "none"  }} type="submit">
              {props.button}
            </Button>
          )}
          {props.custom}
        </Modal.Footer>
      </form>
    </Modal>
  );
}
