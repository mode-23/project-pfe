import React from "react";
import styles from "./projecttable.module.css";
const ProjectTable = ({ data }) => {
  return (
    <div>
      {data?.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
};

export default ProjectTable;
