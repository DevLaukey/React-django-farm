import React from "react";
import { LineChart, axisClasses } from "@mui/x-charts";
import { useTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";

const Chart = ({ data }) => {
  const theme = useTheme();

  // Convert fetched data to the format expected by LineChart
  const chartData = data.map((entry) => ({
    time: entry.time,
    amount: parseFloat(entry.amount),
  }));

  return (
    <div>
      <Typography variant="h6">Weather Chart</Typography>
      <div style={{ width: "100%", flexGrow: 1, overflow: "hidden" }}>
        <LineChart
          dataset={chartData}
          margin={{
            top: 16,
            right: 20,
            left: 70,
            bottom: 30,
          }}
          xAxis={[
            {
              scaleType: "point",
              dataKey: "time",
              tickNumber: 2,
              tickLabelStyle: theme.typography.body2,
            },
          ]}
          yAxis={[
            {
              label: "Temperature (°C)", // Customize label based on the API data
              labelStyle: {
                ...theme.typography.body1,
                fill: theme.palette.text.primary,
              },
              tickLabelStyle: theme.typography.body2,
              tickNumber: 3,
            },
          ]}
          series={[
            {
              dataKey: "amount",
              showMark: false,
              color: "#93fb5f",
            },
          ]}
          sx={{
            [`.${axisClasses.root} line`]: {
              stroke: theme.palette.text.secondary,
            },
            [`.${axisClasses.root} text`]: {
              fill: theme.palette.text.secondary,
            },
            [`& .${axisClasses.left} .${axisClasses.label}`]: {
              transform: "translateX(-25px)",
            },
          }}
        />
      </div>
    </div>
  );
};

export default Chart;
