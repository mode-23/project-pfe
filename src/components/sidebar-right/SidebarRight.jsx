import React from "react";
import styles from "./sidebarRight.module.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import Image from "next/image";
import { IoSettingsOutline } from "react-icons/io5";
import { useMeStore } from "@/store/useMeStore";
import { RiFilePaperFill } from "react-icons/ri";

const SidebarRight = () => {
  const me = useMeStore((state) => ({
    id: state.id,
    email: state.email,
    createdAt: state.createdAt,
    deletedAt: state.deletedAt,
  }));
  return (
    <div className={styles.rightSideBar}>
      <div className={styles.header}>
        <h3>Profile</h3>
        <div className={styles.icon}>
          <IoSettingsOutline />
        </div>
      </div>
      <div className={styles.userHolder}>
        <div className={styles.imgHolder}>
          <Image src={"/user.jpg"} fill={true} alt="picture of default user" />
        </div>
        <h4>{me.email}</h4>
      </div>
      <div className={styles.history}>
        <div className={styles.historyBox}>
          <div className={styles.df}>
            <div className={styles.Mainicon}>
              <RiFilePaperFill />
            </div>
            <span className={styles.df2}>
              <h4>process name</h4>
              <p>26m ago</p>
            </span>
          </div>
          <div className={styles.status}>active</div>
        </div>
        <div className={styles.historyBox}>
          <div className={styles.df}>
            <div className={styles.Mainicon}>
              <RiFilePaperFill />
            </div>
            <span className={styles.df2}>
              <h4>process name </h4>
              <p>26m ago</p>
            </span>
          </div>
          <div className={styles.status}>active</div>
        </div>
        <div className={styles.historyBox}>
          <div className={styles.df}>
            <div className={styles.Mainicon}>
              <RiFilePaperFill />
            </div>
            <span className={styles.df2}>
              <h4>process name </h4>
              <p>26m ago</p>
            </span>
          </div>
          <div className={styles.status}>active</div>
        </div>
        <div className={styles.historyBox}>
          <div className={styles.df}>
            <div className={styles.Mainicon}>
              <RiFilePaperFill />
            </div>
            <span className={styles.df2}>
              <h4>process name </h4>
              <p>26m ago</p>
            </span>
          </div>
          <div className={styles.status}>active</div>
        </div>
        <div className={styles.historyBox}>
          <div className={styles.df}>
            <div className={styles.Mainicon}>
              <RiFilePaperFill />
            </div>
            <span className={styles.df2}>
              <h4>process name </h4>
              <p>26m ago</p>
            </span>
          </div>
          <div className={styles.status}>active</div>
        </div>
        <div className={styles.historyBox}>
          <div className={styles.df}>
            <div className={styles.Mainicon}>
              <RiFilePaperFill />
            </div>
            <span className={styles.df2}>
              <h4>process name </h4>
              <p>26m ago</p>
            </span>
          </div>
          <div className={styles.status}>active</div>
        </div>
        <div className={styles.historyBox}>
          <div className={styles.df}>
            <div className={styles.Mainicon}>
              <RiFilePaperFill />
            </div>
            <span className={styles.df2}>
              <h4>process name </h4>
              <p>26m ago</p>
            </span>
          </div>
          <div className={styles.status}>active</div>
        </div>
        <div className={styles.historyBox}>
          <div className={styles.df}>
            <div className={styles.Mainicon}>
              <RiFilePaperFill />
            </div>
            <span className={styles.df2}>
              <h4>process name </h4>
              <p>26m ago</p>
            </span>
          </div>
          <div className={styles.status}>active</div>
        </div>
        <div className={styles.historyBox}>
          <div className={styles.df}>
            <div className={styles.Mainicon}>
              <RiFilePaperFill />
            </div>
            <span className={styles.df2}>
              <h4>process name </h4>
              <p>26m ago</p>
            </span>
          </div>
          <div className={styles.status}>active</div>
        </div>
        <div className={styles.historyBox}>
          <div className={styles.df}>
            <div className={styles.Mainicon}>
              <RiFilePaperFill />
            </div>
            <span className={styles.df2}>
              <h4>process name </h4>
              <p>26m ago</p>
            </span>
          </div>
          <div className={styles.status}>active</div>
        </div>
      </div>
    </div>
  );
};

export default SidebarRight;
