import React, { useEffect, useRef, useState } from "react";
import styles from "./mainprocess.module.css";
import { LuRefreshCcw } from "react-icons/lu";
import { IoChevronDownSharp } from "react-icons/io5";
import { VscSettings } from "react-icons/vsc";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import { apiCall } from "@/utils/apiCall";
import { useSearchParams } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";
import ProtectedRoute from "../ProtectedRoute";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
// import { Toast } from "primereact/toast";
import "primereact/resources/themes/lara-light-indigo/theme.css";

const MainProcess = () => {
  const [data, setData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [openFilter, setOpenFilter] = useState(true);
  const [loading, setLoading] = useState(false);
  const date1 = useRef();
  const date2 = useRef();
  // const toast = useRef(null);
  const { query, push } = useRouter();
  const searchParams = useSearchParams();
  const searchId = searchParams.get("id");
  const searchStartDate = searchParams.get("startDate");
  const searchEndDate = searchParams.get("endDate");
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
  const handleErrorNotify = (message) => {
    toast.error(message, {
      id: selectedId,
      style: {
        padding: "8px 14px",
        marginTop: "80px",
        marginLeft: "1270px",
        color: "#e4002b",
        background: "#ff9cae",
        fontWeight: 700,
      },
      iconTheme: {
        primary: "#e4002b",
        secondary: "#FFFAEE",
      },
    });
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
  // const showError = (message) => {
  //   toast.current.show({
  //     severity: "error",
  //     summary: "Error",
  //     detail: message,
  //     life: 3000,
  //   });
  // };
  // const showSuccess = (message) => {
  //   toast.current.show({
  //     severity: "success",
  //     summary: "Success",
  //     detail: message,
  //     life: 3000,
  //   });
  // };
  let diff = new Date(selectedEndDate) - new Date(selectedStartDate);
  let diffInDays = diff / (24 * 60 * 60 * 1000);
  const handleSearch = () => {
    if (date1?.current?.value && date2?.current?.value) {
      if (!(diffInDays > 0)) {
        handleErrorNotify("Date start > Date end");
        return;
      }
    }
    if (isNaN(+selectedId)) {
      handleErrorNotify("id must be a number");
      return;
    }
    push(
      `${query.name}?id=${selectedId}&startDate=${selectedStartDate}&endDate=${selectedEndDate}`
    );
  };
  const params = [
    { key: "project", value: query?.name },
    { key: "id", value: +searchId || "" },
    { key: "startDate", value: searchStartDate || "" },
    { key: "endDate", value: searchEndDate || "" },
  ];
  const paramsStr = params.map((item) => `${item.key}=${item.value}`).join("&");
  const fetchFailed = async () => {
    setLoading(true);
    try {
      const res = await apiCall("getFailed?" + paramsStr);

      setData(res);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const formattedData = data.map((obj) => {
    return { ...obj, date: formatDate(obj.date) };
  });
  useEffect(() => {
    if (query.name) {
      fetchFailed();
    }
  }, [query?.name, searchId, searchStartDate, searchEndDate]);
  let array = selectedItems.map((item) => item.id);
  const handleUpdateStatus = async () => {
    if (selectedItems.length) {
      try {
        const res = await apiCall("actionFailed", {
          method: "POST",
          body: JSON.stringify({
            array,
          }),
        });
        setSelectedItems([]);
        handleSuccessNotify("Successfully updated");
        console.log(res);
        fetchFailed();
      } catch (error) {
        console.log(error);
      }
    }
  };
  const buttonSearch = (item) => {
    return (
      <Button
        onClick={() => console.log(item)}
        severity="secondary"
        style={{
          width: "fit-content",
          padding: "10px 15px",
          backgroundColor: "var(--highlight-bg)",
          color: "var(--text-color)",
          border: "0",
        }}
      >
        <FaSearch />
      </Button>
    );
  };
  return (
    <ProtectedRoute>
      <div className={styles.mainProcess}>
        <Toaster position="top-right" reverseOrder={false} />
        {/* <Toast
          ref={toast}
          position="top-right"
        /> */}
        <div className={styles.projectHeader}>
          <button
            className={styles.projectFilter}
            onClick={() => setOpenFilter((prev) => !prev)}
          >
            {openFilter ? <IoChevronDownSharp /> : <VscSettings />}
          </button>
          <button
            className={styles.projectFilter}
            onClick={() => {
              push(`/failed/${query.name}/`);
              setSelectedId("");
              setSelectedStartDate("");
              setSelectedEndDate("");
            }}
          >
            <LuRefreshCcw />
          </button>
        </div>
        <AnimatePresence mode="wait">
          {openFilter && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className={styles.filter}
            >
              <div className={styles.filter_tab}>
                <label className={styles.label} htmlFor="dateStart">
                  start date
                </label>
                <input
                  ref={date1}
                  type="date"
                  id="dateStart"
                  className={styles.calendar_tab}
                  onChange={(e) => setSelectedStartDate(e.target.value)}
                  value={selectedStartDate}
                />
              </div>
              <div className={styles.filter_tab}>
                <label className={styles.label} htmlFor="dateEnd">
                  end date
                </label>
                <input
                  ref={date2}
                  type="date"
                  id="dateEnd"
                  className={styles.calendar_tab}
                  onChange={(e) => setSelectedEndDate(e.target.value)}
                  value={selectedEndDate}
                />
              </div>
              <div className={styles.filter_tab}>
                <label className={styles.label} htmlFor="processId">
                  process id
                </label>
                <input
                  type="text"
                  id="processId"
                  className={styles.calendar_tab}
                  value={selectedId}
                  onChange={(e) => setSelectedId(e.target.value)}
                />
              </div>
              <button className={styles.orangeBtn} onClick={handleSearch}>
                search
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <DataTable
          value={formattedData}
          selection={selectedItems}
          stripedRows
          onSelectionChange={(e) => setSelectedItems(e.value)}
          dataKey="id"
          tableStyle={{ minWidth: "50rem" }}
          paginator
          rows={5}
          loading={loading}
          // rowsPerPageOptions={[5, 10, 25, 50]}
        >
          <Column
            selectionMode="multiple"
            headerStyle={{ width: "3rem" }}
          ></Column>
          <Column
            field="id"
            sortable
            header="Process Id"
            style={{ padding: "15px" }}
          ></Column>
          <Column
            field="name"
            sortable
            header="Process Name"
            style={{ padding: "15px" }}
          ></Column>
          <Column
            field="status"
            header="Status"
            style={{ padding: "15px" }}
          ></Column>
          <Column
            field="date"
            sortable
            header="Action Date"
            style={{ padding: "15px" }}
          ></Column>
          <Column
            field="action"
            header=""
            style={{ padding: "15px" }}
            body={buttonSearch}
          ></Column>
        </DataTable>
        <Button
          label="Abort"
          severity="secondary"
          style={{ width: "fit-content", padding: "10px 15px" }}
          onClick={handleUpdateStatus}
          disabled={!selectedItems.length}
        />
      </div>
    </ProtectedRoute>
  );
};

export default MainProcess;
