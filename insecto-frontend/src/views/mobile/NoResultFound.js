import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import * as notFoundData from "./constants/notFound.json"
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: notFoundData.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export default function NoResultFound(props) {
  return (
    <>
      <Container>
        <FadeIn className="mt-5 pt-3">
          <Row className="mb-3">
            <Lottie options={defaultOptions} height={300} width={300} />
          </Row>
          <Row className="text-center">
            <Col>
              <h5>Oops! {props.message ? props.message : "Page Not Found"}</h5>
            </Col>
          </Row>
        </FadeIn>
      </Container>
    </>
  );
}
