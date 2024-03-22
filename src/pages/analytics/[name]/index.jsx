import React, { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import styles from "../analytics.module.css";
import { motion } from "framer-motion";
// import PieChart from "@/components/PieChartComponent";
import { apiCall } from "@/utils/apiCall";
import { useRouter } from "next/router";
import ReactEcharts from "@/components/ReactEcharts";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { useSearchParams } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";
import { FaChartSimple } from "react-icons/fa6";

const Analytics = ({ currentProject }) => {
  const { query, push } = useRouter();
  const [statusData, setStatusData] = useState([]);
  const [nameData, setNameData] = useState([]);
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const searchParams = useSearchParams();
  const searchStartDate = searchParams.get("startDate");
  const searchEndDate = searchParams.get("endDate");
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
  const handleErrorNotify = (message) => {
    toast.error(message, {
      style: {
        padding: "8px 14px",
        marginTop: "140px",
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
  const handleWarningNotify = (message) => {
    toast.error(message, {
      style: {
        padding: "8px 14px",
        marginTop: "140px",
        marginLeft: "1270px",
        color: "#dbc421",
        background: "#fcef95",
        fontWeight: 700,
      },
      iconTheme: {
        primary: "#dbc421",
        secondary: "#FFFAEE",
      },
    });
  };
  let diff = new Date(selectedEndDate) - new Date(selectedStartDate);
  let diffInDays = diff / (24 * 60 * 60 * 1000);
  const handleSearch = () => {
    if (selectedStartDate && selectedEndDate) {
      if (!(diffInDays > 0)) {
        handleErrorNotify("End date must be more than start date");
        return;
      }
      push(
        `${query.name}?startDate=${
          selectedStartDate ? formatDate(selectedStartDate) : ""
        }&endDate=${selectedEndDate ? formatDate(selectedEndDate) : ""}`
      );
    } else {
      handleWarningNotify("Please fill End date and Start date");
    }
  };
  const params = [
    { key: "project", value: query?.name },
    { key: "startDate", value: searchStartDate || "" },
    { key: "endDate", value: searchEndDate || "" },
  ];
  const paramsStr = params.map((item) => `${item.key}=${item.value}`).join("&");
  console.log(paramsStr);
  const fetchStatusChart = async () => {
    try {
      const res = await apiCall("groupBy?" + paramsStr);
      setStatusData(res);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchNameTaskChart = async () => {
    try {
      const res = await apiCall("taskGroupBy?" + paramsStr);
      console.log(res);
      setNameData(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchStatusChart();
    fetchNameTaskChart();
  }, [query.name, currentProject, searchStartDate, searchStartDate]);
  useEffect(() => {
    if (currentProject && query.name) {
      push(`/analytics/${currentProject}`);
    }
  }, [query.name, currentProject]);
  useEffect(() => {
    setSelectedStartDate("");
    setSelectedEndDate("");
  }, [query.name, currentProject]);
  return (
    <ProtectedRoute>
      <motion.div
        className={styles.analytics}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        key={query.name}
      >
        <Toaster position="top-right" reverseOrder={false} />
        <div className={styles.statHeader}>
          <div className={styles.statTitle}>
            <FaChartSimple />
            <h2>
              Statistics of <span>{query?.name?.toLocaleUpperCase()} </span>{" "}
              project
            </h2>
          </div>
          <p>statistic period between:</p>
        </div>
        <div className={styles.dateFilter}>
          <div className={styles.filter_tab}>
            <label htmlFor="startDate" className={styles.label}>
              Start Date
            </label>
            <Calendar
              value={selectedStartDate}
              onChange={(e) => setSelectedStartDate(e.value)}
              id="startDate"
              showIcon
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
            />
          </div>
          <Button
            label="Search"
            severity="secondary"
            style={{ width: "fit-content", padding: "10px 15px" }}
            onClick={handleSearch}
          />
        </div>
        {searchStartDate && searchEndDate && (
          <motion.div
            className={styles.pieholder}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <ReactEcharts
              data={statusData}
              savedName={`${query.name}-process-chart-${formatDate(
                Date.now()
              )}`}
              chartTitle={`Statistics of ${query?.name?.toLocaleUpperCase()} processes status`}
              bgColor="#f2f4f8"
            />
            <ReactEcharts
              data={nameData}
              savedName={`${query.name}-failed-task-chart-${formatDate(
                Date.now()
              )}`}
              chartTitle={` Statistics of failed ${query?.name?.toLocaleUpperCase()} tasks`}
              bgColor="#f2f4f8"
            />
          </motion.div>
        )}
      </motion.div>
    </ProtectedRoute>
  );
};

export default Analytics;
