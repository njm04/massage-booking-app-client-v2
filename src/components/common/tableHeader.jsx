import React from "react";

const TableHeader = (props) => {
  const { columns } = props;
  return (
    <thead>
      <tr>
        {columns.map((column, index) => (
          <th key={index}> {column.label}</th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
