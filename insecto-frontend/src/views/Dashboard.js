import React from "react";
import Iframe from "react-iframe";
import Content from "../components/Content";

export default function Dashboard() {
  return (
    <Content
      content={
        <Iframe
          url={process.env.REACT_APP_DAS_URL}
          width="100%"
          height="800px"
          id="insectodashboard"
          display="initial"
        />
      }
    />
  );
}
