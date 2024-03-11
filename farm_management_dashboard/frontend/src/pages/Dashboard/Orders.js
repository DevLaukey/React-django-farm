import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";

const Orders = () => {
  const [incomeData, setIncomeData] = useState([]);

  const userToken = JSON.parse(localStorage.getItem("user"))?.key;
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/income/");
        if (response.ok) {
          const data = await response.json();

          const incomeData = data.filter(
            (user) => user.user_token === userToken
          );
          setIncomeData(incomeData);
        } else {
          console.error("Failed to fetch income data");
        }
      } catch (error) {
        console.error("Error during income data fetching:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Title>Recent Income</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell
              style={{
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              Date
            </TableCell>
            <TableCell
              style={{
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              Description
            </TableCell>
            <TableCell
              style={{
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              Amount
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {incomeData.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{`$${row.amount}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
};

export default Orders;
