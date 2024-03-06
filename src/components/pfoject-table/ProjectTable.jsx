import React, { useState } from "react";
import styles from "./projecttable.module.css";
import UnderTable from "./UnderTable";
import Pagination from "./Pagination";
import EmptyTable from "./EmptyTable";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";
const ProjectTable = ({
  data,
  loading,
  fetchProject,
  currentPage,
  setCurrentPage,
}) => {
  console.log(data);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);
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
  const handleTasks = (e, type, content) => {
    if (type !== "all") {
      if (e.target.checked) {
        setSelectedTasks([...selectedTasks, +content.taskprocess.id]);
      } else {
        if (selectedTasks.includes(+e.target.id)) {
          setSelectedTasks(
            selectedTasks.filter((item) => +item !== +content.taskprocess.id)
          );
        }
      }
    } else {
      setSelectedTasks([]);
      if (selectedTasks.length !== data?.length) {
        const list = [];
        data?.forEach((item) => {
          list.push(item?.taskprocess.id);
          setSelectedTasks(list);
        });
      } else {
        setSelectedTasks([]);
      }
    }
  };
  console.log(selectedTasks);
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
            onChange={(e) => {
              checkBoxSelected(e, data);
              handleTasks(e, "all", data);
            }}
            checked={selectedItems.length === data?.length && data?.length > 0}
          />
        </span>
        <span>process id</span>
        <span>task id</span>
        <span>task name</span>
        <span>process name</span>
        <span>failure date</span>
        <span>status</span>
        {/* <span></span> */}
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
                  className={
                    selectedItems.includes(+item.id) ||
                    selectedItems.includes("selectAll")
                      ? `${styles.tableTab} ${styles.grid} ${styles.active}`
                      : `${styles.tableTab} ${styles.grid}`
                  }
                  key={"item" + item.id}
                >
                  <span className={styles.checkBox}>
                    <input
                      type="checkbox"
                      id={+item.taskprocess.id}
                      name={+item.id}
                      onChange={(e) => {
                        checkBoxSelected(e, data);
                        handleTasks(e, "processId", item);
                      }}
                      checked={
                        selectedItems.includes(+item.id) ||
                        selectedItems.includes("selectAll")
                      }
                    />
                  </span>
                  <span>{item.taskprocess.id}</span>
                  <span>{item.id}</span>
                  <span>
                    <input
                      type="text"
                      readOnly
                      className={styles.input}
                      value={item.name}
                    />
                  </span>
                  <span>
                    <input
                      type="text"
                      readOnly
                      className={styles.input}
                      value={item.taskprocess.name}
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
                  {/* <span>
                    <button className={styles.searchBtn}>
                      <FaSearch />
                    </button>
                  </span> */}
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
