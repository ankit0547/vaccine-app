import axios from "axios";
import React, { useContext, useEffect } from "react";
import { appActionTypes, AppStore } from "../../../context/AppContext";
import TableFilterBar from "../../common/TableGrid/TableFilterBar";
import StudentData from "../StudentData/StudentData";

const Report = () => {
  const { appActionDispatch } = useContext(AppStore);
  const getAllStudentsData = async () => {
    appActionDispatch({
      type: appActionTypes.setLoader,
      payload: true,
    });
    try {
      const data = await axios.get("http://localhost:4000/api/v1/student");
      if (data) {
        appActionDispatch({
          type: appActionTypes.setStudentData,
          payload: data.data.data,
        });
        appActionDispatch({
          type: appActionTypes.setLoader,
          payload: false,
        });
      }
      console.log("#DD>", data);
      return data;
    } catch (err) {
      console.log("error: ", err);
    }
  };

  return (
    <div>
      <TableFilterBar isFilter />
      <StudentData getAllStudentsData={getAllStudentsData} />
    </div>
  );
};

export default Report;
