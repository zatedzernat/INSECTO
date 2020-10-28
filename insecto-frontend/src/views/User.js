import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import Content from "../components/Content";
import Cookies from "js-cookie";
import axios from "axios";
import _ from "lodash";
import DataTable from "react-data-table-component";
import { Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import FormModal from "../components/FormModal";

export default function User(props) {
  const token = Cookies.get("token");
  const { user } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [loginUser, setLoginUser] = useState([]);
  const [newUser, setNewUser] = useState([]);
  const [modalShowAdd, setModalShowAdd] = useState(false);
  const [modalShowEdit, setModalShowEdit] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(0);
  const initialState = {
    id: 0,
    name: "",
    email: "",
  };

  useEffect(() => {
    fetchData();
    if (user) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
    // eslint-disable-next-line
  }, [lastUpdate, user]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await axios({
        url: `${process.env.REACT_APP_API_URL}statuses`,
        method: "GET",
        headers: { Authorization: token, "User-Id": user.id },
      });
      setData(res.data);
      setIsLoading(false);
      setLoginUser(user)
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   fetchData();
  //   // eslint-disable-next-line
  // }, [user]);

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    onOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const styles = {
    container: { color: "red" },
  };

  const addHandleSubmit = async (event) => {
    event.preventDefault();
    setModalShowAdd(false);
    console.log("Add", newUser);
    // try {
    //   const res = await axios({
    //     url: `${process.env.REACT_APP_API_URL}users`,
    //     method: "POST",
    //     headers: { Authorization: token, "User-Id": user.id },
    //     data: user,
    //   });
    //   setNewUser(initialState);
    //   if (res.data.errors) {
    //     Toast.fire({
    //       icon: "error",
    //       title: res.data.errors,
    //     });
    //   } else {
    //     setLastUpdate(res.data.time);
    //     Toast.fire({
    //       icon: "success",
    //       title: res.data.success,
    //     });
    //   }
    // } catch (error) {
    //   if (error.response.status === 422) {
    //     let mess1 = error.response.data.errors.username
    //       ? error.response.data.errors.username
    //       : "";
    //     let mess2 = error.response.data.errors.email
    //       ? error.response.data.errors.email
    //       : "";
    //     Toast.fire({
    //       icon: "error",
    //       title: mess1 + " " + mess2,
    //     });
    //   } else {
    //     console.log(error);
    //   }
    // }
  };

  const editHandleSubmit = async (event) => {
    event.preventDefault();
    setModalShowEdit(false);
    console.log("Edit", loginUser.id ,'***', loginUser.name);
    // try {
    //   const res = await axios({
    //     url: `${process.env.REACT_APP_API_URL}users`,
    //     method: "PUT",
    //     headers: { Authorization: token, "User-Id": user.id },
    //     data: loginUser,
    //   });
    //   setLoginUser(initialState);
    //   if (res.data.errors) {
    //     Toast.fire({
    //       icon: "error",
    //       title: res.data.errors,
    //     });
    //   } else {
    //     setLastUpdate(res.data.time);
    //     Toast.fire({
    //       icon: "success",
    //       title: res.data.success,
    //     });
    //   }
    // } catch (error) {
    //   if (error.response.status === 422) {
    //     Toast.fire({
    //       icon: "error",
    //       title: error.response.data.errors.username,
    //     });
    //   } else {
    //     console.log(error);
    //   }
    // }
  };

  const userTable = (data) => {
    const columns = [
      {
        name: "#",
        selector: "status_id",
        sortable: true,
      },
      {
        name: "Name*",
        selector: "status_name",
        sortable: true,
      },
      {
        name: "Email",
        selector: "status_description",
        sortable: true,
      },
    ];
    const myFonts = {
      rows: {
        style: {
          fontSize: "15px",
        },
      },
      headCells: {
        style: {
          fontSize: "15px",
        },
      },
    };
    return (
      <DataTable
        columns={columns}
        data={data.statuses}
        striped
        noHeader
        responsive
        selectableRowsHighlight
        highlightOnHover
        pagination
        customStyles={myFonts}
      />
    );
  };

  return (
    <Content
      content={
        token ? (
          <>
            <Card
              title={
                <div>
                  <h2>Profile</h2>
                  <h6>ข้อมูลผู้ใช้งาน</h6>
                </div>
              }
              badge={
                <Button
                  variant="default"
                  style={{ color: "white", backgroundColor: "#8950FC" }}
                  onClick={() => {
                    setModalShowEdit(true);
                    setLoginUser(user);
                  }}
                >
                  Edit Profile
                </Button>
              }
              body={
                <>
                  <div>
                    ID: {user?.id} <br />
                    Username: {user?.name} <br />
                    Email: {user?.email}
                  </div>
                </>
              }
              loading={isLoading ? "overlay" : ""}
            />
            <Card
              title={
                <div>
                  <h2>Users</h2>
                  <h6>รายการข้อมูลผู้ใช้งานทั้งหมด</h6>
                </div>
              }
              badge={
                <Button
                  variant="default"
                  style={{ color: "white", backgroundColor: "#1BC5BD" }}
                  onClick={() => {
                    setModalShowAdd(true);
                  }}
                >
                  Add
                </Button>
              }
              body={<div>{userTable(data)}</div>}
              loading={isLoading ? "overlay" : ""}
            />

            <FormModal
              show={modalShowEdit}
              onHide={() => {
                setModalShowEdit(false);
                setLoginUser(initialState);
              }}
              title="Edit Profile"
              body={
                <>
                  <div className="form-group row">
                    <label className="col-sm-5 col-form-label">ID:</label>
                    <div className="col-sm-7">
                      <input
                        type="text"
                        className="form-control"
                        name="id"
                        value={loginUser.id}
                        required
                        disabled
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-5 col-form-label">Username:</label>
                    <div className="col-sm-7">
                      <input
                        type="text"
                        className="form-control"
                        name="username" 
                        value={loginUser.name}
                        onChange={(event) =>
                          setLoginUser({
                            ...loginUser,
                            name: event.target.value,
                          })
                        }
                        required
                        autoFocus
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-5 col-form-label">
                      Email <span style={styles.container}>*</span>
                    </label>
                    <div className="col-sm-7">
                      <input
                        type="text"
                        className="form-control"
                        name="email"
                        value={loginUser.email}
                        required
                        autoFocus
                        disabled
                      />
                    </div>
                  </div>
                </>
              }
              method="POST"
              onSubmit={editHandleSubmit}
              button="Confirm"
              close="Cancel"
            />
            <FormModal
              show={modalShowAdd}
              onHide={() => {
                setModalShowAdd(false);
                setNewUser(initialState);
              }}
              title="Add User"
              close="Close"
              body={
                <div>
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label">
                      Username: <span style={styles.container}>*</span>
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        className="form-control"
                        name="username"
                        onChange={(event) => {
                            setNewUser({
                              ...newUser,
                              name: event.target.value,
                            });
                        }}
                        required
                        autoFocus
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label">
                      Email: <span style={styles.container}>*</span>
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        onChange={(event) =>
                          setNewUser({ ...newUser, email: event.target.value })
                        }
                        required
                      />
                    </div>
                  </div>
                </div>
              }
              method="POST"
              onSubmit={addHandleSubmit}
              button="Add"
            />
          </>
        ) : null
      }
    />
  );
}
