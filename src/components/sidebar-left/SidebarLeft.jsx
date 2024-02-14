import React, { useState } from "react";
import styles from "./sidebarLeft.module.css";
import { AUTH_TOKEN } from "@/constants/localstorage";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BsBarChart,
  BsBarChartFill,
  BsSdCardFill,
  BsSdCard,
  BsPlusCircleDotted,
} from "react-icons/bs";
import {
  IoGridOutline,
  IoGrid,
  IoSettingsOutline,
  IoSettings,
  IoLogOut,
  IoChevronDownSharp,
} from "react-icons/io5";
import { FaRegUser, FaUser, FaPlus } from "react-icons/fa";
import { RiFilePaper2Fill, RiFilePaper2Line } from "react-icons/ri";

const SidebarLeft = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  // const data = [
  //   {
  //     name: "dashboard",
  //     url: "/",
  //     icon: <IoGridOutline />,
  //     activeIcon: <IoGrid />,
  //   },
  //   {
  //     name: "process",
  //     url: "/process",
  //     icon: <IoGridOutline />,
  //     activeIcon: <IoGrid />,
  //   },
  //   {
  //     name: "analytics",
  //     url: "/analytics",
  //     icon: <IoGridOutline />,
  //     activeIcon: <IoGrid />,
  //   },
  //   {
  //     name: "dashboard",
  //     url: "/",
  //     icon: <IoGridOutline />,
  //     activeIcon: <IoGrid />,
  //   },
  // ];
  return (
    <div className={styles.leftSideBar}>
      <div className={styles.sideBarLogo}>
        <Image
          src="/orange-logo.png"
          alt="Picture of Orange logo"
          fill={true}
        />
      </div>
      <ul>
        <li>
          <Link
            href={"/"}
            className={
              pathname === "/"
                ? `${styles.active} ${styles.link}`
                : `${styles.notActive} ${styles.link}`
            }
          >
            {pathname === "/" ? <IoGrid /> : <IoGridOutline />}
            dashboard
          </Link>
        </li>
        <li>
          <div
            onClick={() => setOpen((prev) => !prev)}
            className={
              open || pathname.includes("process")
                ? `${styles.active} ${styles.link}`
                : `${styles.notActive} ${styles.link}`
            }
          >
            {open || pathname.includes("process") ? (
              <BsSdCardFill />
            ) : (
              <BsSdCard />
            )}
            process
            <IoChevronDownSharp
              className={
                open
                  ? `${styles.chevron} ${styles.active}`
                  : `${styles.chevron}`
              }
            />
          </div>
          <ul
            className={
              open
                ? `${styles.dropDown} ${styles.active}`
                : `${styles.dropDown}`
            }
          >
            <li>
              <Link
                href={"/process"}
                className={
                  pathname === "/process"
                    ? `${styles.active}`
                    : `${styles.notActive}`
                }
              >
                <RiFilePaper2Line />
                process list
              </Link>
            </li>
            <li>
              <Link
                href={"/process/add"}
                className={
                  pathname === "/process/add"
                    ? `${styles.active}`
                    : `${styles.notActive}`
                }
              >
                <BsPlusCircleDotted />
                added process
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <Link
            href={"/analytics"}
            className={
              pathname === "/analytics"
                ? `${styles.active} ${styles.link}`
                : `${styles.notActive} ${styles.link}`
            }
          >
            {pathname === "/analytics" ? <BsBarChartFill /> : <BsBarChart />}
            analytics
          </Link>
        </li>
        <li>
          <Link
            href={"/settings"}
            className={
              pathname === "/settings"
                ? `${styles.active} ${styles.link}`
                : `${styles.notActive} ${styles.link}`
            }
          >
            {pathname === "/settings" ? <IoSettings /> : <IoSettingsOutline />}
            settings
          </Link>
        </li>
      </ul>
      <button
        type="button"
        onClick={() => {
          localStorage.removeItem(AUTH_TOKEN);
          window.location.reload();
        }}
        className={styles.logoutBtn}
      >
        <IoLogOut />
        log out
      </button>
    </div>
  );
};

export default SidebarLeft;
