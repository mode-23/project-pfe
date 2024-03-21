import React from "react";
import ReactECharts from "echarts-for-react";

const BarEchart = ({ bgColor, data, savedName, chartTitle }) => {
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
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      backgroundColor: "#333",
      textStyle: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
      },
      formatter: function (params) {
        const borderColor = params[0]?.color;
        const circleIndicator =
          '<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;background-color:' +
          borderColor +
          '"></span>';
        return (
          circleIndicator +
          `<span style="color: ${borderColor};">${params[0]?.name}</span>: ${params[0]?.value}`
        );
      },
      extraCssText: "border: none;",
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        show: false,
        data: formattedData?.map((item) => item.name),
        axisTick: {
          alignWithLabel: true,
        },
        axisLine: {
          show: false,
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        splitLine: {
          show: true,
          lineStyle: {
            type: "dashed",
            width: 1,
            color: "rgba(0, 0, 0, 0.2)",
            interval: 80,
          },
        },
      },
    ],
    toolbox: {
      feature: {
        saveAsImage: {
          name: savedName,
        },
      },
    },
    series: [
      {
        name: "Direct",
        type: "bar",
        barWidth: "40%",
        itemStyle: {
          color: "#ff7900",
          borderRadius: 10,
          opacity: 0.5,
          emphasis: {
            opacity: 1,
          },
        },
        emphasis: {
          focus: "series",
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
    <div
      style={{
        background: bgColor,
        borderRadius: "12px",
        padding: "10px",
      }}
    >
      <ReactECharts option={option} lazyUpdate={true} />
    </div>
  );
};

export default BarEchart;
