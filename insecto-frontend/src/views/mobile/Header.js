import React from "react";

export default function Header() {
  return (
    //   navbar from adminLTE-3.0.4 - indexedDB.html
    <nav className="navbar navbar-expand navbar-white navbar-light">
      <div className="row">
          <a href="/" className="brand-link text-dark">
            <img
              src="/images/bug.png"
              alt="insecto logo"
              className="brand-image img-circle elevation-3"
            />
            <span className="brand-text font-weight-dark">INSECTO</span>
          </a>
      </div>
    </nav>
  );
}
