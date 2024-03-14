import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";

// Orders component
const Orders = () => {
  // State for storing income data
  const [incomeData, setIncomeData] = useState([]);

  // Getting user token from local storage
  const userToken = JSON.parse(localStorage.getItem("user"))?.key;
  
  // Fetching income data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Making a GET request to the income API
        const response = await fetch("http://127.0.0.1:8000/api/income/");
        if (response.ok) {
          // Parsing the response to JSON
          const data = await response.json();

          // Filtering the data to only include income data for the current user
          const incomeData = data.filter(
            (user) => user.user_token === userToken
          );
          // Updating the state with the fetched income data
          setIncomeData(incomeData);
        } else {
          // Logging an error if the request was not successful
          console.error("Failed to fetch income data");
        }
      } catch (error) {
        // Logging any errors that occurred during the fetch
        console.error("Error during income data fetching:", error);
      }
    };

    // Calling the fetch function
    fetchData();
  }, []);

  // Rendering the component
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
          {/* Mapping over the income data and creating a table row for each entry */}
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

// Exporting the Orders component
export default Orders;
