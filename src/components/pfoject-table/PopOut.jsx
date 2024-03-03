import React from "react";
import styles from "./projecttable.module.css";
import { toast } from "react-toastify";

const PopOut = ({ handleUpdateStatus, setOpen }) => {
  const handleNotify = () => {
    toast.success("updated", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      delay: 500,
    });
  };
  return (
    <div className={styles.popOut}>
      <div className={styles.popUp}>
        <h3>Are you sure?</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa,
          tenetur. Eveniet, voluptatum?
        </p>
        <div className={styles.popUpBtns}>
          <button onClick={() => setOpen((prev) => !prev)}>cancel</button>
          <button
            className={styles.confirm}
            onClick={() => {
              handleUpdateStatus();
              handleNotify();
            }}
          >
            confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopOut;
