import React, { useEffect } from "react";
import styles from "../failed.module.css";
import MainProcess from "@/components/main-process/MainProcess";
import { useRouter } from "next/router";
const Failed = ({ currentProject }) => {
  const { query, push } = useRouter();

  useEffect(() => {
    if (currentProject && query.name) {
      push(`/failed/${currentProject}`);
    }
  }, [currentProject, query.name]);
  return (
    <div className={styles.failedProcess}>
      <MainProcess />
    </div>
  );
};

export default Failed;
