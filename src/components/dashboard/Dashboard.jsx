import React, { useEffect, useState } from "react";
import styles from "./dashboard.module.css";
import { useMeStore } from "@/store/useMeStore";
import { LuSearch } from "react-icons/lu";
import { HiOutlinePlus } from "react-icons/hi2";
import { SiGoogleanalytics } from "react-icons/si";
import { FaChartPie, FaLink, FaPlus, FaProjectDiagram } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import Chart from "../Chart";
import { motion } from "framer-motion";
import ProtectedRoute from "../ProtectedRoute";

const Dashboard = () => {
  const [tab, setTab] = useState(true);
  // const isLoading = useMeStore((state) => state.isLoading);
  // if (isLoading) return <div>dashboard loading...</div>;
  return (
    <ProtectedRoute>
      <motion.div
        className={styles.dashboard}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <header className={styles.dashboardHeader}>
          <div className={styles.inputHolder}>
            <LuSearch className={styles.searchIcon} />
            <input type="text" placeholder="search" />
          </div>
          <button>
            <HiOutlinePlus />
          </button>
        </header>
        <div className={styles.dashboardBoxs}>
          <Link href={"/analytics"} className={styles.dashboardBox}>
            <Image src="/analytics.jpg" fill={true} alt="image of analytics" />
            <FaChartPie />
            <h3>analytics</h3>
          </Link>
          <Link href={"/process"} className={styles.dashboardBox}>
            <Image src="/data.jpg" fill={true} alt="image of data" />
            <FaProjectDiagram />
            <h3>Projects</h3>
          </Link>
        </div>
        <div className={styles.chartTab}>
          <Link href={"/analytics"} className={styles.chartTabHeader}>
            <FaLink />
            <h4>Analytics</h4>
          </Link>
          <ul>
            <li
              className={`${tab ? styles.active : "null"}`}
              onClick={() => setTab(true)}
            >
              test
            </li>
            <li
              className={`${!tab ? styles.active : "null"}`}
              onClick={() => setTab(false)}
            >
              test
            </li>
          </ul>
        </div>
        {tab ? <Chart /> : <Chart />}
      </motion.div>
    </ProtectedRoute>
  );
};

export default Dashboard;
