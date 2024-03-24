import React from "react";
import styles from "./dashboard.module.css";
import ReactECharts from "echarts-for-react";
import { FcInfo } from "react-icons/fc";

const DashboardBox = ({ icon, title, number, dark }) => {
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
        radius: ["60%", "90%"],
        center: ["50%", "40%"],
        itemStyle: {
          borderRadius: 5,
          borderColor: dark ? "#333" : "#fff",
          borderWidth: 6,
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
        data: [
          { value: 735, name: "Direct", itemStyle: { color: "#91cc75" } }, // Custom color for 'Direct'
          { value: 484, name: "Union Ads", itemStyle: { color: "#ee6666" } }, // Custom color for 'Union Ads'
          { value: 300, name: "Video Ads", itemStyle: { color: "#73c0de" } }, // Custom color for 'Video Ads'
        ],
      },
    ],
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
