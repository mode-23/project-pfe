import React from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import Chart from "@/components/Chart";
import styles from "./analytics.module.css";
import { motion } from "framer-motion";

const Analytics = () => {
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
        <Chart />
        <Chart />
        <Chart />
      </motion.div>
    </ProtectedRoute>
  );
};

export default Analytics;
