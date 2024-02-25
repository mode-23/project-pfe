import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./project.module.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { motion } from "framer-motion";
import { PiCaretDoubleRightDuotone } from "react-icons/pi";
import { apiCall } from "@/utils/apiCall";
import ProjectTable from "@/components/pfoject-table/ProjectTable";
import ProtectedRoute from "@/components/ProtectedRoute";

const Project = () => {
  const [valueTochange, onChange] = useState(new Date());
  const [value1Tochange, onChange1] = useState(new Date());
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { query } = useRouter();

  useEffect(() => {
    if (valueTochange >= value1Tochange) {
      setError(true);
    } else {
      setError(false);
    }
  }, [query.name, value1Tochange, valueTochange]);
  const fetchProcess = async () => {
    try {
      const res = await apiCall("process", {
        method: "POST",
        body: JSON.stringify({
          name: undefined,
          project: query?.name,
          // status: "active",
        }),
      });
      console.log(res);
      setData(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProcess();
  }, [query.name]);

  return (
    <ProtectedRoute>
      <motion.div
        className={styles.project}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        key={query.name}
      >
        <div className={styles.projectHolder}>
          <div className={styles.filter}>
            <div className={styles.filter_tab}>
              <label className={styles.label} htmlFor="dateStart">
                start date
              </label>
              <input
                type="date"
                name=""
                id="dateStart"
                className={styles.calendar_tab}
              />
            </div>
            <div className={styles.filter_tab}>
              <label className={styles.label} htmlFor="dateEnd">
                end date
              </label>
              <input
                type="date"
                name=""
                id="dateEnd"
                className={styles.calendar_tab}
              />
            </div>
            <div className={styles.filter_tab}>
              <label className={styles.label} htmlFor="processId">
                process id
              </label>
              <input
                type="text"
                name=""
                id="processId"
                className={styles.calendar_tab}
              />
            </div>
            <div className={styles.filter_tab}>
              <label className={styles.label} htmlFor="processName">
                process name
              </label>
              <input
                type="text"
                name=""
                id="processName"
                className={styles.calendar_tab}
              />
            </div>
          </div>
          {/* <h4 className={styles.title}>
            <PiCaretDoubleRightDuotone /> {query.name}
          </h4> */}
          {/* <div className={styles.calendarsHolder}>
            <Calendar onChange={onChange} value={valueTochange} />
            <Calendar onChange={onChange1} value={value1Tochange} />
          </div>
          <button
            className={styles.orangeBtn}
            disabled={error}
            // onClick={() =>
            //   router.push(
            //     `/projects/${query.name}/${formattedDateStart}_${formattedDateEnd}`
            //   )
            // }
          >
            send
          </button> */}
          <ProjectTable
            data={data}
            loading={loading}
            fetchProcess={fetchProcess}
          />
        </div>
      </motion.div>
    </ProtectedRoute>
  );
};

export default Project;
