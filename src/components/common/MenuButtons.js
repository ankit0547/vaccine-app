import React from "react";

const MenuButtons = ({ btnName, handleSideMenuClick }) => {
  return (
    <div className='d-grid gap-4'>
      <button
        type='button'
        onClick={(e) => handleSideMenuClick(e)}
        className='btn btn-light'
      >
        {btnName}
      </button>
    </div>
  );
};

export default MenuButtons;
