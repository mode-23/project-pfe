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

const Analytics = ({ currentProject }) => {
  const { query, push } = useRouter();
  const [statusData, setStatusData] = useState([]);
  const [nameData, setNameData] = useState([]);
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
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
  const fetchStatusChart = async () => {
    try {
      const res = await apiCall(`groupBy?project=${query.name}`);
      setStatusData(res);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchNameTaskChart = async () => {
    try {
      const res = await apiCall(`taskGroupBy?project=${query.name}`);
      console.log(res);
      setNameData(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchStatusChart();
  }, [query.name, currentProject]);
  useEffect(() => {
    fetchNameTaskChart();
  }, [query.name, currentProject]);
  useEffect(() => {
    if (currentProject && query.name) {
      push(`/analytics/${currentProject}`);
    }
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
          />
        </div>
        <div className={styles.pieholder}>
          <ReactEcharts
            data={statusData}
            savedName={`${query.name}-process-chart-${formatDate(Date.now())}`}
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
        </div>
      </motion.div>
    </ProtectedRoute>
  );
};

export default Analytics;
