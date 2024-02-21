import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "./project.module.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { motion } from "framer-motion";
import { PiCaretDoubleRightDuotone } from "react-icons/pi";

const project = () => {
  const [value, onChange] = useState(new Date());
  const [value1, onChange1] = useState(new Date());
  const { query } = useRouter();
  console.log(value);

  return (
    <motion.div
      className={styles.project}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      key={query.name}
    >
      <div className={styles.projectHolder}>
        <h4 className={styles.title}>
          <PiCaretDoubleRightDuotone /> {query.name}
        </h4>
        <div className={styles.calendarsHolder}>
          <Calendar onChange={onChange} value={value} />
          <Calendar onChange={onChange1} value={value1} />
        </div>
        <button className={styles.orangeBtn}>Start</button>
      </div>
    </motion.div>
  );
};

export default project;
