import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import * as loadingData from "./constants/loading.json";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: loadingData.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export default function LoadingPage() {
  return (
    <>
      <Container>
        <FadeIn className="mt-5 pt-5">
          <Row className="mt-5 pt-5 mb-4">
            <Lottie options={defaultOptions} height={60} width={500} />
          </Row>
          <Row className="text-center">
            <Col>
              <h2>Loading...</h2>
            </Col>
          </Row>
        </FadeIn>
      </Container>
    </>
  );
}
