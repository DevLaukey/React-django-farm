import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import Button from "@mui/material/Button";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom";

// Define the columns for the table
const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "phone_number", label: "Phone Number", minWidth: 100 },
  { id: "position", label: "Position", minWidth: 170 },
  { id: "salary", label: "Salary", minWidth: 170,},
  { id: "performance", label: "Performance", minWidth: 170 },
];

export default function Employees() {
  // Define states for page, rowsPerPage and employeeData
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [employeeData, setEmployeeData] = React.useState([]);
  const navigate = useNavigate();

  // Fetch data when component mounts
  React.useEffect(() => {
    const fetchData = async () => {
      const userToken = JSON.parse(localStorage.getItem("user"))?.key;

      // Fetch data only if userToken exists
      if (userToken) {
        try {
          const response = await fetch(
            `http://127.0.0.1:8000/api/employees/?user_token=${userToken}`
          );
          const data = await response.json();

          // Filter data by userToken
          const getUserDataByToken = data.filter((user) => user.user_token === userToken);
          
          // Set employee data
          setEmployeeData(getUserDataByToken);
        } catch (error) {
          console.error("Error fetching employee data", error);
        }
      }
    };

    fetchData();
  }, []);

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Render the component
  return (
    <Paper sx={{ width: "100%", overflow: "hidden", marginTop: "5%" }}>
      <Button
        variant="contained"
        style={{
          backgroundColor: "#296c00",
          color: "white",
          marginLeft: "1%",
          flex: 1,
        }}
        onClick={() => {
          navigate("/addEmployee");
        }}
      >
        Add Employees
      </Button>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {employeeData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof row[column.id] === "number"
                          ? column.format(row[column.id])
                          : row[column.id]}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={employeeData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
