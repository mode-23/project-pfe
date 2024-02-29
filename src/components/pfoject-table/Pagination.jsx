import React from "react";
import styles from "./projecttable.module.css";
const Pagination = ({
  rowsPerPage,
  setRowsPerPage,
  totalRows,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalRows / rowsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className={styles.pagination}>
      {/* <div className={styles.pageNumbers}>
        <button onClick={() => setOpen((prev) => !prev)}>{currentPage}</button>
        <button onClick={() => setOpen((prev) => !prev)}>{currentPage}</button>
          <ul>
            {pageNumbers !== 1 && (
              <>
                {pageNumbers.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => paginate(item)}
                    className={
                      currentPage === item
                        ? `${styles.active} ${styles.pagi}`
                        : `${styles.pagi}`
                    }
                  >
                    {item}
                  </li>
                ))}
              </>
            )}
          </ul>
      </div> */}
      <div className={styles.paginationBtns}>
        {pageNumbers !== 1 && (
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
        <button onClick={() => setRowsPerPage(5)}>5</button>
        <button onClick={() => setRowsPerPage(10)}>10</button>
      </div>
    </div>
  );
};

export default Pagination;
