import React, { useState, useEffect } from "react";
import Content from "../components/Content";
import Card from "../components/Card";
import axios from "axios";
import DataTable from "react-data-table-component";
import Cookies from "js-cookie";

export default function Statuses(props) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const token = Cookies.get("token");
  const { user } = props;

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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [user]);

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
