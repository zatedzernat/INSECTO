import React /*, { useEffect }*/ from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
// import { useHistory } from "react-router-dom";

export default function ThanksPage(props) {
  // const history = useHistory();
  // useEffect(() => {
  //   setTimeout(() => {
  //     history.replace(`/sendproblem/${props.location.state.code}`);
  //   }, 5000);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <Container>
      <Row>
        <Col></Col>
        <Col className="mt-2">
          <Card className="text-center p-3 mt-5" style={{ width: "18rem" }}>
            <Row>
              <Col></Col>
              <Col className="mt-3">
                <img src="/images/send.png" width="200" alt="send pic" />
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
