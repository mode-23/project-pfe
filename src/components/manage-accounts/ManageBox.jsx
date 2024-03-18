import React from "react";
import styles from "../../pages/manage/manage.module.css";
import Image from "next/image";
import { Button } from "primereact/button";
import "primereact/resources/themes/lara-light-indigo/theme.css";
const ManageBox = ({ item }) => {
  return (
    <div className={styles.box}>
      <div className={styles.boxHeader}>
        <div className={styles.imgHolder}>
          <Image src={"/user.jpg"} fill={true} alt="picture of default user" />
        </div>
        <h4>{item.email}</h4>
        <span>{item.role}</span>
        <button>active</button>
      </div>
      <div className={styles.boxBody}>
        <p>{item.createdAt}</p>
      </div>
      <div className={styles.boxFooter}>
        <Button
          severity="secondary"
          rounded
          disabled={item.role === "super-admin"}
        >
          Admin Up
        </Button>
        <Button
          severity="danger"
          rounded
          disabled={item.role === "super-admin"}
        >
          Disable
        </Button>
      </div>
    </div>
  );
};

export default ManageBox;
