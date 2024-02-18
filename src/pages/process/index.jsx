import ProtectedRoute from "@/components/ProtectedRoute";
import React from "react";
import styles from "./process.module.css";
const Process = () => {
  return (
    <ProtectedRoute>
      <div className={styles.process}>
        <h4>Process List</h4>
      </div>
    </ProtectedRoute>
  );
};

export default Process;
