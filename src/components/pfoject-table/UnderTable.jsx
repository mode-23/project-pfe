import { apiCall } from "@/utils/apiCall";
import Image from "next/image";
import React, { useState } from "react";
import * as XLSX from "xlsx/xlsx.mjs";
import styles from "./projecttable.module.css";
import { useRouter } from "next/router";
// import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PopOut from "./PopOut";
import { Toaster, toast } from "react-hot-toast";

const UnderTable = ({
  data,
  fetchProject,
  selectedItems,
  setSelectedItems,
  formatDate,
}) => {
  const { query } = useRouter();
  const [open, setOpen] = useState(false);
  const handleSuccessNotify = (message) => {
    toast.success(message, {
      style: {
        marginTop: "120px",
        marginLeft: "1270px",
        padding: "8px 14px",
        color: "#279b37",
        background: "#a6ffb2",
        fontWeight: 700,
      },
      iconTheme: {
        primary: "#279b37",
        secondary: "#FFFAEE",
      },
    });
  };
  const handleUpdateStatus = async () => {
    if (selectedItems.length) {
      try {
        const res = await apiCall("updateMany", {
          method: "POST",
          body: JSON.stringify({
            array: selectedItems,
          }),
        });
        setSelectedItems([]);
        handleSuccessNotify("Successfully updated");
        console.log(res);
        if (res) {
          setOpen(false);
        }

        fetchProject();
      } catch (error) {
        console.log(error);
      }
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
    <>
      {open && (
        <PopOut handleUpdateStatus={handleUpdateStatus} setOpen={setOpen} />
      )}
      {/* <Toaster /> */}
      {/* <ToastContainer /> */}
      <div className={styles.underHolder}>
        <button
          className={styles.recycleBtn}
          disabled={!selectedItems.length}
          onClick={() => setOpen((prev) => !prev)}
        >
          Recycle
        </button>
        <div className={styles.exportHolder}>
          <h4>export data</h4>
          <div className={styles.underHolderBtn}>
            <button className={styles.underBtn}>
              <Image
                src="/pdf.png"
                alt="Picture of pdf"
                width={25}
                height={25}
              />
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
    </>
  );
};

export default UnderTable;
