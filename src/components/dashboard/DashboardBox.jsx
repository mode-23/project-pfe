import React from "react";
import styles from "./dashboard.module.css";
import ReactECharts from "echarts-for-react";
import { FcInfo } from "react-icons/fc";

const DashboardBox = ({ icon, title, number, dark, data }) => {
  const formattedData = data?.map((obj) => {
    if (obj.status) {
      return {
        name: obj.status,
        value: obj._count,
      };
    } else if (obj.name) {
      return {
        name: obj.name,
        value: obj._count,
      };
    } else if (obj.role) {
      return {
        name: obj.role,
        value: obj._count,
      };
    }
  });
  const option = {
    tooltip: {
      trigger: "item",
      position: function (pos, params, dom, rect, size) {
        var topPosition = "-10%";
        var leftPosition = (size.viewSize[0] - rect.width) / 2.5 + "px";
        return [leftPosition, topPosition];
      },
      backgroundColor: dark ? "#fff" : "#333",
      textStyle: {
        color: dark ? "#333" : "#fff",
        fontSize: 14,
        fontWeight: "bold",
      },
      formatter: function (params) {
        const borderColor = params.color;
        const circleHtml = `<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;background-color:${borderColor};"></span>`;
        return `${circleHtml}<span style="color: ${borderColor};">${params.name}</span>: ${params.value}`;
      },
      extraCssText: "border: none;",
    },
    series: [
      {
        type: "pie",
        radius: ["30%", "90%"],
        center: ["50%", "40%"],
        itemStyle: {
          borderRadius: 5,
          borderColor: dark ? "#333" : "#fff",
          borderWidth: 6,
          opacity: 0.5,
          // color: "#ff7900",
          emphasis: {
            opacity: 1,
          },
        },
        startAngle: 180,
        endAngle: 360,
        labelLine: {
          show: false,
        },
        label: {
          show: false,
        },
        emphasis: {
          label: {
            show: false,
          },
        },
        data: formattedData,
      },
    ],
    aria: {
      enabled: true,
      decal: {
        show: true,
      },
    },
  };
  return (
    <div className={`${styles.box} ${dark ? styles.dark : null}`}>
      <div className={styles.inner_box}>
        <div className={styles.front_box}>
          <div className={styles.boxHeader}>
            <span className={styles.iconHolder}>{icon}</span>
            <h4>{title}</h4>
          </div>
          <h2>{number}</h2>
        </div>
        <div className={styles.back_box}>
          <div className={styles.boxbackInfo}>
            <FcInfo />
            <h3>Details</h3>
          </div>
          <ReactECharts option={option} lazyUpdate={true} />
        </div>
      </div>
    </div>
  );
};

export default DashboardBox;
