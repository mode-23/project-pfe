import React, { useEffect, useRef, useState } from "react";
import styles from "./mainprocess.module.css";
import { LuRefreshCcw } from "react-icons/lu";
import { IoChevronDownSharp } from "react-icons/io5";
import { VscSettings } from "react-icons/vsc";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import { apiCall } from "@/utils/apiCall";
import { useSearchParams } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";

const MainProcess = () => {
  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [openFilter, setOpenFilter] = useState(true);
  const [loading, setLoading] = useState(false);
  const date1 = useRef();
  const date2 = useRef();
  const { query, push } = useRouter();
  const searchParams = useSearchParams();
  const searchId = searchParams.get("id");
  const searchStartDate = searchParams.get("startDate");
  const searchEndDate = searchParams.get("endDate");
  const handleErrornotify = (message) => {
    toast.error(message, {
      id: selectedId,
      style: {
        padding: "8px 14px",
        marginTop: "80px",
        marginLeft: "1270px",
        color: "#e4002b",
        background: "#ff9cae",
        fontWeight: 700,
      },
      iconTheme: {
        primary: "#e4002b",
        secondary: "#FFFAEE",
      },
    });
  };
  let maxDaysRange = 5;
  let diff = new Date(selectedEndDate) - new Date(selectedStartDate);
  let diffInDays = diff / (24 * 60 * 60 * 1000);
  const handleSearch = () => {
    if (date1?.current?.value && date2?.current?.value) {
      if (!(diffInDays > 0)) {
        handleErrornotify("Date start > Date end");
        return;
      }
    }
    if (isNaN(+selectedId)) {
      handleErrornotify("id must be a number");
      return;
    }
    push(
      `${query.name}?id=${selectedId}&startDate=${selectedStartDate}&endDate=${selectedEndDate}`
    );
  };
  // const handleSearch = () => {
  //   push(
  //     `${query.name}?id=${selectedId}&startDate=${selectedStartDate}&endDate=${selectedEndDate}`
  //   );
  // };
  const params = [
    { key: "project", value: query?.name },
    { key: "id", value: +searchId || "" },
    { key: "startDate", value: searchStartDate || "" },
    { key: "endDate", value: searchEndDate || "" },
  ];
  const paramsStr = params.map((item) => `${item.key}=${item.value}`).join("&");
  const fetchFailed = async () => {
    setLoading(true);
    try {
      const res = await apiCall("getFailed?" + paramsStr);
      console.log(res);
      setData(res);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (query.name) {
      fetchFailed();
    }
  }, [query?.name, searchId, searchStartDate, searchEndDate]);
  return (
    <div className={styles.mainProcess}>
      <Toaster position="top-right" reverseOrder={false} />

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
            push(`/failed/${query.name}/`);
            setSelectedId("");
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
                ref={date1}
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
                ref={date2}
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
            <button className={styles.orangeBtn} onClick={handleSearch}>
              search
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MainProcess;
