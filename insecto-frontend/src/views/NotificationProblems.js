import React, { useState, useEffect } from "react";
import Content from "../components/Content";
import Card from "../components/Card";
import _ from "lodash";
import axios from "axios";
import {
  Button,
  DropdownButton,
  Dropdown,
  Alert,
  ButtonGroup,
} from "react-bootstrap";
import FormModal from "../components/FormModal";
import DataTable from "react-data-table-component";
import moment from "moment";

export default function NotificationProblems() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [notiProblem, setNotiProblem] = useState({});
  const [modalShowDetail, setModalShowDetail] = useState(false);
  const [modalShowHDC, setModalShowHDC] = useState(false);
  const [modalShowNote, setModalShowNote] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [status, setStatus] = useState({});
  const [isError, setIsError] = useState({
    error: false,
    message: "",
  });
  const [isSuccess, setIsSuccess] = useState({
    success: false,
    message: "",
  });
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

  const handleStatus = async (next_status_id, event) => {
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
      });
      setModalShowNote(true);
    } else if (next_status_id === 7) {
      setStatus({
        next_status_id: 7,
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
        setIsError({
          error: true,
          message: res.data.errors,
        });
      } else {
        setLastUpdate(res.data.time);
        setIsSuccess({
          success: true,
          message: res.data.success,
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
        setIsError({
          error: true,
          message: mess1 + " " + mess2 + " " + mess3,
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
            style={{ width: "100px" }}
            variant={color}
          >
            {row.status.status_name}
          </Dropdown.Toggle>
          <Dropdown.Menu className="super-colors">
            {_.map(next_status, (status) => (
              <Dropdown.Item
                key={status.status_id}
                eventKey={status.status_id}
                onSelect={(eventKey, event) => {
                  setNotiProblem(row);
                  handleStatus(parseInt(eventKey), event);
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
      },
      {
        name: "Item Code",
        selector: "item.item_code",
        sortable: true,
      },
      {
        name: "Item Name",
        selector: "item.item_name",
        sortable: true,
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
      },
      {
        name: "Status",
        sortable: true,
        button: true,
        allowOverflow: true, //for dropdown
        cell: (row) => showNextStatus(row),
      },
      {
        name: "Created At",
        selector: "created_at",
        sortable: true,
        format: (r) => moment(r.created_at).format("D/M/YYYY - HH:mm:ss"),
      },
      {
        name: "Updated At",
        selector: "updated_at",
        sortable: true,
        format: (r) => moment(r.updated_at).format("D/M/YYYY - HH:mm:ss"),
      },
      {
        name: "User",
        selector: "user.name",
        sortable: true,
      },
      {
        name: "Detail",
        cell: (row) => (
          <Button
            variant="link"
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
      />
    );
  };

  return (
    <Content
      content={
        <>
          {isError.error && (
            <Alert
              variant="danger"
              onClose={() => setIsError(false)}
              dismissible
            >
              {isError.message}
            </Alert>
          )}
          {isSuccess.success && (
            <Alert
              variant="success"
              onClose={() => setIsSuccess(false)}
              dismissible
            >
              {isSuccess.message}
            </Alert>
          )}
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
              <div className="form-group row">
                <label className="col-sm-6 col-form-label">Created At: </label>
                <div className="col-sm-6">{notiProblem.created_at}</div>
                <label className="col-sm-6 col-form-label">
                  Problem Description ID:{" "}
                </label>
                <div className="col-sm-6">{notiProblem.problem_des_id}</div>
                <label className="col-sm-6 col-form-label">Room Name:</label>
                <div className="col-sm-6">
                  {notiProblem.item?.room.room_name}
                </div>
                <label className="col-sm-6 col-form-label">Status </label>
                <div className="col-sm-6">
                  {notiProblem.status?.status_name}
                </div>
                <label className="col-sm-6 col-form-label">HDC: </label>
                <div className="col-sm-6">
                  {notiProblem.help_desk_code ?? "-"}
                </div>
                <label className="col-sm-6 col-form-label">Note: </label>
                <div className="col-sm-6">{notiProblem.note ?? "-"}</div>
              </div>
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
                <label className="col-sm-3 col-form-label">
                  Help Desk Code: <span style={styles.container}>*</span>
                </label>
                <div className="col-sm-9">
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
