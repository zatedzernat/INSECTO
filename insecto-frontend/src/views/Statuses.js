import React, { useState, useEffect } from "react";
import Content from "../components/Content";
import Card from "../components/Card";
import axios from "axios";
import DataTable from "react-data-table-component";
import moment from "moment";

export default function Statuses() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}statuses`);
      setData(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(JSON.stringify(error.response.data.errors));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const statusTable = (data) => {
    const columns = [
      {
        name: "#",
        selector: "status_id",
        sortable: true,
      },
      {
        name: "Status Name*",
        selector: "status_name",
        sortable: true,
      },
      {
        name: "Description",
        selector: "status_description",
        sortable: true,
      },
    ];

    return (
      <DataTable
        columns={columns}
        data={data.statuses}
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
        <Card
          title={
            <div>
              <h2>Statuses</h2>
              <h6>รายการสถานะทั้งหมด</h6>
            </div>
          }
          body={statusTable(data)}
          loading={isLoading ? "overlay" : ""}
        />
      }
    />
  );
}
