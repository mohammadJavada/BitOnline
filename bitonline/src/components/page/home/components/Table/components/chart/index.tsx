import { Line } from "react-chartjs-2";
import React from "react";

// import CS from "./HistoryLineChart.module.scss";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
} from "chart.js";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale
);

const HistoryLineChart_ = ({
  width = null,
  height = null,
  //
  history = [],
  status = "Y",
}: any) => {
  const lastHistory = history;

  const data = {
    labels: lastHistory.map((item: any) => (item ? "" : "-")),
    datasets: [
      {
        label: "",
        data: history,
        fill: true,
        borderColor: status === "Y" ? "#00C851" : "#FF3547",
        backgroundColor: status === "Y" ? "rgba(76,221,146,.4" : "#FF354744",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },

    elements: {
      backgroundColor: "rgb(255, 99, 71)",
      line: {
        tension: 0.1,
      },
    },
    interaction: {
      intersect: false,
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        },
      },
      x: {
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div>
      <Line data={data} options={options} width={width} height={height} />
    </div>
  );
};

export const HistoryLineChart = React.memo(HistoryLineChart_, () => true);
