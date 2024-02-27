import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./project.module.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { AnimatePresence, motion } from "framer-motion";
import { PiCaretDoubleRightDuotone } from "react-icons/pi";
import { apiCall } from "@/utils/apiCall";
import ProjectTable from "@/components/pfoject-table/ProjectTable";
import ProtectedRoute from "@/components/ProtectedRoute";
import { IoMdClose } from "react-icons/io";
import { IoFilterSharp } from "react-icons/io5";
import { LuRefreshCcw } from "react-icons/lu";
import {
  useSearchParams,
  useRouter as navigationRouter,
} from "next/navigation";

const Project = () => {
  // const [valueTochange, onChange] = useState(new Date());
  // const [value1Tochange, onChange1] = useState(new Date());
  // const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [selectedName, setName] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const { query } = useRouter();
  const router = navigationRouter();
  // useEffect(() => {
  //   if (valueTochange >= value1Tochange) {
  //     setError(true);
  //   } else {
  //     setError(false);
  //   }
  // }, [query.name, value1Tochange, valueTochange]);

  const handleSearch = () => {
    router.push(`${query.name}?name=${selectedName}&id=${selectedId}`);
  };
  const searchParams = useSearchParams();
  const searchName = searchParams.get("name");
  const searchId = searchParams.get("id");

  function removeDuplicates(array, key) {
    return array.filter(
      (obj, index, self) => index === self.findIndex((o) => o[key] === obj[key])
    );
  }

  let uniqueArray = removeDuplicates(data, "name");
  useEffect(() => {
    setOpen(false);
    setName("");
    setSelectedId("");
  }, [query.name]);
  const params = [
    { key: "project", value: query?.name },
    { key: "name", value: searchName || "" },
    { key: "id", value: +searchId || "" },
  ];
  const paramsStr = params.map((item) => `${item.key}=${item.value}`).join("&");
  const fetchProject = async () => {
    setLoading(true);
    try {
      const res = await apiCall("getProject?" + paramsStr);
      setData(res);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (query.name) {
      fetchProject();
    }
  }, [query?.name, searchName, searchId]);
  useEffect(() => {
    const fetchSingleProject = async () => {
      try {
        const res = await apiCall("getCurrentProject", {
          method: "POST",
          body: JSON.stringify({
            name: query?.name,
          }),
        });
        setProjectData(res);
      } catch (error) {
        console.log(error);
      }
    };
    if (query.name) {
      fetchSingleProject();
    }
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
          <div className={styles.projectHeader}>
            <button
              className={styles.projectFilter}
              onClick={() => setOpenFilter((prev) => !prev)}
            >
              {openFilter ? <IoMdClose /> : <IoFilterSharp />}
            </button>
            <button
              className={styles.projectFilter}
              onClick={() => {
                router.push(`/projects/${query.name}/`);
                setSelectedId("");
                setName("");
              }}
            >
              <LuRefreshCcw />
            </button>
          </div>
          <AnimatePresence mode="wait">
            {openFilter && (
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
                      {/* <IoMdClose
                  onClick={() => {
                    // setName("");
                    router.push(`/projects/${query.name}/`);
                  }}
                /> */}
                    </div>
                  </div>
                  {open && (
                    <div className={styles.dropDown}>
                      <ul>
                        {projectData?.[0]?.processList?.map((item, index) => (
                          <li
                            key={index}
                            onClick={() => setName(item)}
                            className={
                              item === selectedName ? styles.active : null
                            }
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
            )}
          </AnimatePresence>
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
            // fetchProcess={fetchProcess}
            fetchProject={fetchProject}
          />
        </div>
      </motion.div>
    </ProtectedRoute>
  );
};

export default Project;
