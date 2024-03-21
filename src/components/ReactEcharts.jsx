import React from "react";
import ReactECharts from "echarts-for-react";

const ReactEcharts = ({ data, savedName, chartTitle, bgColor }) => {
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
    backgroundColor: bgColor,
    title: {
      text: chartTitle,
      textStyle: {
        color: "#333",
      },
    },
    tooltip: {
      trigger: "item",
      backgroundColor: "#333",
      textStyle: {
        color: "#fff",
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
    legend: {
      // bottom: "0%",
      // left: "0px",
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
        padAngle: 5,
        itemStyle: {
          borderRadius: 10,
          borderColor: bgColor,
          borderWidth: 6,
        },
        label: {
          show: false,
          position: "center",
        },
        // emphasis: {
        //   label: {
        //     show: true,
        //     fontSize: 14,
        //     fontWeight: "bold",
        //   },
        // },
        emphasis: {
          label: {
            show: false, // Set to false to hide the label when hovering
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
    <div style={{ background: bgColor, borderRadius: "12px", padding: "10px" }}>
      {formattedData.length ? (
        <>
          <ReactECharts option={option} lazyUpdate={true} />
        </>
      ) : (
        <>no data</>
      )}
    </div>
  );
};

export default ReactEcharts;
