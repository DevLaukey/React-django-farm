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

// Create a default theme
const defaultTheme = createTheme();

const Financials = () => {
  // Retrieve user key from local storage
  const { key } = JSON.parse(localStorage.getItem("user"));

  // Initialize navigation hook
  const navigate = useNavigate();

  // Initialize form data state
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    date: "",
  });

  // Initialize error state
  const [error, setError] = useState(null);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for empty fields
    const emptyFields = Object.keys(formData).filter(
      (key) => !formData[key]
    );

    // If there are empty fields, set error state and return
    if (emptyFields.length > 0) {
      setError(`Please fill in all fields: ${emptyFields.join(", ")}`);
      return;
    }

    // Reset error state
    setError(null);

    // Prepare data for submission
    const raw = {
      ...formData,
      user_token: key,
    };

    try {
      // Make POST request to API
      const response = await fetch("http://127.0.0.1:8000/api/expenditure/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(raw),
      });

      // Handle the response as needed
      if (response.ok) {
        // Data successfully submitted
        alert("Expenditure added successfully");
        navigate("/")
      } else {
        // Handle error response
        alert("Error adding expenditure");
      }
    } catch (error) {
      console.error("Error adding expenditure", error);
    }
  };

  // Render form
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
              Add Expenditure
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="amount"
                  required
                  fullWidth
                  label="Expenditure Amount"
                  type="number"
                  value={formData.amount}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="description"
                  required
                  fullWidth
                  label="Description"
                  multiline
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="date"
                  required
                  fullWidth
                  type="date"
                  value={formData.date}
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
              Add Expenditure
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Financials;
