import React from "react";
import styles from "./sidebarLeft.module.css";
import { AUTH_TOKEN } from "@/constants/localstorage";
const SidebarLeft = () => {
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          localStorage.removeItem(AUTH_TOKEN);
          window.location.reload();
        }}
      >
        log out
      </button>
    </div>
  );
};

export default SidebarLeft;
