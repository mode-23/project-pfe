import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "./project.module.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { motion } from "framer-motion";
import { PiCaretDoubleRightDuotone } from "react-icons/pi";

const project = () => {
  const [valueTochange, onChange] = useState(new Date());
  const [value1Tochange, onChange1] = useState(new Date());
  const [error, setError] = useState(false);
  const { query } = useRouter();
  const router = useRouter();
  let formattedDateStart = `${valueTochange.getFullYear()}-${
    valueTochange.getMonth() + 1 > 9
      ? valueTochange.getMonth() + 1
      : "0" + (valueTochange.getMonth() + 1)
  }-${valueTochange.getDate()}`;
  let formattedDateEnd = `${value1Tochange.getFullYear()}-${
    value1Tochange.getMonth() + 1 > 9
      ? value1Tochange.getMonth() + 1
      : "0" + (value1Tochange.getMonth() + 1)
  }-${value1Tochange.getDate()}`;

  const changeDateStart = (value, event) => {
    onChange(value);
  };
  const changeDateEnd = (value, event) => {
    onChange1(value);
  };
  useEffect(() => {
    if (valueTochange >= value1Tochange) {
      setError(true);
    } else {
      setError(false);
    }
  }, [query.name, value1Tochange, valueTochange]);
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
          <Calendar onChange={changeDateStart} value={valueTochange} />
          <Calendar onChange={changeDateEnd} value={value1Tochange} />
        </div>
        <button
          className={styles.orangeBtn}
          disabled={error}
          onClick={() =>
            router.push(
              `/projects/${query.name}/${formattedDateStart}_${formattedDateEnd}`
            )
          }
        >
          send
        </button>
      </div>
    </motion.div>
  );
};

export default project;
