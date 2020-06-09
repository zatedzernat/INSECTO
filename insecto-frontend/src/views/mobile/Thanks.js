import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

export default function ThanksPage() {
  return (
      <Container>
        <Row>
        <Col></Col>
          <Col className="mt-2">
            <Card className="text-center p-3 mt-5" style={{ width: '18rem' }}>
            <Row>
            <Col></Col>
            <Col className="mt-3">
                <img src="/images/send.png" width="200" />
            </Col>
            <Col></Col>
            </Row>
              <Card.Body>
                <h2>Thank you!</h2>
                <Card.Text>ปัญหาของคุณถูกส่งแล้ว</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col></Col>
        </Row>
      </Container>
  );
}
