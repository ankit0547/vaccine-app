import produce from "immer";
import React, { createContext, useReducer } from "react";

const initialAppState = {
  themeType: "light",
  counter: 0,
  defaultLandingPage: 0,
  appData: null,
  loading: false,
  studentData: [],
  vaccineData: [],
  filteredData: [],
};

const AppStore = createContext(initialAppState);

const appActionTypes = {
  setTheme: "SET_THEME",
  setLoader: "SET_LOADER",
  setCurrentLandingPage: "SET_CURRENT_LANDING_PAGE",
  setAppData: "SET_APP_DATA",
  IncCounter: "INC_COUNTER",
  setStudentData: "SET_STUDENT_DATA",
  setVaccineData: "SET_VACCINE_DATA",
  setFilteredData: "SET_FILTER_DATA",
};

const AppReducer = (state, action) => {
  console.log("ACT>>", action.payload);
  const { type } = action;
  switch (type) {
    case appActionTypes.setTheme:
      return produce(state, (draftState) => {
        draftState.themeType = action.payload;
      });
    case appActionTypes.setLoader:
      return produce(state, (draftState) => {
        draftState.loading = action.payload;
      });
    case appActionTypes.IncCounter:
      return produce(state, (draftState) => {
        draftState.counter += action.payload;
      });
    case appActionTypes.setCurrentLandingPage:
      return produce(state, (draftState) => {
        draftState.defaultLandingPage = action.payload;
      });
    case appActionTypes.setAppData:
      return produce(state, (draftState) => {
        draftState.appData = action.payload;
      });
    case appActionTypes.setStudentData:
      return produce(state, (draftState) => {
        // debugger;
        draftState.studentData = action.payload;
      });
    case appActionTypes.setVaccineData:
      return produce(state, (draftState) => {
        draftState.vaccineData = action.payload;
      });
    case appActionTypes.setFilteredData:
      return produce(state, (draftState) => {
        draftState.filteredData = action.payload;
      });

    default:
      return state;
  }
};

function AppProvider({ children }) {
  const [appState, appActionDispatch] = useReducer(AppReducer, initialAppState);

  return (
    <AppStore.Provider value={{ appState, appActionDispatch }}>
      {children}
    </AppStore.Provider>
  );
}

export { AppStore, appActionTypes, AppProvider, AppReducer };
