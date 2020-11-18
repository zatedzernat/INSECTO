import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import Cookies from "js-cookie";

export default function Sidebar(props) {
  const token = Cookies.get("token");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, []);

  const handleResize = (e) => {
    setWindowWidth(window.innerWidth);
  };
  return (
    //   sidebar from adminLTE-3.0.4 - indexedDB.html
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      {/* Brand Logo */}
      <div className="row">
        {windowWidth < 992 ? (
          <div className="col-3">
            <a data-widget="pushmenu" href="#section" role="button">
              <i className="fas fa-bars pl-4 pt-4 text-white" />
            </a>
          </div>
        ) : (
          <></>
        )}
        <div className="col brand-link">
          <Link
            to={token ? "/admin/notification_problems" : "/admin"}
            // className="brand-link"
            // onClick={(event) => window.location.reload()}
          >
            <div>
              <img
                src="/images/bug.png"
                alt="insecto logo"
                className="brand-image img-circle elevation-3"
              />
              <span className="brand-text font-weight-light text-white">
                INSECTO
              </span>
            </div>
          </Link>
        </div>
      </div>
      {/* Sidebar */}
      <div className="sidebar">
        {/* Sidebar Menu */}
        {token ? (
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
              <li className="nav-item">
                <NavLink
                  exact
                  to="/admin/notification_problems"
                  activeClassName="active"
                  className="nav-link"
                >
                  <i className="nav-icon fas fa-bell" />
                  <p>Notification Problems</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/admin/history_logs"
                  activeClassName="active"
                  className="nav-link"
                >
                  <i className="nav-icon fas fa-history" />
                  <p>History Logs</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/admin/dashboard"
                  activeClassName="active"
                  className="nav-link"
                >
                  <i className="nav-icon fas fa-chart-pie" />
                  <p>Dashboard</p>
                </NavLink>
              </li>
              <li className="nav-item has-treeview menu-open">
                <a href="#section" className="nav-link">
                  <i className="nav-icon fas fa-database" />
                  <p>
                    Data
                    <i className="right fas fa-angle-left" />
                  </p>
                </a>
                <ul className="nav nav-treeview sidebar-collapse">
                  <li className="nav-item">
                    <NavLink
                      to="/admin/buildings"
                      activeClassName="active"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon" />
                      <p>Buildings</p>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/admin/rooms"
                      activeClassName="active"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon" />
                      <p>Rooms</p>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/admin/items"
                      activeClassName="active"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon" />
                      <p>Item</p>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/admin/item_types"
                      activeClassName="active"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon" />
                      <p>Item Types</p>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/admin/problem_descriptions"
                      activeClassName="active"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon" />
                      <p>Problem Descriptions</p>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/admin/brands"
                      activeClassName="active"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon" />
                      <p>Brands</p>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/admin/status" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Status</p>
                    </NavLink>
                  </li>
                </ul>
              </li>
              {/* <li className="nav-header">MISCELLANEOUS</li>
            <li className="nav-item">
              <a href="https://adminlte.io/docs/3.0" className="nav-link">
                <i className="nav-icon fas fa-file" />
                <p>Documentation</p>
              </a>
            </li> */}
            </ul>
          </nav>
        ) : null}

        {/* /.sidebar-menu */}
      </div>
      {/* /.sidebar */}
    </aside>
  );
}
