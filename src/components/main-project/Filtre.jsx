import React from "react";
import styles from "./mainproject.module.css";
import { AnimatePresence, motion } from "framer-motion";

const Filtre = ({
  open,
  setOpen,
  selectedId,
  selectedName,
  handleSearch,
  projectData,
  setName,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className={styles.filter}
    >
      <div className={styles.filter_tab}>
        <label className={styles.label} htmlFor="dateStart">
          start date
        </label>
        <input
          type="date"
          id="dateStart"
          className={styles.calendar_tab}
          onChange={(e) => console.log(e.target.value)}
        />
      </div>
      <div className={styles.filter_tab}>
        <label className={styles.label} htmlFor="dateEnd">
          end date
        </label>
        <input
          type="date"
          id="dateEnd"
          className={styles.calendar_tab}
          onChange={(e) => console.log(e.target.value)}
        />
      </div>
      <div className={styles.filter_tab}>
        <label className={styles.label} htmlFor="processId">
          process id
        </label>
        <input
          type="text"
          id="processId"
          className={styles.calendar_tab}
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
        />
      </div>
      <div className={styles.dropDownHolder}>
        <div className={styles.filter_tab}>
          <span className={styles.label}>process name</span>
          <div className={styles.calendar_tab}>
            <small onClick={() => setOpen((prev) => !prev)}>
              {selectedName ? selectedName : "Select a name"}
            </small>
          </div>
        </div>
        {open && (
          <div className={styles.dropDown}>
            <ul>
              {projectData?.[0]?.processList?.map((item, index) => (
                <li
                  key={index}
                  onClick={() => setName(item)}
                  className={item === selectedName ? styles.active : null}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <button onClick={handleSearch} className={styles.orangeBtn}>
        search
      </button>
    </motion.div>
  );
};

export default Filtre;
