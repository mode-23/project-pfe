import { useRouter } from "next/router";
import React from "react";
import styles from "./project.module.css";

const project = () => {
  const { query } = useRouter();

  return <div className={styles.project}>{query.name}</div>;
};

export default project;
