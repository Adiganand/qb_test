import React from "react";

const Table = ({ columns, rows }) => {
  return (
    <table className="table table-bordered mt-3">
      <thead
        className="table-head"
        style={{ color: "#FFF", backgroundColor: "#420084" }} //color white and and custom background color
      >
        <tr>
          {columns.map(({ id, name }) => (
            <th className="text-center" scope="col" key={id}>
              {name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((rowData) => (
          <tr key={rowData.id}>
            {columns.map(({ id }) => (
              <td className="text-center" key={id}>
                {rowData[id]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
