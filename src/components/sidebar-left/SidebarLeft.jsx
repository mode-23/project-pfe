import React, { useEffect, useState } from "react";
import styles from "./sidebarLeft.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BsSdCardFill,
  BsSdCard,
  BsBarChartFill,
  BsBarChart,
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

const SidebarLeft = ({ currentProject, setCurrentProjects }) => {
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
    <ProtectedRoute>
      <div className={styles.leftSideBar}>
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
                open ? `${styles.active} ${styles.link}` : `${styles.link}`
              }
            >
              {open ? <BsSdCardFill /> : <BsSdCard />}
              {currentProject
                ? `project: ${currentProject}`
                : "Select a Project"}
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
                  href={`/failed/${currentProject}`}
                  className={
                    pathname === "/failed"
                      ? `${styles.active} ${styles.link}`
                      : ` ${styles.link}`
                  }
                >
                  {pathname === "/failed" ? (
                    <TiWarning />
                  ) : (
                    <TiWarningOutline />
                  )}
                  failed
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
    </ProtectedRoute>
  );
};

export default SidebarLeft;
