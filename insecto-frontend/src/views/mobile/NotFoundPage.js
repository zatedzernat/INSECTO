import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import * as notFoundData from "./notFound.json";
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
  // * props จะถูกส่งมาตอนที่เรียก component NoResultFound ไปใข้เลย ตอนส่งก็ส่งมาแบบ <NoResultFound error={อะไรก็ว่าไป} message={อะไรก็ว่าไป} />
  const { error, message } = props;

  return (
    <>
      <Container>
        <FadeIn className="mt-5 pt-3">
          <Row className="mb-3">
            <Lottie options={defaultOptions} height={300} width={300} />
          </Row>
          <Row className="text-center">
            <Col>
              <h5>Oops! No result found</h5>
            </Col>
          </Row>
        </FadeIn>
      </Container>
    </>
  );
}
