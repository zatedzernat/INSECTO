import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useHistory, useLocation } from "react-router-dom";

export default function Header(props) {
  const [isLoading, setIsLoading] = useState(false);
  const token = Cookies.get("token");
  const { user } = props;
  const history = useHistory();
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();
  const code = query.get("code");

  useEffect(() => {
    if (code !== null) {
      setIsLoading(true);
    }
    // eslint-disable-next-line
  }, [code]);

  const redirectToSSO = async (event) => {
    setIsLoading(true);
    window.location = `https://std-sso-fe.sit.kmutt.ac.th/login?response_type=code&client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=http://localhost:3000/admin&state=insecto`;
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    if (token) {
      Cookies.remove("token");
      await Toast.fire({
        icon: "success",
        title: "Logout Success",
      });
      history.replace("/admin");
      window.location.reload();
    }
  };

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1150,
    timerProgressBar: true,
    onOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  return (
    //   navbar from adminLTE-3.0.4 - indexedDB.html
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      {/* Left navbar links */}
      <ul className="navbar-nav">
        <li className="nav-item">
          <a
            className="nav-link"
            data-widget="pushmenu"
            href="#section"
            role="button"
          >
            <i className="fas fa-bars" />
          </a>
        </li>
        {/* <li className="nav-item d-none d-sm-inline-block">
          <a href="#section" className="nav-link">
            Home
          </a>
        </li> */}
      </ul>
      <ul className="navbar-nav ml-auto">
        {/* Notifications Dropdown Menu */}
        <li className="nav-item dropdown">
          {token ? (
            <a href="#hi" className="nav-link" data-toggle="dropdown">
              <i className="far fa-user" /> Hi, {user?.name}
            </a>
          ) : isLoading === false ? (
            <a
              className="nav-link"
              href="#redirect"
              // href={`https://std-sso-fe.sit.kmutt.ac.th/login?response_type=code&client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=http://localhost:3000/admin&state=insecto`}
              onClick={redirectToSSO}
            >
              <i className="fas fa-sign-in-alt" /> Login
            </a>
          ) : (
            <a href="#spin" className="nav-link">
              <i className="fas fa-1x fa-sync-alt fa-spin" />
            </a>
          )}
          {token ? (
            <div className="dropdown-menu dropdown-menu dropdown-menu-right">
              {/* <span class="dropdown-item dropdown-header">15 Notifications</span> */}
              <a
                href="#logout"
                onClick={handleLogout}
                className="dropdown-item"
              >
                <i className="fas fa-sign-out-alt" /> Logout
              </a>
              {/* <div className="dropdown-divider" />
            <a href="#" className="dropdown-item">
              <i className="fas fa-file mr-2" /> 3 new reports
              <span className="float-right text-muted text-sm">2 days</span>
            </a>
            <div className="dropdown-divider" />
            <a href="#" className="dropdown-item dropdown-footer">
              See All Notifications
            </a> */}
            </div>
          ) : null}
        </li>
        &emsp;
      </ul>
    </nav>
  );
}
