import React, { useContext } from "react";
import { AppStore } from "../../../context/AppContext";
// import ManageDrive from "../ManageDrive/ManageDrive";
const LandingPage = React.lazy(() => import("../Landing/LandingPage"));
const StudentDetails = React.lazy(() =>
  import("../AddStudents/StudentDetails")
);
const GenerateReport = React.lazy(() =>
  import("../GenerateReport/GenerateReport")
);
const VaccineStatus = React.lazy(() =>
  import("./../VaccineStatus/VaccineStatus")
);
const ManageDrive = React.lazy(() => import("../ManageDrive/ManageDrive"));

const HomePage = () => {
  const { appState } = useContext(AppStore);
  const { defaultLandingPage } = appState;

  return (
    <>
      {defaultLandingPage === 0 && <LandingPage />}
      {defaultLandingPage === 1 && <StudentDetails />}
      {defaultLandingPage === 2 && <VaccineStatus />}
      {defaultLandingPage === 3 && <GenerateReport />}
      {defaultLandingPage === 4 && <ManageDrive />}
    </>
  );
};

export default HomePage;
