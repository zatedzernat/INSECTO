import React from "react";
import Card from "../components/Card";
import Content from "../components/Content";
import Cookies from "js-cookie";
import "../Gandlaf.scss";

export default function User(props) {
  const token = Cookies.get("token");
  const { user } = props;

  return (
    <Content
      content={
        token ? (
          <Card
            title={
              <div>
                <h2>User</h2>
                <h6>ข้อมูลผู้ใช้งาน</h6>
              </div>
            }
            body={
              <div>
                ID: {user?.id} <br />
                Name: {user?.name} <br />
                Email: {user?.email}
              </div>
            }
          />
        ) : null
      }
    />
  );
}
