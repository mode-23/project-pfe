import React from "react";
import styles from "./dashboard.module.css";
import { useMeStore } from "@/store/useMeStore";
import { AUTH_TOKEN } from "@/constants/localstorage";

const Dashboard = () => {
  const me = useMeStore((state) => ({ id: state.id, email: state.email }));

  return (
    <div className={styles.dashboard}>
      {me?.email}
      <button
        type="button"
        onClick={() => {
          localStorage.removeItem(AUTH_TOKEN);
          window.location.reload();
        }}
      >
        log out
      </button>
    </div>
  );
};

export default Dashboard;
