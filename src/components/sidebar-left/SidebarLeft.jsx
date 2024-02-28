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
  BsCaretRightFill,
  BsCaretRight,
} from "react-icons/bs";
import {
  IoTimeOutline,
  IoTime,
  IoGridOutline,
  IoGrid,
  IoSettingsOutline,
  IoSettings,
  IoLogOut,
  IoChevronDownSharp,
} from "react-icons/io5";
import { FaRegUser, FaUser, FaPlus } from "react-icons/fa";
import { RiFilePaper2Fill, RiFilePaper2Line } from "react-icons/ri";
import {
  PiRecycleLight,
  PiRecycleBold,
  PiRecycleDuotone,
  PiCaretDoubleRightDuotone,
  PiCaretDoubleRightFill,
} from "react-icons/pi";
import { TiWarningOutline, TiWarning } from "react-icons/ti";

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
      {/* <div className={styles.sideBarLogo}>
        <Image
          src="/logo-orange.png"
          alt="Picture of Orange logo"
          fill={true}
        />
      </div> */}
      <ul>
        <li>
          <Link
            href={"/"}
            className={
              pathname === "/"
                ? `${styles.active} ${styles.link}`
                : ` ${styles.link}`
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
              open || pathname?.includes("projects")
                ? `${styles.active} ${styles.link}`
                : `${styles.link}`
            }
          >
            {open || pathname?.includes("projects") ? (
              <BsSdCardFill />
            ) : (
              <BsSdCard />
            )}
            projects
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
                href={"/projects/apc"}
                className={
                  pathname === "/projects/apc" ||
                  pathname?.includes("projects/apc")
                    ? `${styles.active}`
                    : null
                }
              >
                {pathname === "/projects/apc" ||
                pathname?.includes("projects/apc") ? (
                  <PiCaretDoubleRightFill className={styles.smallSvg} />
                ) : (
                  <PiCaretDoubleRightDuotone className={styles.smallSvg} />
                )}
                APC
              </Link>
            </li>
            <li>
              <Link
                href={"/projects/lte"}
                className={
                  pathname === "/projects/lte" ||
                  pathname?.includes("projects/lte")
                    ? `${styles.active}`
                    : null
                }
              >
                {pathname === "/projects/lte" ||
                pathname?.includes("projects/lte") ? (
                  <PiCaretDoubleRightFill className={styles.smallSvg} />
                ) : (
                  <PiCaretDoubleRightDuotone className={styles.smallSvg} />
                )}
                LTE
              </Link>
            </li>
            <li>
              <Link
                href={"/projects/reengagement"}
                className={
                  pathname === "/projects/reengagement" ||
                  pathname?.includes("projects/reengagement")
                    ? `${styles.active}`
                    : null
                }
              >
                {pathname === "/projects/reengagement" ||
                pathname?.includes("projects/reengagement") ? (
                  <PiCaretDoubleRightFill className={styles.smallSvg} />
                ) : (
                  <PiCaretDoubleRightDuotone className={styles.smallSvg} />
                )}
                REENGAGEMENT
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <Link
            href={"/history"}
            className={
              pathname === "/history"
                ? `${styles.active} ${styles.link}`
                : ` ${styles.link}`
            }
          >
            {pathname === "/history" ? <IoTime /> : <IoTimeOutline />}
            history
          </Link>
        </li>
        <li>
          <Link
            href={"/failed"}
            className={
              pathname === "/failed"
                ? `${styles.active} ${styles.link}`
                : ` ${styles.link}`
            }
          >
            {pathname === "/failed" ? <TiWarning /> : <TiWarningOutline />}
            failed
          </Link>
        </li>
        <li>
          <Link
            href={"/recyclage/apc"}
            className={
              pathname.includes("recyclage")
                ? `${styles.active} ${styles.link}`
                : ` ${styles.link}`
            }
          >
            {pathname.includes("recyclage") ? (
              <PiRecycleDuotone />
            ) : (
              <PiRecycleLight />
            )}
            recycle
          </Link>
        </li>
        {/* <li>
          <Link
            href={"/analytics"}
            className={
              pathname === "/analytics"
                ? `${styles.active} ${styles.link}`
                : ` ${styles.link}`
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
                : ` ${styles.link}`
            }
          >
            {pathname === "/settings" ? <IoSettings /> : <IoSettingsOutline />}
            settings
          </Link>
        </li> */}
      </ul>
      {/* <button
        type="button"
        onClick={() => {
          localStorage.removeItem(AUTH_TOKEN);
          window.location.reload();
        }}
        className={styles.logoutBtn}
      >
        <IoLogOut />
        log out
      </button> */}
    </div>
  );
};

export default SidebarLeft;
