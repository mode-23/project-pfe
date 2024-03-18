import React from "react";
import styles from "./manage.module.css";
import ProtectetAdmin from "@/components/ProtectetAdmin";
import ManageBox from "@/components/manage-accounts/ManageBox";
const Manage = () => {
  return (
    <ProtectetAdmin>
      <div className={styles.manage}>
        <div className={styles.boxHolder}>
          <ManageBox />
          <ManageBox />
          <ManageBox />
          <ManageBox />
          <ManageBox />
        </div>
      </div>
    </ProtectetAdmin>
  );
};

export default Manage;
