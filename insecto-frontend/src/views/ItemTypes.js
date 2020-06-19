import React, { useState, useEffect } from "react";
import Content from "../components/Content";
import Card from "../components/Card";
import { Button, Alert } from "react-bootstrap";
import axios from "axios";
import FormModal from "../components/FormModal";
import DataTable from "react-data-table-component";
import moment from "moment";

export default function ItemTypes() {
  const [data, setData] = useState([]);
  const [modalShowAdd, setModalShowAdd] = useState(false);
  const [modalShowDel, setModalShowDel] = useState(false);
  const [modalShowEdit, setModalShowEdit] = useState(false);
  const [isError, setIsError] = useState({
    error: false,
    message: "",
  });
  const [isSuccess, setIsSuccess] = useState({
    success: false,
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(0);
  const [itemType, setItemType] = useState({
    type_name: "",
  });

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}item_types`);
      setData(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  };

  useEffect(() => {
    fetchData();
  }, [lastUpdate]);

  const addHandleSubmit = async (event) => {
    event.preventDefault();
    setModalShowAdd(false);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}item_types`,
        itemType
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
        setIsError({
          error: true,
          message: error.response.data.errors.type_name,
        });
      }
    }
  };

  const deleteHandleSubmit = async (event) => {
    event.preventDefault();
    setModalShowDel(false);
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API_URL}item_types/${itemType.type_id}`,
        itemType.type_id
      );
      if (res.data.error) {
        setIsError({
          error: true,
          message: res.data.message,
        });
      } else {
        setLastUpdate(res.data.time);
        setIsSuccess({
          success: true,
          message: res.data.success,
        });
      }
    } catch (error) {
      console.log(JSON.stringify(error.response));
    }
  };

  const editHandleSubmit = async (event) => {
    event.preventDefault();
    setModalShowEdit(false);
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}item_types/${itemType.type_id}`,
        itemType
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
        setIsError({
          error: true,
          message: error.response.data.errors.type_name,
        });
      }
    }
  };

  const styles = {
    container: { color: "red" },
  };

  const itemTypeTable = (data) => {
    const columns = [
      {
        name: "#",
        selector: "type_id",
        sortable: true,
      },
      {
        name: "Type Name*",
        selector: "type_name",
        sortable: true,
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
        name: "Action",
        cell: (row) => (
          <>
            <span
              onClick={() => {
                setModalShowEdit(true);
                setItemType(row);
              }}
            >
              <i className="fa fa-edit" />
            </span>
            &emsp;
            <span
              onClick={() => {
                setModalShowDel(true);
                setItemType(row);
              }}
            >
              <i className="fa fa-times" />
            </span>
          </>
        ),
        button: true,
      },
    ];
    return (
      <DataTable
        columns={columns}
        data={data.item_types}
        striped
        responsive
        selectableRows
        selectableRowsHighlight
        highlightOnHover
        pagination
      />
    );
  };

  return (
    <Content
      content={
        <div>
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
                <h2>Item Types</h2>
                <h6>รายการประเภทของครุภัณฑ์ทั้งหมด</h6>
              </div>
            }
            badge={
              <div>
                <Button variant="info" onClick={() => setModalShowAdd(true)}>
                  Add
                </Button>
                &emsp;
                <Button variant="danger">Delete</Button>
              </div>
            }
            body={itemTypeTable(data)}
            loading={isLoading ? "overlay" : ""}
          />
          <FormModal
            show={modalShowAdd}
            onHide={() => setModalShowAdd(false)}
            title="Add Item Type"
            method="POST"
            close="Close"
            onSubmit={addHandleSubmit}
            body={
              <div className="form-group row">
                <label className="col-sm-5 col-form-label">
                  Item Type Name: <span style={styles.container}>*</span>
                </label>
                <div className="col-sm-7">
                  <input
                    type="text"
                    className="form-control"
                    name="type_name"
                    onChange={(event) =>
                      setItemType({ type_name: event.target.value })
                    }
                    required
                    autoFocus
                  />
                </div>
              </div>
            }
            button="Add"
          />
          <FormModal
            show={modalShowDel}
            onHide={() => setModalShowDel(false)}
            title="Do you confirm to delete?"
            body={
              <div className="form-group col-form-label">
                <p>"{itemType.type_name}"</p>
                <p className="text-danger">
                  *** All items and problem descriptions that relate{" "}
                  {itemType.type_name} will be delete too ***
                </p>
              </div>
            }
            method="POST"
            onSubmit={deleteHandleSubmit}
            button="Yes"
            close="No"
          />

          <FormModal
            show={modalShowEdit}
            onHide={() => setModalShowEdit(false)}
            title="Edit Item Type"
            body={
              <div className="form-group row">
                <label className="col-sm-5 col-form-label">
                  Item Type Name: <span style={styles.container}>*</span>
                </label>
                <div className="col-sm-7">
                  <input
                    type="text"
                    className="form-control"
                    name="type_name"
                    defaultValue={itemType.type_name}
                    onChange={(event) =>
                      setItemType({
                        type_id: itemType.type_id,
                        type_name: event.target.value,
                      })
                    }
                    required
                    autoFocus
                  />
                </div>
              </div>
            }
            method="POST"
            onSubmit={editHandleSubmit}
            button="Confirm"
            close="Cancel"
          />
        </div>
      }
    />
  );
}
