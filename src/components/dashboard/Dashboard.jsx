import React, { useEffect, useState } from "react";
import styles from "./dashboard.module.css";
import { motion } from "framer-motion";
import ProtectedRoute from "../ProtectedRoute";
import { apiCall } from "@/utils/apiCall";
import ReactEcharts from "../ReactEcharts";
import BarEchart from "../BarEchart";
import { FaDatabase, FaRegUser, FaSdCard } from "react-icons/fa";
import { IoCloseCircle, IoTimeSharp } from "react-icons/io5";
import { BsBox } from "react-icons/bs";
import DashboardBox from "./DashboardBox";

const Dashboard = () => {
  const [inprogressdata, setinprogressData] = useState([]);
  const [abortedData, setAbortedData] = useState([]);
  const [tasksData, setTasksData] = useState([]);
  const [usersData, setUsersData] = useState([]);
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
  const handleFetchUsers = async () => {
    try {
      const res = await apiCall("getUsers");
      setUsersData(res);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchInProgressChart = async () => {
    try {
      const res = await apiCall(`groupByProcess?status=inprogress`);
      console.log(res);
      setinprogressData(res);
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
  const fetchAllFailedTasks = async () => {
    try {
      const res = await apiCall(`getAllFailedTasks`);
      console.log(res);
      setTasksData(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchInProgressChart();
    fetchAbortedChart();
    fetchAllFailedTasks();
    handleFetchUsers();
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
            data={inprogressdata}
            savedName={`in-progress-process-chart-${formatDate(Date.now())}`}
            chartTitle={`In progress processes`}
            bgColor="#fff"
          />
          <ReactEcharts
            data={abortedData}
            savedName={`aborted-process-chart-${formatDate(Date.now())}`}
            chartTitle={`Aborted processes`}
            bgColor="#fff"
          />
        </div>
        <div className={styles.barChartHolder}>
          <BarEchart
            savedName={`all-failed-tasks-${formatDate(Date.now())}`}
            chartTitle={`All failed tasks`}
            bgColor="#fff"
            data={tasksData}
          />
          <div className={styles.dashBoxes}>
            <DashboardBox
              title={"Total admins"}
              icon={<FaRegUser />}
              dark={true}
              number={usersData?.length}
            />
            <DashboardBox
              title={"Total Projects"}
              icon={<FaSdCard />}
              dark={false}
              number={3}
            />
            <DashboardBox
              title={"Total Process"}
              icon={<FaDatabase />}
              dark={false}
              number={inprogressdata?.length}
            />
            <DashboardBox
              title={"Total tasks"}
              icon={<BsBox />}
              dark={true}
              number={abortedData?.length}
            />
          </div>
        </div>
      </motion.div>
    </ProtectedRoute>
  );
};

export default Dashboard;
