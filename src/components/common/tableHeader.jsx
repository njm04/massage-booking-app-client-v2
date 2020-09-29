import React from "react";

const TableHeader = (props) => {
  const { columns } = props;
  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th key={column.path || column.key}>
            {column.label ? column.label : ""}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
