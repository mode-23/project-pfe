import React, { useState } from "react";
import styles from "./projecttable.module.css";
import UnderTable from "./UnderTable";
import Pagination from "./Pagination";
import EmptyTable from "./EmptyTable";
import { motion } from "framer-motion";
const ProjectTable = ({
  data,
  loading,
  fetchProject,
  currentPage,
  setCurrentPage,
}) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const checkBoxSelected = (e, data) => {
    const { name } = e.target;
    if (name !== "selectAll") {
      if (!selectedItems.includes(+name)) {
        setSelectedItems([...selectedItems, +name]);
      } else {
        setSelectedItems(selectedItems.filter((item) => +item !== +name));
      }
    } else {
      setSelectedItems([]);
      if (selectedItems.length !== data?.length) {
        const list = [];
        data?.forEach((item) => {
          list.push(item?.id);
          setSelectedItems(list);
        });
      } else {
        setSelectedItems([]);
      }
    }
  };
  const formatDate = (value) => {
    const formattedValue = new Date(value);
    let format = `${formattedValue.getFullYear()}-${
      formattedValue.getMonth() + 1 > 9
        ? formattedValue.getMonth() + 1
        : "0" + (formattedValue.getMonth() + 1)
    }-${
      formattedValue.getDate() > 9
        ? formattedValue.getDate()
        : "0" + formattedValue.getDate()
    }`;
    return format;
  };

  // const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexofFirsRow = indexOfLastRow - rowsPerPage;
  const currentRows = data?.slice(indexofFirsRow, indexOfLastRow);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className={`${styles.table}`}>
      <div className={`${styles.tableHeader} ${styles.grid}`}>
        <span className={styles.checkBox}>
          <input
            type="checkbox"
            name={"selectAll"}
            id={"selectAll"}
            onChange={(e) => checkBoxSelected(e, data)}
            checked={selectedItems.length === data?.length && data?.length > 0}
          />
        </span>
        <span>process id</span>
        <span>process name</span>
        <span>failure date</span>
        <span>status</span>
      </div>
      {loading ? (
        <div className={styles.emptyTable}>loading...</div>
      ) : (
        <motion.div className={styles.tableHolder} layout layoutRoot>
          {data?.length ? (
            <>
              {currentRows?.map((item) => (
                <motion.div
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  exit={{ opacity: 0 }}
                  layout
                  className={`${styles.tableTab} ${styles.grid}`}
                  key={item.id}
                >
                  <span className={styles.checkBox}>
                    <input
                      type="checkbox"
                      id={+item.id}
                      name={+item.id}
                      onChange={(e) => checkBoxSelected(e, data)}
                      checked={
                        selectedItems.includes(+item.id) ||
                        selectedItems.includes("selectAll")
                      }
                    />
                  </span>
                  <span>{item.id}</span>
                  <span>
                    <input
                      type="text"
                      readOnly
                      className={styles.input}
                      value={item.name}
                    />
                  </span>
                  <span>{formatDate(item.date)}</span>
                  <span>
                    <p
                      className={`${styles.status} ${
                        item.status === "active"
                          ? styles.active
                          : styles.unactive
                      }`}
                    >
                      {item.status}
                    </p>
                  </span>
                </motion.div>
              ))}
            </>
          ) : (
            <EmptyTable />
          )}
        </motion.div>
      )}
      {data?.length > 0 && (
        <>
          <Pagination
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            totalRows={data?.length}
            paginate={paginate}
            currentPage={currentPage}
          />
          <UnderTable
            formatDate={formatDate}
            fetchProject={fetchProject}
            data={data}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
          />
        </>
      )}
    </div>
  );
};

export default ProjectTable;
