import React, { useContext, useEffect } from "react";
import { appActionTypes, AppStore } from "../../../context/AppContext";
const LandingPage = React.lazy(() => import("../Landing/LandingPage"));
const StudentDetails = React.lazy(() =>
  import("../AddStudents/StudentDetails")
);
const VaccineDrive = React.lazy(() => import("../VaccineDrive/VaccineDrive"));
const GenerateReport = React.lazy(() =>
  import("../GenerateReport/GenerateReport")
);
const ManageVaccineStatus = React.lazy(() =>
  import("../ManageVaccineStatus/ManageVaccineStatus")
);

const HomePage = () => {
  const { appState, appActionDispatch } = useContext(AppStore);
  const { defaultLandingPage } = appState;

  useEffect(() => {
    appActionDispatch({
      type: appActionTypes.setStudentData,
      payload: [],
    });
  }, []);

  return (
    <>
      {defaultLandingPage === 0 && <LandingPage />}
      {defaultLandingPage === 1 && <StudentDetails />}
      {defaultLandingPage === 2 && <VaccineDrive />}
      {defaultLandingPage === 3 && <GenerateReport />}
      {defaultLandingPage === 4 && <ManageVaccineStatus />}
    </>
  );
};

export default HomePage;
