import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

export const LineChart = ({ stats }) => {
  const [options, setOptions] = useState({});

  useEffect(() => {
    if (stats && Object.keys(stats).length > 0) {
      const years = Object.keys(stats.years);
      const expenses = Object.values(stats.years);

      const newOptions = {
        series: [
          {
            name: "Dépenses",
            data: expenses,
          },
        ],
        chart: {
          type: "line",
        },
        xaxis: {
          categories: years,
          title: {
            text: "Années",
          },
        },
        yaxis: {
          title: {
            text: "Dépenses",
          },
        },
        title: {
          text: "Évolution des dépenses au fil des années",
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
          type="line"
          height={350}
        />
      )}
    </div>
  );
};
