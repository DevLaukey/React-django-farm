import React, { useState } from "react";
import {
  TextField,
  Button,
  createTheme,
  Container,
  CssBaseline,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

function Inventory() {
  const { key } = JSON.parse(localStorage.getItem("user"));
  // Use the navigate hook from react-router-dom to programmatically navigate
  const navigate = useNavigate();

  // Initialize form values state
  const [formValues, setFormValues] = useState({
    plate_number: "",
    equipment_name: "",
    purchase_price: "",
    purchase_date: "",
  });

  // Handle form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    // Update the form values state
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Initialize error state
  const [error, setError] = useState(null);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for empty fields
    const emptyFields = Object.keys(formValues).filter(
      (key) => !formValues[key]
    );

    // If there are empty fields, set error state and return
    if (emptyFields.length > 0) {
      setError(`Please fill in all fields: ${emptyFields.join(", ")}`);
      return;
    }

    // Reset error state
    setError(null);

    // Prepare the data to be sent
    const raw = {
      ...formValues,
      user_token: key,
    };

    // Prepare the headers for the request
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // Prepare the request options
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(raw),
      redirect: "follow",
    };

    // Log the data to be sent
    console.log(raw);

    // Send the request
    fetch("http://127.0.0.1:8000/api/machinery/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        // If the request was successful, navigate to the inventory view
        result && navigate("/viewInventory");
      })
      .catch((error) => alert(error)); // Handle any errors
  };

  // Render the component
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
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 5 }}
          >
            <Typography component="h1" variant="h5">
              Add Machine
            </Typography>
            {error && (
              <Typography color="error" variant="subtitle2">
                {error}
              </Typography>
            )}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="plate_number"
                  label="Plate Number"
                  name="plate_number"
                  value={formValues.plate_number}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="equipment_name"
                  label="Equipment Name"
                  name="equipment_name"
                  value={formValues.equipment_name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="purchase_price"
                  label="Purchase Price"
                  name="purchase_price"
                  type="number"
                  value={formValues.purchase_price}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="purchase_date"
                  label="Purchase Date"
                  name="purchase_date"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={formValues.purchase_date}
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
              Add
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
// Export the component
export default Inventory;
