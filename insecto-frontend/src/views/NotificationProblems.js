import React, { useState, useEffect } from "react";
import Content from "../components/Content";
import Card from "../components/Card";
import _ from "lodash";
import axios from "axios";
import { Button, Dropdown, ButtonGroup } from "react-bootstrap";
import FormModal from "../components/FormModal";
import DataTable from "react-data-table-component";
import moment from "moment";
import Swal from "sweetalert2";

export default function NotificationProblems() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [notiProblem, setNotiProblem] = useState({});
  const [modalShowDetail, setModalShowDetail] = useState(false);
  const [modalShowHDC, setModalShowHDC] = useState(false);
  const [modalShowNote, setModalShowNote] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [status, setStatus] = useState({});
  const [lastUpdate, setLastUpdate] = useState(0);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}noti_problems`
      );
      setData(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(JSON.stringify(error.response.data.errors));
    }
  };

  useEffect(() => {
    fetchData();
  }, [lastUpdate]);

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
  const handleStatus = async (next_status_id, row) => {
    if (next_status_id === 2) {
      setStatus({
        next_status_id: 2,
      });
      setModalShowHDC(true);
    } else if (
      next_status_id === 3 ||
      next_status_id === 4 ||
      next_status_id === 5
    ) {
      switch (next_status_id) {
        case 3:
          setStatus({
            status_name: "on hold",
            next_status_id: 3,
          });
          setModalConfirm(true);
          break;
        case 4:
          setStatus({
            status_name: "queue",
            next_status_id: 4,
          });
          setModalConfirm(true);
          break;
        case 5:
          setStatus({
            status_name: "in progress",
            next_status_id: 5,
          });
          setModalConfirm(true);
          break;
        default:
          break;
      }
    } else if (next_status_id === 8) {
      setStatus({
        next_status_id: 8,
        note: row.note
      });
      setModalShowNote(true);
    } else if (next_status_id === 7) {
      setStatus({
        next_status_id: 7,
        help_desk_code: row.help_desk_code,
      });
      setModalShowHDC(true);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setModalShowHDC(false);
    setModalShowNote(false);
    setModalConfirm(false);
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}noti_problems/${notiProblem.noti_id}`,
        status
      );
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
        let mess1 = error.response.data.errors.next_status_id
          ? error.response.data.errors.next_status_id
          : "";
        let mess2 = error.response.data.errors.help_desk_code
          ? error.response.data.errors.help_desk_code
          : "";
        let mess3 = error.response.data.errors.note
          ? error.response.data.errors.note
          : "";
        Toast.fire({
          icon: "error",
          title: mess1 + " " + mess2 + " " + mess3,
        });
      }
    }
  };

  const showNextStatus = (row) => {
    let next_status;
    let color;
    switch (row.status_id) {
      case 1:
        next_status = [{ status_id: 2, status_name: "open" }];
        color = "warning";
        break;
      case 2:
        next_status = [
          { status_id: 3, status_name: "on hold" },
          { status_id: 4, status_name: "queue" },
          { status_id: 5, status_name: "in progress" },
        ];
        color = "success";
        break;
      case 3:
        next_status = [
          { status_id: 4, status_name: "queue" },
          { status_id: 5, status_name: "in progress" },
          { status_id: 8, status_name: "resolved" },
        ];
        color = "info";
        break;
      case 4:
        next_status = [
          { status_id: 3, status_name: "on hold" },
          { status_id: 5, status_name: "in progress" },
        ];
        color = "info";
        break;
      case 5:
        next_status = [
          { status_id: 3, status_name: "on hold" },
          { status_id: 8, status_name: "resolved" },
        ];
        color = "info";
        break;
      case 7:
        next_status = [
          { status_id: 3, status_name: "on hold" },
          { status_id: 4, status_name: "queue" },
          { status_id: 5, status_name: "in progress" },
        ];
        color = "danger";
        break;
      case 8:
        next_status = [{ status_id: 7, status_name: "reopen" }];
        color = "primary";
        break;
      default:
        color = "secondary";
        break;
    }

    return (
      <>
        <Dropdown as={ButtonGroup}>
          <Dropdown.Toggle
            id="dropdown-custom-1"
            size="xs"
            style={{ width: "105px", fontSize: "15px" }}
            variant={color}
          >
            {row.status.status_name}
          </Dropdown.Toggle>
          <Dropdown.Menu className="super-colors">
            {_.map(next_status, (status) => (
              <Dropdown.Item
                key={status.status_id}
                eventKey={status.status_id}
                style={{ fontSize: "15px" }}
                onSelect={(eventKey, event) => {
                  setNotiProblem(row);
                  handleStatus(parseInt(eventKey), row);
                }}
              >
                {status.status_name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>{" "}
      </>
    );
  };

  const styles = {
    container: { color: "red" },
  };

  const notiProblemTable = (data) => {
    const columns = [
      {
        name: "#",
        selector: "noti_id",
        sortable: true,
        width: "50px",
      },
      {
        name: "Item Code",
        selector: "item.item_code",
        sortable: true,
        width: "170px",
      },
      {
        name: "Item Name",
        selector: "item.item_name",
        sortable: true,
        width: "130px",
      },
      {
        name: "Problem Decription",
        selector: "problem_description",
        sortable: true,

      },
      {
        name: "Room Code",
        selector: "item.room.room_code",
        sortable: true,
        width: "125px",
      },
      {
        name: "Status",
        sortable: true,
        button: true,
        allowOverflow: true, //for dropdown
        cell: (row) => showNextStatus(row),
      },
      // {
      //   name: "Created At",
      //   selector: "created_at",
      //   sortable: true,
      //   format: (r) => moment(r.created_at).format("D/M/YYYY - HH:mm:ss"),
      // },
      {
        name: "Last Updated",
        selector: "updated_at",
        sortable: true,
        format: (r) => moment(r.updated_at).format("D/MM/YYYY - HH:mm:ss"),
        width: "200px",
      },
      {
        name: "User",
        selector: "user.name",
        sortable: true,
        width: "135px",
      },
      {
        name: "Detail",
        cell: (row) => (
          <Button
            variant="link"
            style={{ fontSize: "14px" }}
            onClick={() => {
              setModalShowDetail(true);
              setNotiProblem(row);
            }}
          >
         Detail
          </Button>
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
        data={data.noti_problems}
        striped
        responsive
        noHeader
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
        <>
          <Card
            title={
              <div>
                <h2>Notification Problems</h2>
                <h6>รายการการแจ้งปัญหาทั้งหมด</h6>
              </div>
            }
            body={notiProblemTable(data)}
            loading={isLoading ? "overlay" : ""}
          />

          <FormModal
            show={modalShowDetail}
            onHide={() => setModalShowDetail(false)}
            title="Detail"
            body={
              <>
                <div className="form-group row">
                  <label className="col-sm-6 col-form-label">Created At:</label>
                  <div className="col-sm-6 col-form-label">
                    {moment(notiProblem.created_at).format(
                      "D/MM/YYYY - HH:mm:ss"
                    )}
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-6 col-form-label">
                    Problem Description ID:{" "}
                  </label>
                  <div className="col-sm-6 col-form-label">
                    {notiProblem.problem_des_id ?? 'New Problem Description**'}
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-6 col-form-label">Room Name:</label>
                  <div className="col-sm-6 col-form-label">
                    {notiProblem.item?.room.room_name}
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-6 col-form-label">
                    Building Name:
                  </label>
                  <div className="col-sm-6 col-form-label">
                    {notiProblem.item?.room.building.building_name}
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-6 col-form-label">Status: </label>
                  <div className="col-sm-6 col-form-label">
                    {notiProblem.status?.status_name}
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-6 col-form-label">HDC: </label>
                  <div className="col-sm-6 col-form-label">
                    {notiProblem.help_desk_code ?? "-"}
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-6 col-form-label">Note: </label>
                  <div className="col-sm-6 col-form-label">
                    {notiProblem.note ?? "-"}
                  </div>
                </div>
              </>
            }
            method="POST"
            close="Close"
          />

          <FormModal
            show={modalShowHDC}
            onHide={() => setModalShowHDC(false)}
            title="Enter your help desk code"
            body={
              <div className="form-group row">
                <label className="col-sm-5 col-form-label">
                  Help Desk Code: <span style={styles.container}>*</span>
                </label>
                <div className="col-sm-7">
                  <input
                    type="text"
                    className="form-control"
                    name="help_desk_code"
                    value={notiProblem.help_desk_code ?? ""}
                    onChange={(event) => {
                      setStatus({
                        ...status,
                        help_desk_code: event.target.value,
                      });
                      setNotiProblem({
                        ...notiProblem,
                        help_desk_code: event.target.value,
                      });
                    }}
                    required
                    autoFocus
                  />
                </div>
              </div>
            }
            method="PUT"
            onSubmit={handleSubmit}
            button="Confirm"
            close="Close"
          />
          <FormModal
            show={modalShowNote}
            onHide={() => setModalShowNote(false)}
            title="Enter your note"
            body={
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">
                  Note: <span style={styles.container}>*</span>
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    name="note"
                    value={notiProblem.note ?? ""}
                    onChange={(event) => {
                      setStatus({
                        ...status,
                        note: event.target.value,
                      });
                      setNotiProblem({
                        ...notiProblem,
                        note: event.target.value,
                      });
                    }}
                    required
                    autoFocus
                  />
                </div>
              </div>
            }
            method="PUT"
            onSubmit={handleSubmit}
            button="Confirm"
            close="Close"
          />
          <FormModal
            show={modalConfirm}
            onHide={() => setModalConfirm(false)}
            title="Confirm Change Status"
            body={
              <div className="form-group row">
                <label className="col-sm-12 col-form-label">
                  Are you sure to change status to "{" "}
                  <span style={styles.container}>{status.status_name}</span> " ?
                </label>
              </div>
            }
            method="PUT"
            onSubmit={handleSubmit}
            button="Yes"
            close="No"
          />
        </>
      }
    />
  );
}
