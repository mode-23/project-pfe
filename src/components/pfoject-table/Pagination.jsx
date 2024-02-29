import React, { useState } from "react";
import styles from "./projecttable.module.css";
const Pagination = ({
  rowsPerPage,
  setRowsPerPage,
  totalRows,
  paginate,
  currentPage,
}) => {
  const [open, setOpen] = useState(false);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalRows / rowsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className={styles.pagination}>
      <div className={styles.paginationBtns}>
        {pageNumbers.length > 1 && (
          <>
            {pageNumbers.map((item, index) => (
              <button
                key={index}
                onClick={() => paginate(item)}
                className={
                  currentPage === item
                    ? `${styles.active} ${styles.pagi}`
                    : `${styles.pagi}`
                }
              >
                {item}
              </button>
            ))}
          </>
        )}
      </div>
      <div className={styles.paginationBtns}>
        <span
          onClick={() => setOpen((prev) => !prev)}
          className={open ? `${styles.active}` : null}
        >
          rows: {rowsPerPage}
        </span>
        {open && (
          <div className={styles.dropDownPagination}>
            <button
              onClick={() => setRowsPerPage(5)}
              className={rowsPerPage === 5 ? `${styles.active}` : null}
            >
              5
            </button>
            <button
              onClick={() => setRowsPerPage(10)}
              className={rowsPerPage === 10 ? `${styles.active}` : null}
            >
              10
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pagination;
