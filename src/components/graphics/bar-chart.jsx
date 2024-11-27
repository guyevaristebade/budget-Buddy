import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

export const BarChart = ({ stats }) => {
  const [options, setOptions] = useState({});

  useEffect(() => {
    if (stats && Object.keys(stats).length > 0) {
      const roomNames = Object.keys(stats.rooms);
      const itemCounts = roomNames.map((room) => stats.rooms[room].items_count);

      const newOptions = {
        chart: {
          type: "bar",
        },
        series: [
          {
            name: "Nombre d'item",
            data: itemCounts,
          },
        ],
        xaxis: {
          categories: roomNames,
        },
        title: {
          text: "Nombre d'articles par pièce",
          align: "left",
        },
      };
      setOptions(newOptions);
    }
  }, [stats]);

  return (
    <div>
      {options && options.series && options.series.length > 0 && (
        <ReactApexChart
          options={options}
          series={options.series}
          type="bar"
          height={350}
        />
      )}
    </div>
  );
};
