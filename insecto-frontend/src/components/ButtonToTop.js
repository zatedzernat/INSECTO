import React, { useState } from "react";
// import { Button } from "react-bootstrap";
import "./ButtonToTopStyle.css";

// export default function ScrollButton(props) {
//   const [intervalId, setIntervalId] = useState(0);
//   // const {intervalId, setIntervalId} = props;

//   const scrollStep = () => {
//     if (window.pageYOffset === 0) {
//       clearInterval(intervalId);
//     }
//     window.scroll(0, window.pageYOffset - props.scrollStepInPx);
//   };

//   const scrollToTop = () => {
//     const intervalID = setInterval(scrollStep, props.delayInMs);
//     setIntervalId(intervalID);
//   };

//   return (
    // <Button className="scroll" onClick={() => scrollToTop()}>
    //   <span className="arrow-up glyphicon glyphicon-chevron-up">
    //     <i class="fa fa-arrow-up"></i>
    //   </span>
    // </Button>
//   );
// }

import { FaArrowCircleUp } from "react-icons/fa";

export default function ScrollArrow() {
  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  window.addEventListener("scroll", checkScrollTop);

  return (
    
    <FaArrowCircleUp
      className="scrollTop"
      onClick={scrollTop}
      style={{ height: 40, display: showScroll ? "flex" : "none" }}
    />
  );
}
