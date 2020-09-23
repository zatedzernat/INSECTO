import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    //   sidebar from adminLTE-3.0.4 - indexedDB.html
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      {/* Brand Logo */}
      <a href="/admin" className="brand-link">
        <img
          src="/images/bug.png"
          alt="insecto logo"
          className="brand-image img-circle elevation-3"
        />
        <span className="brand-text font-weight-light">INSECTO</span>
      </a>
      {/* Sidebar */}
      <div className="sidebar">
        {/* Sidebar Menu */}
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
                to="/admin"
                activeClassName="active"
                className="nav-link"
              >
                <i className="nav-icon fas fa-bell" />
                <p>
                  Notification Problems
                </p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/admin/history_logs"
                activeClassName="active"
                className="nav-link"
              >
                <i className="nav-icon fas fa-history" />
                <p>
                  History Logs
                </p>
              </NavLink>
            </li>
            <li className="nav-item has-treeview menu-close">
              <a href="admin/#section" className="nav-link">
                <i className="nav-icon fas fa-database" />
                <p>
                  Data
                  <i className="right fas fa-angle-left" />
                </p>
              </a>
              <ul className="nav nav-treeview">
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
        {/* /.sidebar-menu */}
      </div>
      {/* /.sidebar */}
    </aside>
  );
}
