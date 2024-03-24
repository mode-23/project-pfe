import React from "react";
import ReactECharts from "echarts-for-react";
import { PiChartDonutFill } from "react-icons/pi";

const ReactEcharts = ({ data, savedName, chartTitle, bgColor }) => {
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
      orient: "vertical",
      x: "left",
      y: "bottom",
      formatter: function (name) {
        let data = option.series[0].data;
        let total = 0;
        for (let i = 0; i < data.length; i++) {
          total += data[i].value;
          if (data[i].name === name) {
            return `${name} : ${data[i].value}`;
          }
        }
        return `${name} : 0`;
      },
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
    <div style={{ background: bgColor, borderRadius: "25px", padding: "10px" }}>
      {formattedData.length ? (
        <>
          <ReactECharts option={option} lazyUpdate={true} />
        </>
      ) : (
        <div className="no_chart_data">
          <PiChartDonutFill />
          <h3>No data</h3>
        </div>
      )}
    </div>
  );
};

export default ReactEcharts;
