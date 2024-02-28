import React, { useState } from "react";
import styles from "./projecttable.module.css";
import { apiCall } from "@/utils/apiCall";
import * as XLSX from "xlsx/xlsx.mjs";

const ProjectTable = ({ data, loading, fetchProcess, fetchProject }) => {
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
  const handleUpdateStatus = async () => {
    try {
      const res = await apiCall("updateMany", {
        method: "POST",
        body: JSON.stringify({
          array: selectedItems,
        }),
      });
      // fetchProcess();
      fetchProject();
    } catch (error) {
      console.log(error);
    }
  };
  const handleExport = () => {
    let wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "filetest");
    XLSX.writeFile(wb, "exceltest.xlsx");
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
        <span>id</span>
        <span>name</span>
        <span>date</span>
        <span>status</span>
      </div>
      {loading ? (
        <>loading...</>
      ) : (
        <div>
          {data?.length ? (
            <>
              {data?.map((item) => (
                <div
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
                </div>
              ))}
            </>
          ) : (
            <div>no data ...</div>
          )}
        </div>
      )}
      <button onClick={handleExport}>export</button>
      {/* <button onClick={handleUpdateStatus}>apply</button> */}
    </div>
  );
};

export default ProjectTable;
