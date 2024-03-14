import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { LineChart, axisClasses } from "@mui/x-charts";

import Title from "./Title";

/**
 * Renders a chart component displaying expenditure data.
 * @returns {JSX.Element} The chart component.
 */
const Chart = () => {
  const theme = useTheme();
  const [expenditureData, setExpenditureData] = useState([]);
    const userToken = JSON.parse(localStorage.getItem("user"))?.key;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/expenditure/");
        if (response.ok) {
          const data = await response.json();

          const expenditureData = data.filter(
            (user) => user.user_token === userToken
          )

          setExpenditureData(expenditureData);
        } else {
          console.error("Failed to fetch expenditure data");
        }
      } catch (error) {
        console.error("Error during expenditure data fetching:", error);
      }
    };

    fetchData();
  }, []);

  // Convert fetched data to the format expected by LineChart
  const chartData = expenditureData.map((entry) => ({
    time: entry.date,
    amount: parseFloat(entry.amount),
  }));

  return (
    <React.Fragment>
      <Title color="#1a1c18">Expenditure</Title>
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
              label: "Expenditure ($)",
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
    </React.Fragment>
  );
};

export default Chart;
