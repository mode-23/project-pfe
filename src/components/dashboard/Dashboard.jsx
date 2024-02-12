import React from "react";
import styles from "./dashboard.module.css";
import { useMeStore } from "@/store/useMeStore";
import { AUTH_TOKEN } from "@/constants/localstorage";

const Dashboard = () => {
  const me = useMeStore((state) => ({
    id: state.id,
    email: state.email,
    createdAt: state.createdAt,
    deletedAt: state.deletedAt,
  }));
  const isLoading = useMeStore((state) => state.isLoading);
  if (isLoading) return <div>loading...</div>;
  return (
    <div className={styles.dashboard}>
      user id : {me.id} <br />
      user email : {me.email} <br />
      created at : {me.createdAt} <br />
    </div>
  );
};

export default Dashboard;
