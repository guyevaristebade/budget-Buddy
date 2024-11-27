import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

export const AreaChart = ({ stats }) => {
  const [options, setOptions] = useState({});

  useEffect(() => {
    if (stats && Object.keys(stats).length > 0) {
      const roomNames = Object.keys(stats.rooms);
      const roomPrices = roomNames.map((room) => stats.rooms[room].room_price);

      const newOptions = {
        series: [
          {
            name: "Distribution des prix",
            data: roomPrices,
          },
        ],
        chart: {
          type: "area",
        },
        xaxis: {
          categories: roomNames,
          title: {
            text: "Pièces",
          },
        },
        yaxis: {
          title: {
            text: "Prix",
          },
        },
        title: {
          text: "Distribution des prix par pièces",
        },
      };
      setOptions(newOptions);
    }
  }, []);

  return (
    <div>
      {options && options.series && options.series.length > 0 && (
        <ReactApexChart
          options={options}
          series={options.series}
          type="area"
          height={350}
        />
      )}
    </div>
  );
};
