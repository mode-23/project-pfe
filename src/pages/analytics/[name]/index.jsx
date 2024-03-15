import React, { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import styles from "../analytics.module.css";
import { motion } from "framer-motion";
import PieChart from "@/components/PieChartComponent";
import { apiCall } from "@/utils/apiCall";
import { useRouter } from "next/router";

const Analytics = ({ currentProject }) => {
  const { query, push } = useRouter();
  const [statusData, setStatusData] = useState([]);
  const [nameData, setNameData] = useState([]);
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
      >
        <h3>Analytics</h3>
        <div className={styles.pieholder}>
          <PieChart data={statusData} />
          <PieChart data={nameData} />
        </div>
      </motion.div>
    </ProtectedRoute>
  );
};

export default Analytics;
