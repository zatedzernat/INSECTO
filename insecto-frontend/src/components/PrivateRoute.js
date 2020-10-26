import React, { useState, useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const PrivateRoute = ({ component: Component, layout: Layout, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const token = Cookies.get("token");
  const history = useHistory();

  useEffect(() => {
    checkUser();
    fetchme();
    // eslint-disable-next-line
  }, []);

  const fetchme = async () => {
    let data = {
      token: token,
    };
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}sso/fetchme`,
        data
      );
      if (res.data.errors) {
        Cookies.remove("token");
        history.replace({
          pathname: "/admin",
          state: {
            login: "Please Login again!",
          },
        });
      } else {
        setUser(res.data);
      }
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  };

  const checkUser = () => {
    if (token) {
      setIsAuthenticated(true);
    } else {
      history.replace({
        pathname: "/admin",
        state: {
          login: "Please Login first!",
        },
      });
    }
  };

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Layout user={user} {...props}>
            <Component user={user} {...props} />
          </Layout>
        ) : (
          <></>
        )
      }
    />
  );
};

export default PrivateRoute;
