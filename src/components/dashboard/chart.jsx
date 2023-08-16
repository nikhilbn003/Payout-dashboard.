import React, { useEffect, useRef } from "react";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";

import moment from "moment";

const LineGraph = ({ earningsData }) => {
  const chartRef = useRef();
  console.log("earningsData:", earningsData);
  // Filter earningsData to include only the last 7 months
  const lastSevenMonthsData = earningsData.filter(
    (entry) => moment().diff(moment(entry.earn_month), "months") <= 8
  );
  console.log("lastSevenMonthsData:", lastSevenMonthsData);

  // Merge and calculate total_earn for each prop_name
  const mergedData = lastSevenMonthsData.reduce((data, current) => {
    const prop_name = current.prop_name;
    const total_earn = current.total_earn;
    const earn_month = moment(current.earn_month).format("MMMM YYYY");

    data[prop_name] ??= { prop_name, earnings: [] };
    data[prop_name].earnings.push({ earn_month, total_earn });

    return data;
  }, {});

  // Convert mergedData object into an array of objects
  const dataEntries = Object.values(mergedData);

  console.log("dataEntries:", dataEntries);

  const monthNamesSet = new Set();

  dataEntries.forEach((item) => {
    item.earnings.forEach((earning) => {
      monthNamesSet.add(earning.earn_month);
    });
  });

  // Convert month names to date objects and sort them
  const sortedMonthDates = Array.from(monthNamesSet).map((month) =>
    moment(month, "MMMM YYYY").toDate()
  );

  // Sort the date objects in chronological order
  sortedMonthDates.sort((a, b) => a - b);

  // Format the sorted date objects back to month names
  const monthNames = sortedMonthDates.map((date) =>
    moment(date).format("MMM YYYY")
  );

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    Chart.register(
      LineController,
      LineElement,
      PointElement,
      LinearScale,
      CategoryScale,
      Tooltip,
      Legend
    );

    // Specific RGB colors
    const colors = [
      "bg-black",
      "rgb(255, 99, 132)",
      "rgb(0, 255, 0)",
      "rgb(75, 192, 192)",
    ];

    // Create datasets based on dataEntries
    const filteredDataEntries = dataEntries.filter(
      (entry) => entry.prop_name !== ""
    );
    const datasets = filteredDataEntries.map((item, index) => {
      // Extract the total_earn values for each property
      const totalEarnArray = item.earnings.map((earning) => earning.total_earn);

      return {
        label: item.prop_name,
        data: totalEarnArray,
        borderColor: colors[index % colors.length],
        tension: 0.3,
      };
    });

    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: monthNames,
        datasets: datasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            type: "category",
            labels: monthNames,
            grid: {
              display: false,
            },
          },
          y: {
            grid: {
              display: false,
            },
          },
        },
      },
    });

    return () => {
      chart.destroy();
    };
  }, [dataEntries]);

  return (
    <>
      <div className="w-full h-96 bg-white p-4 mt-7 rounded-lg  group shadow-md shadow-green-500/50">
        <h2 className="text-xl font-bold -mt-4 relative inline-block mb-2">
          Property Wise Earnings
          <div className="absolute left-0 right-0 bottom-0 h-1 bg-primary transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-200 -mb-1"></div>
        </h2>
        <canvas ref={chartRef} className="mb-4"></canvas>
      </div> 
    </>
  );
};

export default LineGraph;
