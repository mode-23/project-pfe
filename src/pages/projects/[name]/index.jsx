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
import { IoMdClose } from "react-icons/io";

const Project = () => {
  const [valueTochange, onChange] = useState(new Date());
  const [value1Tochange, onChange1] = useState(new Date());
  const [data, setData] = useState([]);
  const [selectedName, setName] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const { query } = useRouter();

  useEffect(() => {
    if (valueTochange >= value1Tochange) {
      setError(true);
    } else {
      setError(false);
    }
  }, [query.name, value1Tochange, valueTochange]);
  const fetchProcess = async () => {
    setLoading(true);
    try {
      const res = await apiCall("process", {
        method: "POST",
        body: JSON.stringify({
          name: selectedName ? selectedName : undefined,
          project: query?.name,
          // status: "active",
        }),
      });
      console.log(res);
      setLoading(false);
      setData(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProcess();
  }, [query.name, selectedName]);

  function removeDuplicates(array, key) {
    return array.filter(
      (obj, index, self) => index === self.findIndex((o) => o[key] === obj[key])
    );
  }

  let uniqueArray = removeDuplicates(data, "name");
  console.log(uniqueArray);
  useEffect(() => {
    setOpen(false);
    setName(null);
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
                id="dateStart"
                className={styles.calendar_tab}
              />
            </div>
            <div className={styles.filter_tab}>
              <label className={styles.label} htmlFor="dateEnd">
                end date
              </label>
              <input type="date" id="dateEnd" className={styles.calendar_tab} />
            </div>
            <div className={styles.filter_tab}>
              <label className={styles.label} htmlFor="processId">
                process id
              </label>
              <input
                type="text"
                id="processId"
                className={styles.calendar_tab}
              />
            </div>
            <div className={styles.dropDownHolder}>
              <div className={styles.filter_tab}>
                <span className={styles.label}>process name</span>
                <div className={styles.calendar_tab}>
                  <small onClick={() => setOpen((prev) => !prev)}>
                    {selectedName ? selectedName : "Select a name"}
                  </small>
                  <IoMdClose onClick={() => setName(null)} />
                </div>
              </div>
              {open && (
                <div className={styles.dropDown}>
                  <ul>
                    {uniqueArray.map(({ name, id }) => (
                      <li
                        key={id}
                        onClick={() => setName(name)}
                        className={name === selectedName ? styles.active : null}
                      >
                        {name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <button>search</button>
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
