import React, { useEffect, useState } from "react";
import styles from "./manage.module.css";
import ProtectetAdmin from "@/components/ProtectetAdmin";
import ManageBox from "@/components/manage-accounts/ManageBox";
import { motion } from "framer-motion";
import { apiCall } from "@/utils/apiCall";
import { Button } from "primereact/button";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { FaPlus } from "react-icons/fa";

const Manage = () => {
  const [admins, setAdmins] = useState([]);
  const [data, setData] = useState([]);
  const handleFetchUsers = async () => {
    try {
      const res = await apiCall("getUsers?role=admin");
      setData(res);
    } catch (error) {
      console.log(error);
    }
  };
  const handleFetchAdmins = async () => {
    try {
      const res = await apiCall("getUsers?role=super-admin");
      setAdmins(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleFetchUsers();
    handleFetchAdmins();
  }, []);
  return (
    <ProtectetAdmin>
      <motion.div
        className={styles.manage}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.addBtnHolder}>
          <Button
            style={{
              padding: "10px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <FaPlus />
            Add Admin
          </Button>
        </div>

        <h2>Super Admins</h2>
        <div className={styles.boxHolder}>
          {admins?.map((item) => (
            <ManageBox key={item.id} item={item} />
          ))}
        </div>
        <h2>Admins</h2>
        <div className={styles.boxHolder}>
          {data?.map((item) => (
            <ManageBox key={item.id} item={item} />
          ))}
        </div>
      </motion.div>
    </ProtectetAdmin>
  );
};

export default Manage;
