import React from "react";
import _ from "lodash";

export default function MyDataTable(props) {
  return (
    <div>
      {/* <div className="card-header">
        <h3 className="card-title">DataTable with default features</h3>
      </div> */}
      {/* /.card-header */}
      <div className="card-body">
        <table id={props.id} className="table table-striped table-hover">
          <thead>
            <tr>
              {_.map(props.cols, (col) => (
                <th>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>
      {/* /.card-body */}
    </div>
  );
}
