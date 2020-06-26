import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./ButtonToTopStyle.css";

export default function ScrollButton(props) {
  // const [intervalId, setIntervalId] = useState(0);
  const {intervalId, setIntervalId} = props;

  const scrollStep = () => {
    if (window.pageYOffset === 0) {
      clearInterval(intervalId);
    }
    window.scroll(0, window.pageYOffset - props.scrollStepInPx);
  };

  const scrollToTop = () => {
    let intervalId = setInterval(scrollStep, props.delayInMs);
    setIntervalId(intervalId);
  };

  return (
    <Button className="scroll" onClick={() => scrollToTop()}>
      <span className="arrow-up glyphicon glyphicon-chevron-up">
        <i class="fa fa-arrow-up"></i>
      </span>
    </Button>
  );
}
