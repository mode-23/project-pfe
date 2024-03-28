import React, { useEffect, useState } from "react";
import styles from "./process.module.css";
import ProtectetAdmin from "@/components/ProtectetAdmin";
import { apiCall } from "@/utils/apiCall";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { Steps } from "primereact/steps";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { Dialog } from "primereact/dialog";
const Process = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [name, setName] = useState("");
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await apiCall("getProjectList");
      setProjects(res);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchProjects();
  }, []);
  const formattedProject = projects?.map((obj) => {
    let newList = obj?.processList?.map((item) => {
      return {
        name: item,
        value: item,
      };
    });
    return {
      ...obj,
      newList,
    };
  });
  const handleDropdownChange = (e) => {
    const selectedItem = e.value;
    const selectedGroup = formattedProject.find((group) =>
      group.newList.some((process) => process.name === selectedItem)
    );
    console.log(selectedGroup.name);
    setSelectedProjects(selectedItem);
  };
  const [activeIndex, setActiveIndex] = useState(0);
  const items = [
    {
      label: "Process Info",
    },
    {
      label: "Added Tasks",
    },
    {
      label: "Confirmation",
    },
  ];
  const [visible, setVisible] = useState(false);
  const footerContent = (
    <div>
      <Steps model={items} activeIndex={activeIndex} className={styles.steps} />
    </div>
  );
  const headerElement = (
    <div className={styles.dialogHeader}>
      <h5>Header</h5>
    </div>
  );
  return (
    <ProtectetAdmin>
      <div className={styles.process}>
        <button
          onClick={() => setVisible((prev) => !prev)}
          style={{ width: "fit-content" }}
        >
          test
        </button>
        <Dialog
          visible={visible}
          className={styles.dialog}
          onHide={() => setVisible(false)}
          footer={footerContent}
          header={headerElement}
        >
          <div className={styles.addProcessHolder}>
            <div className={styles.processHolder}>
              <div className={styles.processBox}>
                <h4>label</h4>
                <Dropdown
                  value={selectedProject}
                  onChange={(e) => handleDropdownChange(e)}
                  options={formattedProject}
                  optionLabel="name"
                  optionGroupLabel="name"
                  optionGroupChildren="newList"
                  placeholder="Select a process"
                  style={{
                    padding: "10px 15px",
                    width: "100%",
                    maxWidth: "100%",
                    overflow: "hidden",
                  }}
                />
              </div>
              <div className={styles.processBox}>
                <h4>label</h4>
                <InputText
                  aria-describedby="name-help"
                  style={{ padding: "10px 15px" }}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className={styles.processBox}>
                <h4>label</h4>
                <InputText
                  aria-describedby="name-help"
                  style={{ padding: "10px 15px" }}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className={styles.processBox}>
                <h4>label</h4>
                <Calendar
                  value={selectedEndDate}
                  onChange={(e) => setSelectedEndDate(e.value)}
                  id="endDate"
                  showIcon
                />
              </div>
            </div>
          </div>
        </Dialog>
      </div>
    </ProtectetAdmin>
  );
};

export default Process;
