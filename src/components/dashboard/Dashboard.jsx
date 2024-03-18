import React, { useEffect, useState } from "react";
import styles from "./dashboard.module.css";
import Chart from "../Chart";
import { motion } from "framer-motion";
import ProtectedRoute from "../ProtectedRoute";
import { apiCall } from "@/utils/apiCall";
import ReactEcharts from "../ReactEcharts";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [abortedData, setAbortedData] = useState([]);
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
  const fetchInProgressChart = async () => {
    try {
      const res = await apiCall(`groupByProcess?status=inprogress`);
      console.log(res);
      setData(res);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchAbortedChart = async () => {
    try {
      const res = await apiCall(`groupByProcess?status=aborted`);
      console.log(res);
      setAbortedData(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchInProgressChart();
    fetchAbortedChart();
  }, []);
  return (
    <ProtectedRoute>
      <motion.div
        className={styles.dashboard}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <h1>Overview</h1>
        <div className={styles.chartHolder}>
          <ReactEcharts
            data={data}
            savedName={`in progress-process-chart-${formatDate(Date.now())}`}
            chartTitle={`in progress process chart`}
            bgColor="#fff"
          />
          <ReactEcharts
            data={abortedData}
            savedName={`aborted-process-chart-${formatDate(Date.now())}`}
            chartTitle={`aborted process chart`}
            bgColor="#fff"
          />
        </div>
        {/* <Chart /> */}
      </motion.div>
    </ProtectedRoute>
  );
};

export default Dashboard;
