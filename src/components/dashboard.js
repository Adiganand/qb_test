import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "./table";
import Grid from "./grid";

const Dashboard = () => {
  // setting up the view
  const [list, setList] = useState(true);
  // setting up the data
  const [info, setInfo] = useState([]);
  // async function to get data from backend
  // could have used axios.all
  const getData = async () => {
    const response = await axios.get(
      "https://queuebuster.co/static/sample.json"
    );
    const response1 = await axios.get(
      "https://queuebuster.co/static/sample1.json"
    );
    setInfo([...response.data, ...response1.data]);
  };
  //   console.log(info);

  // arrange everything on first render
  useEffect(() => {
    getData();
  }, []);
  // set icon
  const listIcon = list ? (
    <i className="fas fa-th"></i>
  ) : (
    <i className="fas fa-th-list"></i>
  );
  const iconText = list ? "List view" : "Grid view";
  //stores file related JSON data
  const fileNames = [];
  // store unique file names
  const uniqueFileNames = [];
  // stores symbol related JSON data
  const symbolNames = [];
  // stores unique file name
  const symbolData = [];
  // handle the click on list/grid icon
  const clickHandler = () => {
    setList(!list);
  };
  // to convert snakeCase to title case
  const titleCase = (str) =>
    str
      .split("_")
      .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

  // function to populate JSON data of Files
  const generateFilesData = () => {
    info.forEach((file) => {
      if (!uniqueFileNames.includes(file.file_name)) {
        const name = titleCase(file.file_name);
        fileNames.push({ name, id: file.file_name });
        uniqueFileNames.push(file.file_name);
      }
    });
  };
  // function to populate symbol related data
  const generateSymbolsData = () => {
    info.forEach((file) => {
      if (!symbolNames.includes(file.title_symbol)) {
        symbolData.push({
          id: file.title_symbol,
          symbol: `${
            file.title_symbol.charAt(0).toUpperCase() +
            file.title_symbol.slice(1, file.title_symbol.indexOf("."))
          }`,
          [file.file_name]: file.actual_count,
          count: file.actual_count,
        });
        symbolNames.push(file.title_symbol);
      } else {
        symbolData.forEach((info, index) => {
          if (info.id === file.title_symbol) {
            const newCount = info.count + file.actual_count;
            if (file.file_name in info) {
              symbolData[index] = {
                ...info,
                [file.file_name]: info[file.file_name] + file.actual_count,
                count: newCount,
              };
            } else {
              symbolData[index] = {
                ...info,
                [file.file_name]: file.actual_count,
                count: newCount,
              };
            }
          }
        });
      }
    });
  };
  generateFilesData();
  generateSymbolsData();
  // contruct column data for table
  const columns = [
    { id: "symbol", name: "Symbol" },
    ...fileNames,
    { id: "count", name: "Count of all files" },
  ];
  // construct row data for table
  symbolData.forEach((symbolInfo, index) => {
    fileNames.forEach((file) => {
      if (!(file.id in symbolInfo)) {
        symbolData[index] = { ...symbolInfo, [file.id]: 0 };
      }
    });
  });
  //   console.log(symbolData);
  // construct data for grid i.e. only symbole name, id, and total count
  const gridData = symbolData.map(({ id, symbol, count }) => {
    return { id, symbol, count };
  });
  const renderOutput = list ? (
    <Table id="id" columns={columns} rows={symbolData} />
  ) : (
    <Grid data={gridData} />
  );

  return (
    <React.Fragment>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <span className="navbar-brand">{iconText}</span>
          <span className="icon mr-4" onClick={() => clickHandler()}>
            {listIcon}
          </span>
        </div>
      </nav>
      <div className="container m-2 table-responsive">{renderOutput}</div>
    </React.Fragment>
  );
};

export default Dashboard;
