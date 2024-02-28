import { apiCall } from "@/utils/apiCall";
import Image from "next/image";
import React from "react";
import * as XLSX from "xlsx/xlsx.mjs";
import styles from "./projecttable.module.css";
const UnderTable = ({
  data,
  fetchProject,
  selectedItems,
  setSelectedItems,
}) => {
  const handleUpdateStatus = async () => {
    try {
      const res = await apiCall("updateMany", {
        method: "POST",
        body: JSON.stringify({
          array: selectedItems,
        }),
      });
      setSelectedItems([]);
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
    <>
      <div className={styles.underHolder}>
        <button
          className={styles.recycleBtn}
          disabled={!selectedItems.length}
          // onClick={handleUpdateStatus}
        >
          Recycle
        </button>
        <button onClick={handleExport} className={styles.underBtn}>
          <Image
            src="/excel.png"
            alt="Picture of excel"
            width={20}
            height={20}
          />
        </button>
      </div>
    </>
  );
};

export default UnderTable;
