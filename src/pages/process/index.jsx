import React from "react";
import styles from "./process.module.css";
import ProtectetAdmin from "@/components/ProtectetAdmin";
const Process = () => {
  return (
    <ProtectetAdmin>
      <div className={styles.process}>
        <h4>Process List</h4>
      </div>
    </ProtectetAdmin>
  );
};

export default Process;
