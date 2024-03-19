import React from "react";
import styles from "../../pages/manage/manage.module.css";
import Image from "next/image";
import { Button } from "primereact/button";
import { FaCalendarDays } from "react-icons/fa6";

const ManageBox = ({ item }) => {
  let month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const formatDate = (date) => {
    let formattedDate = new Date(date);
    let res = `${formattedDate.getDate()} ${
      month[formattedDate.getMonth()]
    } , ${formattedDate.getFullYear()}`;
    return res;
  };
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
        <p>
          <FaCalendarDays /> {formatDate(item.createdAt)}
        </p>
      </div>
      <div className={styles.boxFooter}>
        <Button severity="secondary" disabled={item.role === "super-admin"}>
          Rank Up
        </Button>
        <Button severity="danger" disabled={item.role === "super-admin"}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default ManageBox;
