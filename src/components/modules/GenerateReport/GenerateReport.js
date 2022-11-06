import axios from "axios";
import React, { useContext } from "react";
import { appActionTypes, AppStore } from "../../../context/AppContext";
import Report from "./Report";

const GenerateReport = () => {
  return (
    <div className='dashboard-main'>
      <Report />
    </div>
  );
};

export default GenerateReport;
