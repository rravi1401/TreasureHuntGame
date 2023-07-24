import React, { useEffect, useRef } from "react";

import Chart from "chart.js/auto";

function ScoreGraph({ scores }) {
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
        labels: scores.map((item) => item.name),
        datasets: [
          {
            label: "Scores",
            data: scores.map((item) => item.score),
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
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
  }, [scores]);

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

export default ScoreGraph;
