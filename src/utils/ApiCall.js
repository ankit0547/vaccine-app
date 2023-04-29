import axios from "axios";
import { appActionTypes } from "../context/AppContext";
const URL = process.env.REACT_APP_LOCAL_BASE_URL;

export const API = {
  invoke: async (action, payload) => {
    try {
      const data = await axios.get("http://localhost:4000/api/v1/landing");
      if (data) {
        action.appActionDispatch({
          type: appActionTypes.setAppData,
          payload: data.data.data,
        });
        action.appActionDispatch({
          type: appActionTypes.setLoader,
          payload: false,
        });
      }
      console.log("#DD>", data);
      return data;
    } catch (err) {
      console.log("error: ", err);
    }
  },
};
