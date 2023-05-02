import axios from "axios";
import moment from "moment/moment";
import React, { useContext, useEffect, useState } from "react";
import { appActionTypes, AppStore } from "../../../context/AppContext";
import TableGrid from "../../common/TableGrid/TableGrid";
import { toast } from "react-toastify";

const StudentData = ({ getAllStudentsData }) => {
  const { appState, appActionDispatch } = useContext(AppStore);
  const { studentData } = appState;
  // const [tableData, setTableData] = useState([]);

  useEffect(() => {
    getAllStudentsData();
  }, []);
  const columns = React.useMemo(
    () => [
      {
        Header: "Students Detals Grid",
        columns: [
          // {
          //   Header: "ID",
          //   accessor: "_id",
          // },
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

  const newTableData = studentData?.map((obj) => {
    const newObj = {
      ...obj,
      vaccineStatusStr:
        obj["vaccineStatus"] === true ? "Vaccinated" : "Not Vaccinated",
      vaccineStatus: obj["vaccineStatus"] === true ? true : false,
      formattedDate: moment(obj["date"]).format("DD/MM/YYYY"),
    };
    return newObj;
  });

  console.log("#DATA", newTableData);
  const handleAction = async (row, type) => {
    appActionDispatch({
      type: appActionTypes.setLoader,
      payload: true,
    });
    console.log("RoW", row, type);
    if (type === "edit") {
      // alert("Edit");
      const data = await axios.get("http://localhost:4800/student");
      if (data) {
        getAllStudentsData();
        appActionDispatch({
          type: appActionTypes.setLoader,
          payload: false,
        });
        const notify = () => toast("Student Edit Successfully 😲!");
        notify();
      }
    }
    if (type === "delete") {
      // alert("Edit");
      const data = await axios.delete(
        `http://localhost:4800/student/delete?id=${row.original._id}`
      );
      if (data) {
        getAllStudentsData();
        appActionDispatch({
          type: appActionTypes.setLoader,
          payload: false,
        });
        const notify = () => toast("Student Delete Successfully 😲!");
        notify();
      }
    }
    if (type === "status") {
      // alert("Status");
      const data = await axios.put(
        `http://localhost:4800/student/statusUpdate`,
        { id: row.original._id }
      );
      if (data) {
        getAllStudentsData();
        appActionDispatch({
          type: appActionTypes.setLoader,
          payload: false,
        });
        const notify = () =>
          toast("Student Vaccination Status Update Successfully 😲!");
        notify();
      }
    }
  };
  return (
    <div>
      <TableGrid
        columns={columns}
        data={newTableData ? newTableData : []}
        handleAction={handleAction}
        // editBtnEn
        deleteBtnEn
        actionCol
      />
    </div>
  );
};

export default StudentData;
