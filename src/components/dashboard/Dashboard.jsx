import React from "react";
import styles from "./dashboard.module.css";
import Chart from "../Chart";
import { motion } from "framer-motion";
import ProtectedRoute from "../ProtectedRoute";

const Dashboard = () => {
  return (
    <ProtectedRoute>
      <motion.div
        className={styles.dashboard}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <Chart />
      </motion.div>
    </ProtectedRoute>
  );
};

export default Dashboard;
