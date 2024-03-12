import React, { useEffect, useRef, useState } from "react";
import styles from "../history.module.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Toaster, toast } from "react-hot-toast";
import { IoChevronDownSharp } from "react-icons/io5";
import { VscSettings } from "react-icons/vsc";
import { FaSearch } from "react-icons/fa";
import { LuRefreshCcw } from "react-icons/lu";
import { AnimatePresence, motion } from "framer-motion";
import { apiCall } from "@/utils/apiCall";
import * as XLSX from "xlsx/xlsx.mjs";
import Image from "next/image";

const History = ({ currentProject }) => {
  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [openFilter, setOpenFilter] = useState(true);
  const [loading, setLoading] = useState(false);
  const date1 = useRef();
  const date2 = useRef();
  const { query, push } = useRouter();
  const searchParams = useSearchParams();
  const searchId = searchParams.get("id");
  const searchStatus = searchParams.get("status");
  const searchStartDate = searchParams.get("startDate");
  const searchEndDate = searchParams.get("endDate");
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
  let diff = new Date(selectedEndDate) - new Date(selectedStartDate);
  let diffInDays = diff / (24 * 60 * 60 * 1000);
  const handleSearch = () => {
    if (selectedStartDate && selectedEndDate) {
      if (!(diffInDays > 0)) {
        handleErrorNotify("End date must be more than start date");
        return;
      }
    }
    if (isNaN(+selectedId)) {
      handleErrorNotify("id must be a number");
      return;
    }
    if (selectedStatus.name) {
      push(
        `${query.name}?id=${selectedId}&status=${
          selectedStatus.name
        }&startDate=${
          selectedStartDate ? formatDate(selectedStartDate) : ""
        }&endDate=${selectedEndDate ? formatDate(selectedEndDate) : ""}`
      );
    } else {
      push(
        `${query.name}?id=${selectedId}&status=${""}&startDate=${
          selectedStartDate ? formatDate(selectedStartDate) : ""
        }&endDate=${selectedEndDate ? formatDate(selectedEndDate) : ""}`
      );
    }
  };
  const statusArray = [
    {
      id: 0,
      name: "completed",
    },
    {
      id: 1,
      name: "inprogress",
    },
    {
      id: 2,
      name: "aborted",
    },
  ];
  const params = [
    { key: "project", value: query?.name },
    { key: "id", value: +searchId || "" },
    { key: "status", value: searchStatus || "" },
    { key: "startDate", value: searchStartDate || "" },
    { key: "endDate", value: searchEndDate || "" },
  ];
  const paramsStr = params.map((item) => `${item.key}=${item.value}`).join("&");
  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res = await apiCall("getHistory?" + paramsStr);
      console.log(res);
      setData(res);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const formattedData = data.map((obj) => {
    return {
      ...obj,
      date: formatDate(obj.date),
      updatedAt: formatDate(obj.updatedAt),
    };
  });
  useEffect(() => {
    if (query.name) {
      fetchHistory();
    }
  }, [query?.name, searchId, searchStartDate, searchEndDate, searchStatus]);
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
  useEffect(() => {
    if (currentProject && query.name) {
      push(`/history/${currentProject}`);
    }
  }, [currentProject, query.name]);
  return (
    <ProtectedRoute>
      <div className={styles.historyProcess}>
        <div className={styles.mainProcess}>
          <Toaster position="top-right" reverseOrder={false} />
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
                push(`/history/${query.name}/`);
                setSelectedId("");
                setSelectedStartDate("");
                setSelectedEndDate("");
                setSelectedStatus("");
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
                  <label htmlFor="startDate" className={styles.label}>
                    Start Date
                  </label>
                  <Calendar
                    value={selectedStartDate}
                    onChange={(e) => setSelectedStartDate(e.value)}
                    id="startDate"
                    showIcon
                    ref={date1}
                  />
                </div>
                <div className={styles.filter_tab}>
                  <label htmlFor="endtDate" className={styles.label}>
                    End Date
                  </label>
                  <Calendar
                    value={selectedEndDate}
                    onChange={(e) => setSelectedEndDate(e.value)}
                    id="endDate"
                    showIcon
                    ref={date2}
                  />
                </div>
                <div className={styles.filter_tab}>
                  <label htmlFor="dropDown" className={styles.label}>
                    Status
                  </label>
                  <Dropdown
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.value)}
                    options={statusArray}
                    optionLabel="name"
                    placeholder="Select a status"
                    style={{ padding: "10px 15px" }}
                    id="dropDown"
                  />
                </div>
                <div className={styles.filter_tab}>
                  <label htmlFor="inputId" className={styles.label}>
                    Process Id
                  </label>
                  <InputText
                    id="inputId"
                    aria-describedby="id-help"
                    style={{ padding: "10px 15px" }}
                    value={selectedId}
                    onChange={(e) => setSelectedId(e.target.value)}
                  />
                </div>
                <Button
                  label="Search"
                  severity="secondary"
                  style={{ width: "fit-content", padding: "10px 15px" }}
                  onClick={handleSearch}
                />
                {/* <button className={styles.orangeBtn} onClick={handleSearch}>
                search
              </button> */}
              </motion.div>
            )}
          </AnimatePresence>
          <DataTable
            value={formattedData}
            stripedRows
            dataKey="id"
            tableStyle={{ minWidth: "50rem" }}
            paginator
            rows={5}
            loading={loading}
            size={"large"}
            removableSort
          >
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
              header="End Date"
              style={{ padding: "15px" }}
            ></Column>
            <Column
              field="updatedAt"
              sortable
              header="Updated At"
              style={{ padding: "15px" }}
            ></Column>
            <Column
              field="action"
              header=""
              style={{ padding: "15px" }}
              body={buttonSearch}
            ></Column>
          </DataTable>
          <div className={styles.tableFunctions}>
            <Button
              severity="danger"
              disabled={!data?.length}
              style={{
                width: "fit-content",
                padding: "10px 15px",
                position: "relative",
              }}
            >
              <Image
                src="/pdf-file.png"
                alt="Picture of pdf"
                width={25}
                height={25}
                style={{ filter: "invert(1)" }}
              />
            </Button>
            <Button
              onClick={handleExportXLSX}
              severity="success"
              disabled={!data?.length}
              style={{
                width: "fit-content",
                padding: "10px 15px",
                position: "relative",
              }}
            >
              <Image
                src="/excel-file.png"
                alt="Picture of xls"
                width={25}
                height={25}
                style={{ filter: "invert(1)" }}
              />
            </Button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default History;
