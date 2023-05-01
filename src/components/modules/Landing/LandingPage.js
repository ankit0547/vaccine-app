import axios from "axios";
import React, { useContext, useEffect } from "react";
import { appActionTypes, AppStore } from "../../../context/AppContext";
import { API } from "../../../utils/ApiCall";

const LandingPage = () => {
  const { appActionDispatch } = useContext(AppStore);
  const getRandomUser = async () => {
    console.log("#>>>>");
    debugger;
    const action = {
      appActionDispatch,
    };
    API(action);
    // appActionDispatch({
    //   type: appActionTypes.setLoader,
    //   payload: true,
    // });
    // try {
    //   const data = await axios.get("http://localhost:4000/api/v1/landing");
    //   if (data) {
    //     appActionDispatch({
    //       type: appActionTypes.setAppData,
    //       payload: data.data.data,
    //     });
    //     appActionDispatch({
    //       type: appActionTypes.setLoader,
    //       payload: false,
    //     });
    //   }
    //   console.log("#DD>", data);
    //   return data;
    // } catch (err) {
    //   console.log("error: ", err);
    // }
  };

  useEffect(() => {
    getRandomUser();
  }, []);
  const { appState } = useContext(AppStore);
  const { appData, loading } = appState;
  return (
    <div className='dashboard-main'>
      <div className='d-flex card-container flex-wrap'>
        <div className='card'>
          <div className='card-body'>
            <h6 className='card-title'>Number of students vaccinated</h6>
            <span className='card-text'>{`${appData?.vaccinatedStudents}/${appData?.studentsCount}`}</span>
          </div>
        </div>
        <div className='card'>
          <div className='card-body'>
            <h6 className='card-title'>Upcoming vaccination drives</h6>
            <span className='card-text'>
              {appData?.drivesCount === 0 ? "No Drive" : appData?.drivesCount}
            </span>
          </div>
        </div>
        {/* <div className='card'>
          <div className='card-body'>
            {JSON.stringify(appData, null, 3)}
          </div>
        </div> */}

        {/* <button
          type='button'
          class='btn btn-primary'
          data-bs-toggle='modal'
          data-bs-target='#exampleModal'
        >
          Launch demo modal
        </button>
        <div className='modal' id='exampleModal' tabindex='-1'>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title'>Modal title</h5>
                <button
                  type='button'
                  className='btn-close'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                ></button>
              </div>
              <div className='modal-body'>
                <p>Modal body text goes here.</p>
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-bs-dismiss='modal'
                >
                  Close
                </button>
                <button type='button' className='btn btn-primary'>
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className='dropdown'>
          <button
            className='btn btn-secondary dropdown-toggle'
            type='button'
            data-bs-toggle='dropdown'
            aria-expanded='false'
          >
            Dropdown button
          </button>
          <ul className='dropdown-menu dropdown-menu-dark'>
            <li>
              <a className='dropdown-item active' href='#'>
                Action
              </a>
            </li>
            <li>
              <a className='dropdown-item' href='#'>
                Another action
              </a>
            </li>
            <li>
              <a className='dropdown-item' href='#'>
                Something else here
              </a>
            </li>
            <li>
              <hr className='dropdown-divider' />
            </li>
            <li>
              <a className='dropdown-item' href='#'>
                Separated link
              </a>
            </li>
          </ul>
        </div> */}
      </div>
    </div>
  );
};

export default LandingPage;
