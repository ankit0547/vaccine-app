import React from "react";

const TableFilterBar = ({ handleFilter }) => {
  return (
    <div className='d-flex justify-content-end align-items-center'>
      <div className='mx-5'>
        <select onChange={(val) => handleFilter({ val, type: "dropDown" })}>
          <option value='All'>All</option>
          <option value='true'>Vaccinated</option>
          <option value='false'>Not Vaccinated</option>
        </select>
      </div>
      <button className='btn btn-primary'>Generate report</button>
    </div>
  );
};

export default TableFilterBar;
