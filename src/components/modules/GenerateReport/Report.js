import axios from "axios";
import moment from "moment";
import React, { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { appActionTypes, AppStore } from "../../../context/AppContext";
import TableFilterBar from "../../common/TableGrid/TableFilterBar";
import TableGrid from "../../common/TableGrid/TableGrid";
import TableGridNoAction from "../../common/TableGrid/TableGridNoAction";
import StudentData from "../StudentData/StudentData";

const Report = ({ getAllStudentsData }) => {
  const { appState, appActionDispatch } = useContext(AppStore);
  const { filteredData, studentData } = appState;
  useEffect(() => {
    getAllStudentsData();
  }, []);
  const columns = React.useMemo(
    () => [
      {
        Header: "Students filtered details",
        columns: [
          {
            Header: "Date",
            accessor: "formattedDate",
          },
          {
            Header: "Student Name",
            accessor: "studentName",
          },

          {
            Header: "Vaccine Status",
            accessor: "vaccineStatusStr",
          },
          {
            Header: "Vaccine Name",
            accessor: "vaccineName",
          },
        ],
      },
    ],
    []
  );

  const newTableData = filteredData?.map((obj) => {
    const newObj = {
      ...obj,
      vaccineStatusStr:
        obj["vaccineStatus"] === true ? "Vaccinated" : "Not Vaccinated",
      vaccineStatus: obj["vaccineStatus"] === true ? true : false,
      formattedDate: moment(obj["date"]).format("DD/MM/YYYY"),
    };
    return newObj;
  });
  const handleFilter = async ({ val, type }) => {
    appActionDispatch({
      type: appActionTypes.setLoader,
      payload: true,
    });

    const data = await axios.get(
      `http://localhost:4000/api/v1/report/generate-report?filterCriteria=${val.target.value}`
    );
    if (data) {
      appActionDispatch({
        type: appActionTypes.setFilteredData,
        payload: data.data,
      });
      appActionDispatch({
        type: appActionTypes.setLoader,
        payload: false,
      });
    }

    console.log("##>", val.target.value, type);
  };

  const getData = async () => {
    appActionDispatch({
      type: appActionTypes.setLoader,
      payload: true,
    });

    const data = await axios.get(
      `http://localhost:4000/api/v1/report/generate-report?filterCriteria=all`
    );
    if (data) {
      appActionDispatch({
        type: appActionTypes.setFilteredData,
        payload: data.data,
      });
      appActionDispatch({
        type: appActionTypes.setLoader,
        payload: false,
      });
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <TableFilterBar handleFilter={handleFilter} />
      <TableGridNoAction
        columns={columns}
        data={newTableData ? newTableData : []}
        // handleAction={handleAction}
        editBtnEn
        deleteBtnEn
        // status
      />
    </div>
  );
};

export default Report;
