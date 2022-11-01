import axios from "axios";
import moment from "moment/moment";
import React, { useContext, useEffect } from "react";
import { appActionTypes, AppStore } from "../../../context/AppContext";
import TableGrid from "../../common/TableGrid/TableGrid";
import { FaTrash, FaEdit } from "react-icons/fa";
import Modal from "../../common/Modal/Modal";

const tt = [
  {
    id: "delete-icon",
    actionIcon: <FaTrash />,
    className: "icon",
  },
  {
    id: "editIcon",
    actionIcon: <FaEdit />,
    className: "icon",
  },
];

const StudentData = ({ getAllStudentsData }) => {
  const { appActionDispatch } = useContext(AppStore);
  const { appState } = useContext(AppStore);
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
            accessor: "tt",
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

  const newTableData = studentData.map((obj) => {
    const newObj = {
      ...obj,
      tt: obj["vaccineStatus"] === true ? "Vaccinated" : "Not Vaccinated",
      formattedDate: moment(obj["date"]).format("DD/MM/YYYY"),
    };
    return newObj;
  });
  const handleAction = (row, type) => {
    console.log("RoW", row, type);
  };
  return (
    <div>
      {/* <Modal modalId={tt}>hdfjdfhj</Modal> */}
      <TableGrid
        columns={columns}
        data={newTableData}
        handleAction={handleAction}
        actionIcons={tt}
        editBtnEn
        deleteBtnEn
      />
    </div>
  );
};

export default StudentData;
