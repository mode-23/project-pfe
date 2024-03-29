import React, { useEffect, useState } from "react";
import styles from "./sidebarLeft.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BsSdCardFill,
  BsSdCard,
  BsBarChartFill,
  BsBarChart,
  BsClipboardPlus,
  BsClipboardPlusFill,
} from "react-icons/bs";
import {
  IoTimeOutline,
  IoTime,
  IoGridOutline,
  IoGrid,
  IoChevronDownSharp,
} from "react-icons/io5";
import {
  PiRecycleLight,
  PiRecycleDuotone,
  PiCaretDoubleRightDuotone,
  PiCaretDoubleRightFill,
} from "react-icons/pi";
import { TiWarningOutline, TiWarning } from "react-icons/ti";
import ProtectedRoute from "../ProtectedRoute";
import { apiCall } from "@/utils/apiCall";
import { useRouter } from "next/router";
import { RiAdminFill, RiAdminLine } from "react-icons/ri";

const SidebarLeft = ({ currentProject, setCurrentProjects, me }) => {
  const { query } = useRouter();
  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const res = await apiCall("getProjectList");
        setProjects(res);
        setCurrentProjects(res?.[0]?.name);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchProjects();
  }, []);

  return (
    // <ProtectedRoute>
    <div className={styles.leftSideBar}>
      <ul>
        <span>home</span>
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
        {me.role === "super-admin" && (
          <>
            <span>admin panel</span>
            <li>
              <Link
                href={"/manage"}
                className={
                  pathname === "/manage"
                    ? `${styles.active} ${styles.link}`
                    : ` ${styles.link}`
                }
              >
                {pathname === "/manage" ? <RiAdminFill /> : <RiAdminLine />}
                Manage Accounts
              </Link>
            </li>
            <li>
              <Link
                href={"/process"}
                className={
                  pathname.includes("process")
                    ? `${styles.active} ${styles.link}`
                    : ` ${styles.link}`
                }
              >
                {pathname.includes("process") ? (
                  <BsClipboardPlusFill />
                ) : (
                  <BsClipboardPlus />
                )}
                Manage Processes
              </Link>
            </li>
          </>
        )}
        <span>Projects</span>
        <li>
          <div
            onClick={() => setOpen((prev) => !prev)}
            className={
              open ? `${styles.active} ${styles.link}` : `${styles.link}`
            }
          >
            {open ? <BsSdCardFill /> : <BsSdCard />}
            {currentProject ? `project: ${currentProject}` : "Select a Project"}
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
            {projects?.map((item) => (
              <li key={item.id}>
                <div
                  onClick={() => setCurrentProjects(item.name)}
                  className={
                    currentProject === item.name
                      ? `${styles.active} ${styles.underLink}`
                      : `${styles.underLink}`
                  }
                >
                  {currentProject === item.name ? (
                    <PiCaretDoubleRightFill className={styles.smallSvg} />
                  ) : (
                    <PiCaretDoubleRightDuotone className={styles.smallSvg} />
                  )}
                  {item.name}
                </div>
              </li>
            ))}
          </ul>
        </li>
        {currentProject && (
          <>
            <li>
              <Link
                href={`/recyclage/${currentProject}`}
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
            <li>
              <Link
                href={`/history/${currentProject}`}
                className={
                  pathname.includes("history")
                    ? `${styles.active} ${styles.link}`
                    : ` ${styles.link}`
                }
              >
                {pathname.includes("history") ? <IoTime /> : <IoTimeOutline />}
                history
              </Link>
            </li>
            <li>
              <Link
                href={`/failed/${currentProject}`}
                className={
                  pathname.includes("failed")
                    ? `${styles.active} ${styles.link}`
                    : ` ${styles.link}`
                }
              >
                {pathname.includes("failed") ? (
                  <TiWarning />
                ) : (
                  <TiWarningOutline />
                )}
                abort
              </Link>
            </li>
            <li>
              <Link
                href={`/analytics/${currentProject}`}
                className={
                  pathname.includes("analytics")
                    ? `${styles.active} ${styles.link}`
                    : ` ${styles.link}`
                }
              >
                {pathname.includes("analytics") ? (
                  <BsBarChartFill />
                ) : (
                  <BsBarChart />
                )}
                analytics
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
    // </ProtectedRoute>
  );
};

export default SidebarLeft;
