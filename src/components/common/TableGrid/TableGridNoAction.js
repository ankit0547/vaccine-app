import React from "react";
import styled from "styled-components";
import { useTable, useRowSelect, usePagination, useFilters } from "react-table";
// import BTable from "react-bootstrap/Table";
import { FaTrash, FaEdit } from "react-icons/fa";
import TableGridFooter from "./TableGridFooter";
import TableGridHeader from "./TableGridHeader";
const Styles = styled.div`
  /* This is required to make the table full-width */
  display: block;
  max-width: 100%;

  /* This will make the table scrollable when it gets too small */
  .tableWrap {
    display: block;
    max-width: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
    border-bottom: 1px solid black;
  }

  table {
    /* Make sure the inner table is always as wide as needed */
    width: 100%;
    border-spacing: 0;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      /* The secret sauce */
      /* Each cell should grow equally */
      width: 1%;
      /* But "collapsed" cells should be as small as possible */
      &.collapse {
        width: 0.0000000001%;
      }

      :last-child {
        border-right: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`;

const getActionCol = ({ editBtnEn, deleteBtnEn, status, handleAction }) => ({
  id: "delete-selection",
  // The header can use the table's getToggleAllRowsSelectedProps method
  // to render a checkbox
  Header: "Action",
  // The cell can use the individual row's getToggleRowSelectedProps method
  // to the render a checkbox
  Cell: ({ row }) => {
    console.log("##ROW", row.original.vaccineStatus);
    return (
      <>
        {editBtnEn && (
          <span className='icon' onClick={() => handleAction(row, "edit")}>
            <FaEdit />
          </span>
        )}
        {deleteBtnEn && (
          <span className='icon' onClick={() => handleAction(row, "delete")}>
            <FaTrash />
          </span>
        )}
        {status && (
          <span className='icon'>
            <input
              onClick={() => handleAction(row, "status")}
              class='form-check-input'
              type='checkbox'
              checked={row.original.vaccineStatus}
              // value={row.original.vaccineStatus}
              id='flexCheckDefault'
              disabled={row.original.vaccineStatus}
            />
          </span>
        )}
      </>
    );
  },
});

const TableGridNoAction = ({
  columns,
  data,
  handleAction,
  deleteBtnEn,
  editBtnEn,
  status,
  actionCol,
}) => {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 4 },
    },
    useFilters,
    usePagination,
    useRowSelect
  );
  return (
    <Styles>
      <div className='tableWrap'>
        <TableGridHeader pageSize={pageSize} setPageSize={setPageSize} />
        <table {...getTableProps()} className='table table-striped'>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <TableGridFooter
        gotoPage={gotoPage}
        canPreviousPage={canPreviousPage}
        previousPage={previousPage}
        canNextPage={canNextPage}
        nextPage={nextPage}
        pageCount={pageCount}
        pageIndex={pageIndex}
        pageOptions={pageOptions}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
    </Styles>
  );
};

export default TableGridNoAction;
