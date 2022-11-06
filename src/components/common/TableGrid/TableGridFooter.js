import React from "react";
import { FaGreaterThan, FaLessThan } from "react-icons/fa";

const TableGridFooter = ({
  gotoPage,
  canPreviousPage,
  previousPage,
  canNextPage,
  nextPage,
  pageCount,
  pageIndex,
  pageOptions,
  pageSize,
  setPageSize,
}) => {
  return (
    <div className='pagination'>
      <div>
        Page{" "}
        <strong>
          {pageIndex + 1} of {pageOptions.length}
        </strong>{" "}
      </div>
      <div>
        Go to page:
        <input
          type='number'
          defaultValue={pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            gotoPage(page);
          }}
          style={{ width: "100px" }}
        />
      </div>
      <div>
        <button
          className='btn btn-light'
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          <FaLessThan />
        </button>
        <button
          className='btn btn-light'
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          <FaGreaterThan />
        </button>
      </div>
    </div>
  );
};

export default TableGridFooter;
