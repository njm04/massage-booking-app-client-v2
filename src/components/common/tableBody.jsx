import React from "react";

const TableBody = (props) => {
  const { data, columns } = props;
  console.log(data);
  return (
    <tbody>
      {data.map((item) => (
        <tr key={item._id}>
          {columns.map((column) => (
            <td>{item._id}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
