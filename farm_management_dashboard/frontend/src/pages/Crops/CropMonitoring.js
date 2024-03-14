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


function CropMonitoring() {
  // Retrieve user key from local storage
  const { key } = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  // State for form data and error message
  const [formData, setFormData] = useState({
    name: "",
    variety: "",
    planting_date: "",
    harvest_date: "",
  });
  const [error, setError] = useState(null);

  /**
   * Handle form input change.
   * @param {Object} e - Event object.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /**
   * Handle form submission.
   * @param {Object} e - Event object.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for empty fields
    const emptyFields = Object.keys(formData).filter((key) => !formData[key]);

    if (emptyFields.length > 0) {
      setError(`Please fill in all fields: ${emptyFields.join(", ")}`);
      return;
    }

    setError(null);

    const raw = {
      ...formData,
      user_token: key,
    };

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(raw),
      redirect: "follow",
    };

    console.log(raw);
    fetch("http://127.0.0.1:8000/api/crops/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        result && navigate("/view");
      })
      .catch((error) => alert(error));
  };

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
            sx={{ mt: 10 }}
            onSubmit={handleSubmit}
          >
            <Typography component="h1" variant="h5">
              Add crop
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
                  label="Crop Name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="variety"
                  required
                  fullWidth
                  label="Variety"
                  value={formData.variety}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="planting_date"
                  required
                  fullWidth
                  label="Planting Date"
                  type="date"
                  value={formData.planting_date}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="harvest_date"
                  required
                  fullWidth
                  label="Harvesting Date"
                  type="date"
                  value={formData.harvest_date}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "#296c00", color: "white" }}
            >
              Add Crop
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default CropMonitoring;
