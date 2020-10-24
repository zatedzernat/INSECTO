import React, { useState, useEffect } from "react";
import Content from "../components/Content";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Cookies from "js-cookie";
import "../Gandlaf.scss";

export default function Login(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const token = Cookies.get("token");

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  let query = useQuery();
  const code = query.get("code");

  useEffect(() => {
    checkUser();
    if (code !== null) {
      getToken();
    }
    // eslint-disable-next-line
  }, [code]);

  const checkUser = () => {
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  };

  const getToken = async () => {
    setIsLoading(true);
    let data = {
      client_id: process.env.REACT_APP_CLIENT_ID,
      code: code,
      url: `${window.location.origin}/admin`,
    };
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}sso/gettoken`,
        data
      );
      if (res.data.errors) {
        Toast.fire({
          icon: "error",
          title: res.data.errors,
        });
      } else {
        Cookies.set("token", res.data, { expires: 1 }); //set cookie to expire in 1 day
        await Toast.fire({
          icon: "success",
          title: "Login Success",
        });
        setIsAuthenticated(true);
        props.history.replace("/admin/notification_problems");
        window.location.reload();
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1250,
    timerProgressBar: true,
    onOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  return (
    <Content
      content={
        isAuthenticated ? null : (
          <div>
            <div className="gandalf">
              <div className="fireball"></div>
              <div className="skirt"></div>
              <div className="sleeves"></div>
              <div className="shoulders">
                <div className="hand left"></div>
                <div className="hand right"></div>
              </div>
              <div className="head">
                <div className="hair"></div>
                <div className="beard"></div>
              </div>
            </div>
            <div className="message">
              <h1 style={{ textAlign: "center" }}>403 - You Shall Not Pass</h1>
              <p style={{ textAlign: "center" }}>
                Uh oh, Gandalf is blocking the way, Please Login !
                <br />
                {/* Maybe you have a typo in the url? Or you meant to go to a
          different location? Like...Hobbiton?  */}
                <span style={{ fontSize: "10px" }}>
                  https://codepen.io/anjanas_dh
                </span>
              </p>
            </div>
          </div>
        )
      }
    />
  );
}
