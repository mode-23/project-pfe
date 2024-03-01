import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import { apiCall } from "@/utils/apiCall";
import ProjectTable from "@/components/pfoject-table/ProjectTable";
import ProtectedRoute from "@/components/ProtectedRoute";
import { VscSettings } from "react-icons/vsc";
import { IoChevronDownSharp } from "react-icons/io5";
import { LuRefreshCcw } from "react-icons/lu";
import { useSearchParams } from "next/navigation";
import styles from "./mainproject.module.css";

const MainProject = () => {
  const [data, setData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [selectedName, setName] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [dateError, setDateError] = useState(true);
  const [openFilter, setOpenFilter] = useState(true);
  const { query, push } = useRouter();

  const handleSearch = () => {
    push(
      `${query.name}?name=${selectedName}&id=${selectedId}&startDate=${selectedStartDate}&endDate=${selectedEndDate}`
    );
  };
  const searchParams = useSearchParams();
  const searchName = searchParams.get("name");
  const searchId = searchParams.get("id");
  const searchStartDate = searchParams.get("startDate");
  const searchEndDate = searchParams.get("endDate");
  useEffect(() => {
    setOpen(false);
    setName("");
    setSelectedId("");
    setSelectedStartDate("");
    setSelectedEndDate("");
  }, [query.name]);
  const params = [
    { key: "project", value: query?.name },
    { key: "name", value: searchName || "" },
    { key: "id", value: +searchId || "" },
    { key: "startDate", value: searchStartDate || "" },
    { key: "endDate", value: searchEndDate || "" },
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
  }, [query?.name, searchName, searchId, searchStartDate, searchEndDate]);
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

  let diff = Math.abs(new Date(selectedStartDate) - new Date(selectedEndDate));
  // console.log(new Date(selectedEndDate) >= new Date(selectedStartDate));
  let diffInDays = diff / (24 * 60 * 60 * 1000);
  useEffect(() => {
    if (diffInDays > 0 && diffInDays <= 5) {
      setDateError(false);
      console.log("correct");
    } else {
      setDateError(true);
      console.log("wrong");
    }
  }, [selectedStartDate, selectedEndDate]);

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
              {openFilter ? <IoChevronDownSharp /> : <VscSettings />}
            </button>
            <button
              className={styles.projectFilter}
              onClick={() => {
                push(`/recyclage/${query.name}/`);
                setSelectedId("");
                setName("");
                setSelectedStartDate("");
                setSelectedEndDate("");
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
                    onChange={(e) => setSelectedStartDate(e.target.value)}
                    value={selectedStartDate}
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
                    onChange={(e) => setSelectedEndDate(e.target.value)}
                    value={selectedEndDate}
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
                      <IoChevronDownSharp />
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
          <ProjectTable
            data={data}
            loading={loading}
            fetchProject={fetchProject}
          />
        </div>
      </motion.div>
    </ProtectedRoute>
  );
};

export default MainProject;
