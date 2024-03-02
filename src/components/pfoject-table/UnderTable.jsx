import { apiCall } from "@/utils/apiCall";
import Image from "next/image";
import React from "react";
import * as XLSX from "xlsx/xlsx.mjs";
import styles from "./projecttable.module.css";
import { useRouter } from "next/router";
const UnderTable = ({
  data,
  fetchProject,
  selectedItems,
  setSelectedItems,
  formatDate,
}) => {
  const { query } = useRouter();

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
  const handleExportXLSX = () => {
    if (query?.name) {
      let wb = XLSX.utils.book_new(),
        ws = XLSX.utils.json_to_sheet(data);
      XLSX.utils.book_append_sheet(wb, ws, `${query?.name}`);
      XLSX.writeFile(
        wb,
        `${query?.name?.toLocaleUpperCase()}-${formatDate(Date.now())}.xlsx`
      );
    }
  };
  return (
    <div className={styles.underHolder}>
      <button
        className={styles.recycleBtn}
        disabled={!selectedItems.length}
        onClick={handleUpdateStatus}
      >
        Recycle
      </button>
      <div className={styles.exportHolder}>
        <h4>export data</h4>
        <div className={styles.underHolderBtn}>
          <button className={styles.underBtn}>
            <Image src="/pdf.png" alt="Picture of pdf" width={25} height={25} />
          </button>
          <button onClick={handleExportXLSX} className={styles.underBtn}>
            <Image
              src="/xls.png"
              alt="Picture of excel"
              width={25}
              height={25}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnderTable;
