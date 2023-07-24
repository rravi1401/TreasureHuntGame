import React, { useEffect, useRef } from "react";

import Chart from "chart.js/auto";

const SkillsGraph = ({ data }) => {
  const chartRef = useRef();

  useEffect(() => {
    if (data.length) {
      const ctx = chartRef.current.getContext("2d");
      const chartData = {
        labels: data.map((d) => d.name),
        datasets: [
          {
            label: data[0].softSkills[0].name,
            data: data.map((d) => d.softSkills[0].percentage),
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
          {
            label: data[0].softSkills[1].name,
            data: data.map((d) => d.softSkills[1].percentage),
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
          {
            label: data[0].softSkills[2].name,
            data: data.map((d) => d.softSkills[2].percentage),
            backgroundColor: "rgba(255, 206, 86, 0.2)",
            borderColor: "rgba(255, 206, 86, 1)",
            borderWidth: 1,
          },
        ],
      };
      const options = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                max: 100,
              },
            },
          ],
        },
      };
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }
      chartRef.current.chart = new Chart(ctx, {
        type: "bar",
        data: chartData,
        options,
      });
    }
  }, [data]);

  return (
    <div
      style={{
        width: "80%",
        margin: "auto",
        height: "350px",
        maxHeight: "100%",
        maxWidth: "100%",
      }}
    >
      <canvas id="myChart" ref={chartRef} />
    </div>
  );
};

export default SkillsGraph;
