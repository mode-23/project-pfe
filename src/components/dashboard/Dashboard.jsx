import React, { useEffect, useState } from "react";
import styles from "./dashboard.module.css";
import { AnimatePresence, motion } from "framer-motion";
import ProtectedRoute from "../ProtectedRoute";
import { apiCall } from "@/utils/apiCall";
import ReactEcharts from "../ReactEcharts";
import BarEchart from "../BarEchart";
import { FaDatabase, FaRegUser, FaSdCard } from "react-icons/fa";
import {
  IoCloseCircle,
  IoCalendarClearOutline,
  IoTimeSharp,
  IoChevronDownOutline,
} from "react-icons/io5";
import { BsBox } from "react-icons/bs";
import DashboardBox from "./DashboardBox";
import { Calendar } from "primereact/calendar";
import "primereact/resources/themes/lara-light-indigo/theme.css";

const Dashboard = () => {
  const [inprogressdata, setinprogressData] = useState([]);
  const [abortedData, setAbortedData] = useState([]);
  const [tasksData, setTasksData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [totalProcess, setTotalProcess] = useState([]);
  const [totalTasks, setTotalTasks] = useState([]);
  const [totalProjects, setTotalProjects] = useState([]);
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
      const res = await apiCall("dashboardUsers");
      setUsersData(res);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchTotalProcessChart = async () => {
    try {
      const res = await apiCall(`dashboardProcess`);
      setTotalProcess(res);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchInProgressChart = async () => {
    try {
      const res = await apiCall(`groupByProcess?status=inprogress`);
      setinprogressData(res);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchAbortedChart = async () => {
    try {
      const res = await apiCall(`groupByProcess?status=aborted`);
      setAbortedData(res);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchAllFailedTasks = async () => {
    try {
      const res = await apiCall(`getAllFailedTasks`);
      setTasksData(res);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchAllTotalTasks = async () => {
    try {
      const res = await apiCall(`dashboardFailedTasks`);
      setTotalTasks(res);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchTotalProjects = async () => {
    try {
      const res = await apiCall(`dashboardProjects`);
      setTotalProjects(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchInProgressChart();
    fetchAbortedChart();
    fetchAllFailedTasks();
    handleFetchUsers();
    fetchTotalProcessChart();
    fetchAllTotalTasks();
    fetchTotalProjects();
  }, []);
  const [startdate, setstartDate] = useState(null);
  const [enddate, setendDate] = useState(null);
  const [open, setOpen] = useState(false);
  let month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const formatDateV2 = (date) => {
    let formattedDate = new Date(date);
    let res = `${formattedDate.getDate()} ${
      month[formattedDate.getMonth()]
    } , ${formattedDate.getFullYear()}`;
    return res;
  };
  return (
    <ProtectedRoute>
      <motion.div
        className={styles.dashboard}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <div className={styles.dashboardHeader}>
          <h1>Overview</h1>
          <div className={styles.customCalendar}>
            <div
              className={styles.calendarValue}
              onClick={() => setOpen((prev) => !prev)}
            >
              <IoCalendarClearOutline />
              <h4>
                {startdate ? formatDateV2(startdate) : "Select date"}
                {" / "}
                {enddate ? formatDateV2(enddate) : "Select date"}
              </h4>

              <IoChevronDownOutline />
            </div>
            <AnimatePresence>
              {open && (
                <motion.div
                  className={styles.calendarHolder}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className={styles.calendarBox}>
                    <h3>start date</h3>
                    <Calendar
                      value={startdate}
                      onChange={(e) => setstartDate(e.value)}
                      inline
                      showWeek
                    />
                  </div>
                  <div className={styles.calendarBox}>
                    <h3>end date</h3>
                    <Calendar
                      value={enddate}
                      onChange={(e) => setendDate(e.value)}
                      inline
                      showWeek
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
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
              number={usersData?.reduce((acc, curr) => acc + curr._count, 0)}
              data={usersData}
            />
            <DashboardBox
              title={"Projects overview"}
              icon={<FaSdCard />}
              dark={false}
              number={totalProjects?.length}
              data={totalProjects}
            />
            <DashboardBox
              title={"Total Process"}
              icon={<FaDatabase />}
              dark={false}
              number={totalProcess?.reduce((acc, curr) => acc + curr._count, 0)}
              data={totalProcess}
            />
            <DashboardBox
              title={"Total failed tasks"}
              icon={<BsBox />}
              dark={true}
              number={totalTasks?.reduce((acc, curr) => acc + curr._count, 0)}
              data={totalTasks}
            />
          </div>
        </div>
      </motion.div>
    </ProtectedRoute>
  );
};

export default Dashboard;
