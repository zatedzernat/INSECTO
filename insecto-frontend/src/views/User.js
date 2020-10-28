import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import Content from "../components/Content";
import Cookies from "js-cookie";
import axios from "axios";
import _ from "lodash";
import DataTable from "react-data-table-component";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import FormModal from "../components/FormModal";
import moment from "moment";

export default function User(props) {
  const token = Cookies.get("token");
  const { user } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [loginUser, setLoginUser] = useState({});
  const [newUser, setNewUser] = useState({});
  const [editUser, setEditUser] = useState({});
  const [modalShowAdd, setModalShowAdd] = useState(false);
  const [modalShowEdit, setModalShowEdit] = useState(false);
  const [modalShowDel, setModalShowDel] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(0);
  const initialState = {
    // id: 0,
    // name: "",
    // email: "",
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
        url: `${process.env.REACT_APP_API_URL}users`,
        method: "GET",
        headers: { Authorization: token, "User-Id": user.id },
      });
      setData(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

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
    try {
      const res = await axios({
        url: `${process.env.REACT_APP_API_URL}users`,
        method: "POST",
        headers: { Authorization: token, "User-Id": user.id },
        data: newUser,
      });
      setNewUser(initialState);
      if (res.data.errors) {
        Toast.fire({
          icon: "error",
          title: res.data.errors,
        });
      } else {
        setLastUpdate(res.data.time);
        Toast.fire({
          icon: "success",
          title: res.data.success,
        });
      }
    } catch (error) {
      if (error.response.status === 422) {
        let mess1 = error.response.data.errors.name
          ? error.response.data.errors.name
          : "";
        let mess2 = error.response.data.errors.email
          ? error.response.data.errors.email
          : "";
        Toast.fire({
          icon: "error",
          title: mess1 + " " + mess2,
        });
      } else {
        console.log(error);
      }
    }
  };

  const editHandleSubmit = async (event) => {
    event.preventDefault();
    setModalShowEdit(false);
    try {
      const res = await axios({
        url: `${process.env.REACT_APP_API_URL}users/${loginUser.id}`,
        method: "PUT",
        headers: { Authorization: token, "User-Id": user.id },
        data: loginUser,
      });
      setLoginUser(initialState);
      if (res.data.errors) {
        Toast.fire({
          icon: "error",
          title: res.data.errors,
        });
      } else {
        setLastUpdate(res.data.time);
        Toast.fire({
          icon: "success",
          title: res.data.success,
        });
      }
    } catch (error) {
      if (error.response.status === 422) {
        let mess1 = error.response.data.errors.id
          ? error.response.data.errors.id
          : "";
        let mess2 = error.response.data.errors.name
          ? error.response.data.errors.name
          : "";
        Toast.fire({
          icon: "error",
          title: mess1 + " " + mess2,
        });
      } else {
        console.log(error);
      }
    }
  };

  const deleteHandleSubmit = async (event) => {
    event.preventDefault();
    setModalShowDel(false);
    try {
      const res = await axios({
        url: `${process.env.REACT_APP_API_URL}users/${editUser.id}`,
        method: "DELETE",
        headers: { Authorization: token, "User-Id": user.id },
        data: editUser.id,
      });
      setEditUser(initialState);
      if (res.data.error) {
        Toast.fire({
          icon: "error",
          title: res.data.errors,
        });
      } else {
        setLastUpdate(res.data.time);
        Toast.fire({
          icon: "success",
          title: res.data.success,
        });
      }
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  };

  const userTable = (data) => {
    const columns = [
      {
        name: "#",
        selector: "id",
        width: "70px",
        sortable: true,
      },
      {
        name: "Name",
        selector: "name",
        sortable: true,
      },
      {
        name: "Email",
        selector: "email",
        sortable: true,
      },
      {
        name: "Last Updated",
        selector: "updated_at",
        sortable: true,
        format: (r) => moment(r.updated_at).format("D/MM/YYYY - HH:mm:ss"),
      },
      {
        name: "Action",
        cell: (row) => (
          <>
            {/* <span
              onClick={() => {
                setModalShowEdit(true);
                setBrand(row);
              }}
            >
              <i className="ion-edit" />
            </span>
            &emsp; */}
            <span
              onClick={() => {
                setModalShowDel(true);
                setEditUser(row);
              }}
            >
              <i className="fa fa-times" />
            </span>
          </>
        ),
        button: true,
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
        data={data.users}
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
                    setLoginUser(_.find(data.users, { id: user?.id }));
                  }}
                >
                  Edit Profile
                </Button>
              }
              body={
                <>
                  <div>
                    ID: {_.find(data.users, { id: user?.id })?.id} <br />
                    Name: {_.find(data.users, { id: user?.id })?.name} <br />
                    Email: {_.find(data.users, { id: user?.id })?.email}
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
                    <label className="col-sm-5 col-form-label">Name:</label>
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
                    <label className="col-sm-5 col-form-label">Email:</label>
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
                      Name: <span style={styles.container}>*</span>
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

            <FormModal
              show={modalShowDel}
              onHide={() => {
                setModalShowDel(false);
                setEditUser(initialState);
              }}
              title="Are you sure that you want to delete?"
              body={
                <div className="form-group col-form-label">
                  <p>User: "{editUser.name}"</p>
                </div>
              }
              method="POST"
              onSubmit={deleteHandleSubmit}
              button="Confirm"
              close="Cancel"
            />
          </>
        ) : null
      }
    />
  );
}
