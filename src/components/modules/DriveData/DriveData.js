import React, { useContext, useEffect } from "react";
import { AppStore } from "../../../context/AppContext";
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
        Header: "Students Detals Grid",
        columns: [
          {
            Header: "Drive Date",
            accessor: "driveDate",
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
  console.log("##DRIVE>", vaccineData);
  const handleAction = (row, type) => {};

  return (
    <div>
      {/* <TableFilterBar isFilter /> */}
      <TableGrid
        columns={columns}
        data={vaccineData ? vaccineData : []}
        handleAction={handleAction}
        editBtnEn
        deleteBtnEn
        actionCol // status
      />
    </div>
  );
}

export default DriveData;
