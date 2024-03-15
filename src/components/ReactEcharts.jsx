import React from "react";
import ReactECharts from "echarts-for-react";

const ReactEcharts = ({ data, savedName, chartTitle }) => {
  const formattedData = data.map((obj) => {
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
    }
  });
  const option = {
    title: {
      text: chartTitle,
      textStyle: {
        color: "#333",
      },
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      //  bottom: "0%",
      //  left: "0px",
      orient: "vertical",
      x: "left",
      y: "bottom",
    },
    toolbox: {
      feature: {
        saveAsImage: {
          name: savedName,
        },
      },
    },
    series: [
      {
        type: "pie",
        radius: ["55%", "80%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#eee",
          borderWidth: 6,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 14,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: formattedData,
        //    data: [
        //      {
        //        value: 1048,
        //        name: "Search Engine",
        //        //   itemStyle: {
        //        //     color: "#ff0000", // Change the background color for 'Search Engine'
        //        //   },
        //      },
        //      {
        //        value: 735,
        //        name: "Direct",
        //        //   itemStyle: {
        //        //     color: "#00ff00", // Change the background color for 'Direct'
        //        //   },
        //      },

        //      {
        //        value: 300,
        //        name: "Video Ads",
        //        //   itemStyle: {
        //        //     color: "#ff00ff", // Change the background color for 'Video Ads'
        //        //   },
        //      },
        //    ],
      },
    ],
  };
  return (
    <div
      style={{ background: "#ececec", borderRadius: "12px", padding: "10px" }}
    >
      <ReactECharts option={option} lazyUpdate={true} />
    </div>
  );
};

export default ReactEcharts;
