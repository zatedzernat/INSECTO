import React, { useState, useEffect } from "react";
import Content from "../components/Content";
import Card from "../components/Card";
import {
  Table,
  Button,
  Alert,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import _ from "lodash";
import axios from "axios";
import FormModal from "../components/FormModal";

export default function ProblemDescriptions() {
  const [data, setData] = useState([]);
  const [modalShowAdd, setModalShowAdd] = useState(false);
  const [modalShowDel, setModalShowDel] = useState(false);
  const [objectDel, setObjectDel] = useState([]);
  const [isError, setIsError] = useState({
    error: false,
    success: false,
    message: "",
    time: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(0);
  const [problemDesc, setProblemDesc] = useState({
    problem_des_id: 0,
    problem_description: "",
    type_id: "",
  });
  const [selectType, setSelectType] = useState("- select type name -");
  
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}problem_descs`
      );
      setData(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [lastUpdate]);

  const addHandleSubmit = async (event) => {
    event.preventDefault();
    setSelectType("- select type name -")
    setModalShowAdd(false);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}problem_descs`,
        problemDesc
      );
      if (res.data.error) {
        setIsError({
          error: true,
          message: res.data.message,
        });
      } else {
        setLastUpdate(res.data.time);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHandleSubmit = async (event) => {
    event.preventDefault();
    setModalShowDel(false);
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API_URL}problem_descs/${objectDel.problem_des_id}`,
        objectDel.problem_des_id
      );
      if (res.data.error) {
        setIsError({
          error: true,
          message: res.data.message,
        });
      } else {
        setLastUpdate(res.data.time);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const problemDesTable = (data) => {
    return (
      <Table striped hover>
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>#</th>
            <th>Problem Description</th>
            <th>Type</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Update By</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {_.map(data.problem_descs, (problem_desc) => (
            <tr key={problem_desc.problem_des_id}>
              <td>
                <input type="checkbox" />
              </td>
              <td>{problem_desc.problem_des_id}</td>
              <td>{problem_desc.problem_description}</td>
              <td>{problem_desc.item_type.type_name}</td>
              <td>{problem_desc.created_at}</td>
              <td>{problem_desc.updated_at}</td>
              <td>{problem_desc.update_by}</td>
              <td>
                <i className="fa fa-edit" />
                &emsp;
                <span  onClick={ () => {
                  setModalShowDel(true); 
                  setObjectDel(problem_desc);}}
                >
                  <i className="fa fa-times" />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
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
          <Card
            title={
              <div>
                <h2>Problem Descriptions</h2>
                <h6>รายการคำอธิบายปัญหาทั้งหมด</h6>
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
            body={problemDesTable(data)}
            loading={isLoading ? "overlay" : ""}
          />
          <FormModal
            show={modalShowAdd}
            onHide={() => setModalShowAdd(false)}
            title="Add Problem Description"
            method="POST"
            close="Close"
            onSubmit={addHandleSubmit}
            body={
              <div>
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Problem Description:
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="problem_description"
                      onChange={(event) =>
                        setProblemDesc({
                          problem_description: event.target.value,
                        })
                      }
                      required
                      autoFocus
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Type:</label>
                  <div className="col-sm-9">
                    <DropdownButton
                      title={selectType}
                      id="bg-nested-dropdown"
                      size="sm"
                      variant="warning"
                    >
                      {_.map(data.types, (type) => (
                        <Dropdown.Item
                          key={type.type_id}
                          eventKey={type.type_id}
                          onSelect={(eventKey) => (
                            setProblemDesc({
                              ...problemDesc,
                              type_id: eventKey,
                            }),
                            setSelectType(type.type_name)
                          )}
                        >
                          {type.type_name}
                        </Dropdown.Item>
                      ))}
                    </DropdownButton>
                  </div>
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
                <p>"{objectDel.problem_description}"</p>
              </div>
            }
            method="POST"
            onSubmit={deleteHandleSubmit}
            button="Yes"
            close="No"
          />
        </div>
      }
    />
  );
}

