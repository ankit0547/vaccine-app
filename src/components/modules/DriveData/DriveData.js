import axios from "axios";
import moment from "moment";
import React, { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { appActionTypes, AppStore } from "../../../context/AppContext";
import TableFilterBar from "../../common/TableGrid/TableFilterBar";
import TableGrid from "../../common/TableGrid/TableGrid";

function DriveData({ getAllDriveData }) {
  const { appState, appActionDispatch } = useContext(AppStore);
  const { vaccineData } = appState;

  useEffect(() => {
    getAllDriveData();
  }, []);
  const columns = React.useMemo(
    () => [
      {
        Header: "Drive Details",
        columns: [
          {
            Header: "Drive Date",
            accessor: "formattedDate",
          },
          {
            Header: "Number of Vaccines",
            accessor: "numberOfVaccines",
          },
        ],
      },
    ],
    []
  );

  const newTableData = vaccineData.map((obj) => {
    const newObj = {
      ...obj,
      formattedDate: moment(obj["driveDate"]).format("DD/MM/YYYY"),
    };
    return newObj;
  });
  const handleAction = async (row, type) => {
    if (type === "delete") {
      const data = await axios.delete(
        `http://localhost:4800/api/v1/vaccineDrive?id=${row.original._id}`
      );
      if (data) {
        getAllDriveData();
        appActionDispatch({
          type: appActionTypes.setLoader,
          payload: false,
        });
        const notify = () => toast("Drive Delete Successfully 😲!");
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
        editBtnEn
        deleteBtnEn
        actionCol // status
      />
    </div>
  );
}

export default DriveData;
