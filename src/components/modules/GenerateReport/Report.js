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
  const { studentData } = appState;
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
  console.log("#DATA???????????", studentData);
  const handleAction = async (row, type) => {
    appActionDispatch({
      type: appActionTypes.setLoader,
      payload: true,
    });
    console.log("RoW", row, type);
    if (type === "edit") {
      // alert("Edit");
      const data = await axios.get("http://localhost:4000/api/v1/student");
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
        `http://localhost:4000/api/v1/student/delete?id=${row.original._id}`
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
        `http://localhost:4000/api/v1/report/generate-report`,
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

  const handleFilter = async ({ val, type }) => {
    // appActionDispatch({
    //   type: appActionTypes.setLoader,
    //   payload: true,
    // });

    const data = await axios.get(
      `http://localhost:4000/api/v1/report/generate-report?filterCriteria=${val.target.value}`
    );

    console.log("DA>>>>>>>>>>>>>>>>>>>>>>>>", data);
    if (data) {
      // getAllStudentsData();
      appActionDispatch({
        type: appActionTypes.setStudentData,
        payload: data.data.data,
      });
      const notify = () =>
        toast("Student Vaccination Status Update Successfully 😲!");
      notify();
    }
    console.log("##>", val.target.value, type);
  };
  return (
    <div>
      <TableFilterBar handleFilter={handleFilter} />
      <TableGridNoAction
        columns={columns}
        data={newTableData ? newTableData : []}
        handleAction={handleAction}
        editBtnEn
        deleteBtnEn
        // status
      />
    </div>
  );
};

export default Report;
