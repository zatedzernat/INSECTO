import React from "react";

export default function Header() {
  return (
    //   navbar from adminLTE-3.0.4 - indexedDB.html
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      {/* Left navbar links */}
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href="#section" role="button">
            <i className="fas fa-bars" />
          </a>
        </li>
        {/* <li className="nav-item d-none d-sm-inline-block">
          <a href="#section" className="nav-link">
            Home
          </a>
        </li> */}
      </ul>
    </nav>
  );
}
