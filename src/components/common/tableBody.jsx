import React from "react";
import _ from "lodash";

const TableBody = (props) => {
  const { data, columns } = props;

  // gets the value from object based on path/key
  const renderCell = (item, column) => {
    if (column.content) return column.content();
    return _.get(item, column.path);
  };

  const createKey = (item, column) => {
    return item.id + (column.path || column.key);
  };

  return (
    <tbody>
      {/* check if there are values to avoid map operation error */}
      {data && columns
        ? data.map((item) => (
            <tr key={item.id}>
              {columns.map((column) => (
                <td key={createKey(item, column)}>
                  {renderCell(item, column)}
                </td>
              ))}
            </tr>
          ))
        : null}
    </tbody>
  );
};

export default TableBody;
