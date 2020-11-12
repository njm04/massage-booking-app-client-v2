import React from "react";
import { Table as BootstrapTable } from "react-bootstrap";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = (props) => {
  const { columns, data, onSort, sortColumn } = props;

  return (
    <BootstrapTable striped bordered hover responsive>
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody columns={columns} data={data} />
    </BootstrapTable>
  );
};

export default Table;
