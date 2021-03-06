import React, { useState, useEffect, useMemo } from "react";
import Content from "../components/Content";
import Card from "../components/Card";
import _ from "lodash";
import axios from "axios";
import { Button, Dropdown, ButtonGroup } from "react-bootstrap";
import FormModal from "../components/FormModal";
import DataTable from "react-data-table-component";
import moment from "moment";
import Swal from "sweetalert2";
import FilterComponent from "../components/FilterBox";
import Cookies from "js-cookie";

export default function NotificationProblems(props) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [notiProblem, setNotiProblem] = useState({});
  const [modalShowDetail, setModalShowDetail] = useState(false);
  const [modalShowSDC, setModalShowSDC] = useState(false);
  const [modalShowNote, setModalShowNote] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [status, setStatus] = useState({});
  const [lastUpdate, setLastUpdate] = useState(0);
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [isExport, setIsExport] = useState(false);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);
  const [image, setImage] = useState(null);
  const token = Cookies.get("token");
  const { user } = props;

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}noti_problems`
      );
      setData(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [lastUpdate, user]);

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
      setModalShowSDC(true);
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
        note: row.note,
      });
      setModalShowNote(true);
    } else if (next_status_id === 7) {
      setStatus({
        next_status_id: 7,
        service_desk_code: row.service_desk_code,
      });
      setModalShowSDC(true);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setModalShowSDC(false);
    setModalShowNote(false);
    setModalConfirm(false);
    try {
      const res = await axios({
        url: `${process.env.REACT_APP_API_URL}noti_problems/${notiProblem.noti_id}`,
        method: "PUT",
        headers: { Authorization: token, "User-Id": user.id },
        data: status,
      });
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
        let mess2 = error.response.data.errors.service_desk_code
          ? error.response.data.errors.service_desk_code
          : "";
        let mess3 = error.response.data.errors.note
          ? error.response.data.errors.note
          : "";
        Toast.fire({
          icon: "error",
          title: mess1 + " " + mess2 + " " + mess3,
        });
      } else {
        console.log(error.message);
      }
    }
  };

  const showNextStatus = (row) => {
    let next_status;
    let bgColor;
    let fontColor;
    switch (row.status_id) {
      case 1:
        next_status = [{ status_id: 2, status_name: "open" }];
        bgColor = "#fff4de";
        fontColor = "#FFA800";
        break;
      case 2:
        next_status = [
          { status_id: 3, status_name: "on hold" },
          { status_id: 4, status_name: "queue" },
          { status_id: 5, status_name: "in progress" },
        ];
        bgColor = "#fff4de";
        fontColor = "#FFA800";
        break;
      case 3:
        next_status = [
          { status_id: 4, status_name: "queue" },
          { status_id: 5, status_name: "in progress" },
          { status_id: 8, status_name: "resolved" },
        ];
        bgColor = "#e0eaff";
        fontColor = "#6993FF";
        break;
      case 4:
        next_status = [
          { status_id: 3, status_name: "on hold" },
          { status_id: 5, status_name: "in progress" },
        ];
        bgColor = "#e0eaff";
        fontColor = "#6993FF";
        break;
      case 5:
        next_status = [
          { status_id: 3, status_name: "on hold" },
          { status_id: 8, status_name: "resolved" },
        ];
        bgColor = "#e0eaff";
        fontColor = "#6993FF";
        break;
      case 7:
        next_status = [
          { status_id: 3, status_name: "on hold" },
          { status_id: 4, status_name: "queue" },
          { status_id: 5, status_name: "in progress" },
        ];
        bgColor = "#fee2e5";
        fontColor = "#F64E60";
        break;
      case 8:
        next_status = [{ status_id: 7, status_name: "reopen" }];
        bgColor = "#c9f7f4";
        fontColor = "#1BC5BD";
        break;
      default:
        bgColor = "#eaedf2";
        fontColor = "#E4E6EF";
        break;
    }

    return (
      <>
        <Dropdown as={ButtonGroup}>
          <Dropdown.Toggle
            id="dropdown-custom-1"
            size="xs"
            style={{
              width: "105px",
              fontSize: "15px",
              color: fontColor,
              backgroundColor: bgColor,
              borderStyle: "none",
            }}
            // variant={bgColor}
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

  const exportNotiProbs = async (event) => {
    setIsExport(true);
    event.preventDefault();
    let noti_probs = {
      noti_probs: selectedRows.map(({ noti_id }) => noti_id),
    };
    try {
      const res = await axios({
        url: `${process.env.REACT_APP_API_URL}noti_problems/export`,
        data: noti_probs,
        method: "POST",
        responseType: "blob",
        headers: {
          Authorization: token,
          "User-Id": user.id,
        },
      });
      // ref = https://stackoverflow.com/questions/58131035/download-file-from-the-server-laravel-and-reactjs
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Notification_Problems.xlsx"); //or any other extension
      document.body.appendChild(link);
      link.click();
      setIsExport(false);
      setToggleCleared(!toggleCleared);
    } catch (error) {
      console.log(JSON.stringify(error.response));
    }
  };

  const getImage = async (event, row) => {
    if (event) {
      event.preventDefault();
    }
    if (row.image_extension) {
      try {
        const res = await axios({
          url: `${process.env.REACT_APP_API_URL}noti_problems/getimage/${row.noti_id}`,
          method: "GET",
          responseType: "blob",
        });
        setImage({
          url: URL.createObjectURL(res.data),
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const delImage = async (event, noti_id) => {
    event.preventDefault();
    try {
      const res = await axios({
        url: `${process.env.REACT_APP_API_URL}noti_problems/deleteimage/${noti_id}`,
        method: "GET",
        headers: {
          Authorization: token,
          "User-Id": user.id,
        },
      });
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
      setImage(null);
      setModalShowDetail(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRowSelected = React.useCallback((state) => {
    let selected = state.selectedRows.map(({ noti_id }) => ({
      noti_id,
    }));
    let sort = selected.sort((a, b) => a.noti_id - b.noti_id);
    setSelectedRows(sort);
  }, []);

  const styles = {
    container: { color: "red" },
  };

  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <>
        <FilterComponent
          onFilter={(e) => setFilterText(e.target.value)}
          onClear={handleClear}
          filterText={filterText}
        />
      </>
    );
  }, [filterText, resetPaginationToggle]);

  const notiProblemTable = (data) => {
    const columns = [
      {
        name: "#",
        sortable: true,
        width: "70px",
        selector: "noti_id",
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
        width: "170px",
      },
      {
        name: "Problem Decription",
        selector: "problem_description",
        sortable: true,
        width: "300px",
      },
      {
        name: "Room Code",
        selector: "item.room.room_code",
        sortable: true,
        width: "140px",
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
        width: "150px",
      },
      {
        name: "Detail",
        width: "80px",
        cell: (row) => (
          <Button
            variant="link"
            style={{ fontSize: "14px" }}
            onClick={() => {
              setModalShowDetail(true);
              setNotiProblem(row);
              getImage(null, row);
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

    const filteredItems = data.noti_problems?.filter(
      (item) =>
        item.problem_description |
        item.problem_description
          .toLowerCase()
          .includes(filterText.toLowerCase()) |
        item.status.status_name |
        item.status.status_name
          .toLowerCase()
          .includes(filterText.toLowerCase()) |
        item.item.item_code |
        item.item.item_code.toLowerCase().includes(filterText.toLowerCase()) |
        item.item.item_name |
        item.item.item_name.toLowerCase().includes(filterText.toLowerCase()) |
        item.item.room.room_code |
        item.item.room.room_code
          .toLowerCase()
          .includes(filterText.toLowerCase()) |
        item.item.room.room_name |
        item.item.room.room_name
          .toLowerCase()
          .includes(filterText.toLowerCase()) |
        item.item.room.building.building_name |
        item.item.room.building.building_name
          .toLowerCase()
          .includes(filterText.toLowerCase()) |
        item.user.name |
        item.user.name.toLowerCase().includes(filterText.toLowerCase())
    );

    return (
      <DataTable
        columns={columns}
        data={filteredItems}
        overflowY={true}
        striped
        responsive
        selectableRows
        selectableRowsHighlight
        highlightOnHover
        pagination
        customStyles={myFonts}
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        onSelectedRowsChange={handleRowSelected}
        clearSelectedRows={toggleCleared}
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
            badge={
              <>
                {selectedRows.length > 0 ? (
                  <>
                    {isExport === false ? (
                      <Button
                        onClick={exportNotiProbs}
                        variant="default"
                        style={{ color: "white", backgroundColor: "#6993FF" }}
                      >
                        Export Notification Problems
                      </Button>
                    ) : (
                      <Button
                        variant="default"
                        style={{ color: "white", backgroundColor: "#6993FF" }}
                      >
                        <i className="fas fa-1x fa-sync-alt fa-spin" />
                      </Button>
                    )}
                  </>
                ) : (
                  <Button
                    variant="default"
                    style={{ color: "white", backgroundColor: "#6993FF" }}
                    disabled
                  >
                    Export Notification Problems
                  </Button>
                )}
              </>
            }
            body={notiProblemTable(data)}
            loading={isLoading ? "overlay" : ""}
          />

          <FormModal
            size="xl"
            show={modalShowDetail}
            onHide={() => {
              setModalShowDetail(false);
              setImage(null);
            }}
            title="Detail"
            body={
              <>
                <div className="col-lg-7 float-lg-left">
                  <div className="form-group row">
                    <label className="col-sm-5 col-form-label">
                      Item Name:{" "}
                    </label>
                    <div className="col-sm-7 col-form-label">
                      {notiProblem.item?.item_name}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-5 col-form-label">
                      Problem Description ID:{" "}
                    </label>
                    <div className="col-sm-7 col-form-label">
                      {notiProblem.problem_des_id ??
                        "New Problem Description**"}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-5 col-form-label">
                      Problem Description:{" "}
                    </label>
                    <div className="col-sm-7 col-form-label">
                      {notiProblem.problem_description}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-5 col-form-label">
                      Room Name:
                    </label>
                    <div className="col-sm-7 col-form-label">
                      {notiProblem.item?.room.room_name}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-5 col-form-label">
                      Building Name:
                    </label>
                    <div className="col-sm-7 col-form-label">
                      {notiProblem.item?.room.building.building_name}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-5 col-form-label">
                      Created At:
                    </label>
                    <div className="col-sm-7 col-form-label">
                      {moment(notiProblem.created_at).format(
                        "D/MM/YYYY - HH:mm:ss"
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-lg-5 float-lg-right">
                  <div className="form-group row">
                    <label className="col-sm-5 col-form-label">Status: </label>
                    <div className="col-sm-7 col-form-label">
                      {notiProblem.status?.status_name}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-5 col-form-label">
                      Servicedesk Code:
                    </label>
                    <div className="col-sm-7 col-form-label">
                      {notiProblem.service_desk_code ?? "-"}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-5 col-form-label">Note: </label>
                    <div className="col-sm-7 col-form-label">
                      {notiProblem.note ?? "-"}
                    </div>
                  </div>
                  {notiProblem.image_extension ? (
                    <div className="form-group row">
                      <label className="col-sm-5 col-form-label">Image:</label>
                      &nbsp;
                      <Button
                        variant="outline-danger"
                        onClick={(event) =>
                          delImage(event, notiProblem.noti_id)
                        }
                      >
                        Delete
                      </Button>
                    </div>
                  ) : null}
                  {image?.url ? (
                    <div className="form-group row">
                      <div className="mr-auto ml-auto">
                        <img src={image.url} alt="noti_image" width="300px" />
                      </div>
                    </div>
                  ) : null}
                </div>
              </>
            }
            method="POST"
            // close="Close"
          />

          <FormModal
            show={modalShowSDC}
            onHide={() => setModalShowSDC(false)}
            title="Enter your servicedesk code"
            body={
              <div className="form-group row">
                <label className="col-sm-5 col-form-label">
                  Servicedesk Code: <span style={styles.container}>*</span>
                </label>
                <div className="col-sm-7">
                  <input
                    type="text"
                    className="form-control"
                    name="service_desk_code"
                    value={notiProblem.service_desk_code ?? ""}
                    onChange={(event) => {
                      setStatus({
                        ...status,
                        service_desk_code: event.target.value,
                      });
                      setNotiProblem({
                        ...notiProblem,
                        service_desk_code: event.target.value,
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
