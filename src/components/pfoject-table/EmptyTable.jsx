import React from "react";
import styles from "./projecttable.module.css";
import Image from "next/image";
const EmptyTable = () => {
  return (
    <div className={styles.emptyTable}>
      <Image
        src={"/no-data.png"}
        width={80}
        height={80}
        alt="picture of default user"
      />
      <h3>
        No data found. <br /> Please adjust filters.
      </h3>
    </div>
  );
};

export default EmptyTable;
