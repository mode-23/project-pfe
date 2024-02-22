import React, { useEffect, useState } from "react";
import { apiCall } from "@/utils/apiCall";
import { useRouter } from "next/router";
import styles from "./data.module.css";
import Link from "next/link";
import { motion } from "framer-motion";
import ProjectTable from "@/components/pfoject-table/ProjectTable";

const PickeDate = () => {
  const [data, setData] = useState([]);
  const { query } = useRouter();
  const splitDate = query?.date?.split("_");
  const startDate = splitDate?.[0];
  const endDate = splitDate?.[1];
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const res = await apiCall("test", {
  //         method: "POST",
  //         body: JSON.stringify({
  //           email: "abc@gmail.com",
  //           createdAt: undefined,
  //         }),
  //       });
  //       console.log(res);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })();
  // }, [query.date, query.name]);

  useEffect(() => {
    (async () => {
      try {
        const res = await apiCall("process", {
          method: "POST",
          body: JSON.stringify({
            name: undefined,
            project: query?.name,
            status: "active",
          }),
        });
        console.log(res);
        setData(res);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [query.date, query.name]);

  return (
    <motion.div
      className={styles.data}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      key={query?.name}
    >
      <header className={styles.header}>
        <Link href={`/projects/${query?.name}`}>{query?.name}</Link>
      </header>
      <ProjectTable data={data} />
    </motion.div>
  );
};

export default PickeDate;
