import React from "react";

const TableHeader = (props) => {
  const { columns, onSort, sortColumn = {} } = props;

  const raiseSort = (path) => {
    if (path === "name" || path === "therapistName" || path === "createdBy") {
      if (sortColumn.path === path) {
        const order = sortColumn.order === "asc" ? "desc" : "asc";
        onSort({ path, order });
      } else {
        onSort({ path, order: "asc" });
      }
    }
  };

  const renderSortIcon = (column) => {
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <i className="fas fa-sort-up"></i>;
    return <i className="fas fa-sort-down"></i>;
  };

  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th
            className={clickable(column.path)}
            key={column.path || column.key}
            onClick={() => (column.path ? raiseSort(column.path) : null)}
          >
            {column.label ? column.label : ""} {renderSortIcon(column)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

const clickable = (path) => {
  if (path === "name" || path === "therapistName" || path === "createdBy") {
    return "clickable";
  }
};

export default TableHeader;
