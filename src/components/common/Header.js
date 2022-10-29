import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { appActionTypes, AppStore } from "../../context/AppContext";

const Header = () => {
  const { appActionDispatch } = useContext(AppStore);
  const handleHome = () => {
    appActionDispatch({
      type: appActionTypes.setCurrentLandingPage,
      payload: 0,
    });
  };
  return (
    <div>
      <nav className='navbar navbar-expand-lg bg-light'>
        <div className='container'>
          <h3 className='navbar-brand' onClick={handleHome}>
            SchoolApp
          </h3>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          {/* <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
              <li className='nav-item'>
                <Link className='nav-link active' aria-current='page' href='#'>
                  Sign In
                </Link>
              </li>
              <li className='nav-item'>
                <a className='nav-link' href='#'>
                  Sign up
                </a>
              </li>
            </ul>
          </div> */}
        </div>
      </nav>
    </div>
  );
};

export default Header;
