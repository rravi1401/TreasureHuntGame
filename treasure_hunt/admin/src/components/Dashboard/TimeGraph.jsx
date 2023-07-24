import React, { useEffect, useRef } from "react";

import Chart from "chart.js/auto";

function TimeGraph({ times }) {
  const chartRef = useRef();
  const chartInstanceRef = useRef();

  useEffect(() => {
    const myChartRef = chartRef.current.getContext("2d");

    // destroy any existing chart instance
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // create new chart instance
    chartInstanceRef.current = new Chart(myChartRef, {
      type: "bar",
      data: {
        labels: times.map((item) => item.name),
        datasets: [
          {
            label: "Time Taken in seconds",
            data: times.map((item) => item.timeTaken),
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    // return a cleanup function to destroy the chart instance when the component unmounts
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [times]);

  return (
    <div
      style={{
        width: "80%",
        margin: "auto",
        height: "350px",
        maxWidth: "100%",
        maxHeight: "100%",
      }}
    >
      <canvas ref={chartRef} style={{ maxWidth: "100%", maxHeight: "100%" }} />
    </div>
  );
}

export default TimeGraph;
