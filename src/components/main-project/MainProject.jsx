import React, { useEffect, useRef, useState } from "react";
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
import "react-toastify/dist/ReactToastify.css";
import { Toaster, toast } from "react-hot-toast";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
// import { Toast } from "primereact/toast";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { FaSearch } from "react-icons/fa";

const MainProject = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [selectedName, setName] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openFilter, setOpenFilter] = useState(true);
  const { query, push } = useRouter();
  let maxDaysRange = 5;
  let diff = new Date(selectedEndDate) - new Date(selectedStartDate);
  let diffInDays = diff / (24 * 60 * 60 * 1000);
  const date1 = useRef();
  const date2 = useRef();
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
  const handleSearch = () => {
    // if (date1?.current?.value && date2?.current?.value) {
    if (selectedStartDate && selectedEndDate) {
      if (!(diffInDays > 0)) {
        handleErrornotify("End date must be more than start date");
        return;
      } else if (!(diffInDays <= maxDaysRange)) {
        handleErrornotify("Date range must be maximum of 5 days");
        return;
      }
    }
    if (isNaN(+selectedId)) {
      handleErrornotify("id must be a number");
      return;
    }
    if (selectedName.name) {
      push(
        `${query.name}?name=${selectedName.name}&id=${selectedId}&startDate=${
          selectedStartDate ? formatDate(selectedStartDate) : ""
        }&endDate=${selectedEndDate ? formatDate(selectedEndDate) : ""}`
      );
    } else {
      push(
        `${query.name}?name=${""}&id=${selectedId}&startDate=${
          selectedStartDate ? formatDate(selectedStartDate) : ""
        }&endDate=${selectedEndDate ? formatDate(selectedEndDate) : ""}`
      );
    }
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
      setCurrentPage(1);
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
  const formatDate = (value) => {
    const formattedValue = new Date(value);
    let format = `${formattedValue.getFullYear()}-${
      formattedValue.getMonth() + 1 > 9
        ? formattedValue.getMonth() + 1
        : "0" + (formattedValue.getMonth() + 1)
    }-${
      formattedValue.getDate() > 9
        ? formattedValue.getDate()
        : "0" + formattedValue.getDate()
    }`;
    return format;
  };
  const handleSuccessNotify = (message) => {
    toast.success(message, {
      style: {
        marginTop: "120px",
        marginLeft: "1270px",
        padding: "8px 14px",
        color: "#279b37",
        background: "#a6ffb2",
        fontWeight: 700,
      },
      iconTheme: {
        primary: "#279b37",
        secondary: "#FFFAEE",
      },
    });
  };
  let array = selectedItems.map((item) => item.id);
  const handleUpdateStatus = async () => {
    if (selectedItems.length) {
      try {
        const res = await apiCall("updateMany", {
          method: "POST",
          body: JSON.stringify({
            array,
          }),
        });
        setSelectedItems([]);
        handleSuccessNotify("Successfully updated");
        if (res) {
          setOpen(false);
        }

        fetchProject();
      } catch (error) {
        console.log(error);
      }
    }
  };
  const formattedData = data.map((obj) => {
    return {
      ...obj,
      date: formatDate(obj.date),
    };
  });
  const formatProcessArray = projectData?.[0]?.processList?.map((obj) => {
    return {
      id: obj,
      name: obj,
    };
  });

  const buttonSearch = (item) => {
    return (
      <Button
        onClick={() => console.log(item)}
        severity="secondary"
        style={{
          width: "fit-content",
          padding: "10px 15px",
          backgroundColor: "var(--highlight-bg)",
          color: "var(--text-color)",
          border: "0",
        }}
      >
        <FaSearch />
      </Button>
    );
  };
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
        <Toaster position="top-right" reverseOrder={false} />
        {/* <ToastContainer /> */}
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
          {/* <AnimatePresence mode="wait">
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
                <div className={styles.dropDownHolder}>
                  <div className={styles.filter_tab}>
                    <span className={styles.label}>task name</span>
                    <div
                      className={`${styles.calendar_tab} ${
                        open ? styles.active : null
                      }`}
                      onClick={() => setOpen((prev) => !prev)}
                    >
                      <small>
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
          </AnimatePresence> */}
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
                  <label htmlFor="startDate" className={styles.label}>
                    Start Date
                  </label>
                  <Calendar
                    value={selectedStartDate}
                    onChange={(e) => setSelectedStartDate(e.value)}
                    id="startDate"
                    showIcon
                    ref={date1}
                  />
                </div>
                <div className={styles.filter_tab}>
                  <label htmlFor="endtDate" className={styles.label}>
                    Start Date
                  </label>
                  <Calendar
                    value={selectedEndDate}
                    onChange={(e) => setSelectedEndDate(e.value)}
                    id="endDate"
                    showIcon
                    ref={date2}
                  />
                </div>
                <div className={styles.filter_tab}>
                  <label htmlFor="inputId" className={styles.label}>
                    Process Id
                  </label>
                  <InputText
                    id="inputId"
                    aria-describedby="id-help"
                    style={{ padding: "10px 15px" }}
                    value={selectedId}
                    onChange={(e) => setSelectedId(e.target.value)}
                  />
                </div>
                <div className={styles.filter_tab}>
                  <label htmlFor="dropDown" className={styles.label}>
                    Task Name
                  </label>
                  <Dropdown
                    value={selectedName}
                    onChange={(e) => setName(e.value)}
                    options={formatProcessArray}
                    optionLabel="name"
                    placeholder="Select a name"
                    style={{ padding: "10px 15px" }}
                    id="dropDown"
                  />
                </div>
                {/* <button onClick={handleSearch} className={styles.orangeBtn}>
                  search
                </button> */}
                <Button
                  label="Search"
                  severity="secondary"
                  style={{ width: "fit-content", padding: "10px 15px" }}
                  onClick={handleSearch}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <DataTable
            value={formattedData}
            selection={selectedItems}
            stripedRows
            onSelectionChange={(e) => setSelectedItems(e.value)}
            dataKey="id"
            tableStyle={{ minWidth: "50rem" }}
            paginator
            rows={5}
            loading={loading}
            removableSort
            // currentPageReportTemplate="{first} to {last} of {totalRecords}"
            // paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            // rowsPerPageOptions={[5, 10, 25, 50]}
          >
            <Column
              selectionMode="multiple"
              headerStyle={{ width: "3rem" }}
            ></Column>
            <Column
              field="taskprocess.id"
              sortable
              header="Process Id"
              style={{ padding: "15px" }}
            ></Column>
            <Column
              field="id"
              sortable
              header="Task Id"
              style={{ padding: "15px" }}
            ></Column>
            <Column
              field="name"
              sortable
              header="Task Name"
              style={{ padding: "15px" }}
            ></Column>
            <Column
              field="taskprocess.name"
              sortable
              header="Process Name"
              style={{ padding: "15px" }}
            ></Column>
            <Column
              field="status"
              header="Status"
              style={{ padding: "15px" }}
            ></Column>
            <Column
              field="date"
              sortable
              header="Failure Date"
              style={{ padding: "15px" }}
            ></Column>
            <Column
              field="action"
              header=""
              style={{ padding: "15px" }}
              body={buttonSearch}
            ></Column>
          </DataTable>
          <Button
            label="Recycle"
            severity="secondary"
            disabled={!selectedItems.length}
            style={{
              width: "fit-content",
              minHeight: "40px",
              padding: "10px 15px",
            }}
            onClick={handleUpdateStatus}
          />
          {/* <ProjectTable
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            data={data}
            loading={loading}
            fetchProject={fetchProject}
          /> */}
        </div>
      </motion.div>
    </ProtectedRoute>
  );
};

export default MainProject;
