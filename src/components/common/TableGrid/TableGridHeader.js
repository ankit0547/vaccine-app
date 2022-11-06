import React from "react";
import TableFilterBar from "./TableFilterBar";

const TableGridHeader = ({ isFilter, pageSize, setPageSize }) => {
  return (
    <div>
      {isFilter && <TableFilterBar />}
      {!isFilter && (
        <div className='ms-auto'>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[4, 8, 12, 16, 20].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>{" "}
        </div>
      )}
    </div>
  );
};

export default TableGridHeader;
