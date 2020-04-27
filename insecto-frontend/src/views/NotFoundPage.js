import React from "react";
import Content from "../components/Content";

export default function NotFoundPage() {
  return (
    <div>
      <Content content={notFound()} />
    </div>
  );
}

const notFound = () => {
  return (
    <div style={{ textAlign: "center", padding: "150px" }}>
      <h1 style={{ fontSize: "100px" }}>404</h1>
      <h3>Page Not Found</h3>
      <span>
        It's looking like you may have taken a wrong turn. <br/>
        Don't worry...it happens to the most of us.
      </span>
    </div>
  );
};
