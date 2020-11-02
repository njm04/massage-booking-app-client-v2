import React from "react";
import { Table as BootstrapTable } from "react-bootstrap";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = (props) => {
  const { columns, data } = props;

  return (
    <BootstrapTable striped bordered hover responsive>
      <TableHeader columns={columns} />
      <TableBody columns={columns} data={data} />
    </BootstrapTable>
  );
};

export default Table;
