import { useContext } from "react";
import { appActionTypes, AppStore } from "./AppContext";

export const DispatchLoader = (val) => {
  const { appActionDispatch } = useContext(AppStore);
  appActionDispatch({
    type: appActionTypes.setLoader,
    payload: val,
  });
};
