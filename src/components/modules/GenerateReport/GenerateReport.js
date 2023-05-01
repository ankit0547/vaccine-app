import axios from "axios";
import React, { useContext } from "react";
import { appActionTypes, AppStore } from "../../../context/AppContext";
import Report from "./Report";

const GenerateReport = () => {
  const { appActionDispatch } = useContext(AppStore);
  const getAllStudentsData = async () => {
    appActionDispatch({
      type: appActionTypes.setLoader,
      payload: true,
    });
    try {
      const data = await axios.get("http://localhost:4800/student");
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
    <div className='dashboard-main'>
      <h1 className='display-6 mb-4'>Generate Report</h1>
      <Report getAllStudentsData={getAllStudentsData} />
    </div>
  );
};

export default GenerateReport;
