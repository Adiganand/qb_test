import React from "react";

const Grid = ({ data }) => {
  const renderGrid = data
    .sort((a, b) => 100 - a.count - b.count)
    .map((data) => {
      return (
        <div
          key={data.id}
          className="m-1 p-1 flex-shrink-1 d-flex justify-content-center flex-fill align-items-center"
          style={{
            width: `${data.count}vw`,
            minWidth: `min-content`,
            height: "5rem",
            backgroundColor: "#420084",
            margin: "1em",
            color: "#FFF",
          }}
        >
          <div className="symbol">{data.symbol}</div>
        </div>
      );
    });
  return (
    <div className="container">
      <div className="d-flex flex-wrap">{renderGrid}</div>
    </div>
  );
};

export default Grid;
