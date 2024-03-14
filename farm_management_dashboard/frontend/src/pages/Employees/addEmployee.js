import React, { useState } from "react";
import {
  ThemeProvider,
  CssBaseline,
  Container,
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  createTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

function AddEmployee() {
  // Retrieve user key from local storage
  const { key } = JSON.parse(localStorage.getItem("user"));

  // Hook for navigation
  const navigate = useNavigate();

  // State for form data and error
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Update form data with new values
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for empty fields
    const emptyFields = Object.keys(formData).filter((key) => !formData[key]);

    // If there are empty fields, set error message
    if (emptyFields.length > 0) {
      setError(`Please fill in all fields: ${emptyFields.join(", ")}`);
      return;
    }

    // Clear error message
    setError(null);

    // Prepare data for API call
    const raw = {
      ...formData,
      user_token: key,
    };

    // Set headers for API call
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // Set options for API call
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(raw),
      redirect: "follow",
    };

    // Make API call to add new employee
    fetch("http://127.0.0.1:8000/api/employees/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // If successful, navigate to employees page
        result && navigate("/employees");
      })
      .catch((error) => alert(error)); // Show error if API call fails
  };

  // Render form for adding new employee
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
            onSubmit={handleSubmit}
          >
            <Typography component="h1" variant="h5">
              Add Employee
            </Typography>
            {error && (
              <Typography color="error" variant="subtitle2">
                {error}
              </Typography>
            )}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  label="Name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="phone_number"
                  required
                  fullWidth
                  label="Phone Number"
                  value={formData.phone_number}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="position"
                  required
                  fullWidth
                  label="Position"
                  value={formData.position}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="salary"
                  required
                  fullWidth
                  label="Salary"
                  type="number"
                  value={formData.salary}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="performance"
                  required
                  fullWidth
                  label="Performance"
                  multiline
                  rows={4}
                  value={formData.performance}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "#296c00", color: "white" }}
            >
              Add Employee
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default AddEmployee;
