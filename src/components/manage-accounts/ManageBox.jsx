import React from "react";
import styles from "../../pages/manage/manage.module.css";
import Image from "next/image";
import { Button } from "primereact/button";
import "primereact/resources/themes/lara-light-indigo/theme.css";

const ManageBox = () => {
  return (
    <div className={styles.box}>
      <div className={styles.boxHeader}>
        <div className={styles.imgHolder}>
          <Image src={"/user.jpg"} fill={true} alt="picture of default user" />
        </div>
        <h4>name</h4>
        <span>role</span>
        <button>active</button>
      </div>
      <div className={styles.boxBody}>
        <p>
          Lorem ipsum, dolor sit amet consectetur <br /> adipisicing elit.
          Voluptatum, iste eum pariatur
        </p>
      </div>
      <div className={styles.boxFooter}>
        <Button severity="secondary">Admin Up</Button>
        <Button severity="danger">Disable</Button>
      </div>
    </div>
  );
};

export default ManageBox;
