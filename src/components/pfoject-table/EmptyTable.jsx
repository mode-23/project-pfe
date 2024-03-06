import React from "react";
import styles from "./projecttable.module.css";
import Image from "next/image";
const EmptyTable = () => {
  return (
    <div className={styles.emptyTable}>
      <Image
        src={"/no-data.png"}
        width={100}
        height={100}
        alt="picture of default user"
      />
      <h3>
        No data available <br /> Please try another search.
      </h3>
    </div>
  );
};

export default EmptyTable;
