import React from "react";
import { Line, defaults } from "react-chartjs-2";

defaults.plugins.tooltip.enabled = true;
defaults.plugins.legend.position = "bottom";

interface Props {
  currencyValues: string[],
  dateList: string[],
}

const LineGraph = ({ currencyValues, dateList }: Props) => {
  return (
    <div className="graphContainer">
      {currencyValues.length ? (
        <Line
          type="line"
          data={{
            labels: [...dateList],
            datasets: [
              {
                label: "Historical Dates",
                data: [...currencyValues],
              },
            ],
          }}
          height={400}
          width={600}
          options={{
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
            legend: {
              labels: {
                fontSize: 25,
              },
            },
          }}
        />
      ) : null}
    </div>
  );
};

export default LineGraph;
