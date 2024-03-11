import * as React from "react";
import Avatar from "@mui/material/Avatar";
import { Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";


const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#93fb5f",
    },
    secondary: {
      main: "#296c00",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& label.Mui-focused": {
            color: "#072100",
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: "#93fb5f",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#93fb5f",
            },
            "&:hover fieldset": {
              borderColor: "#93fb5f",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#93fb5f",
            },
          },
        },
      },
    },
  },
});

export default function Register() {
  const [error, setError] = React.useState(null);

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const username = formData.get("username");
    const email = formData.get("email");
    const password1 = formData.get("password1");
    const password2 = formData.get("password2");
    
    // check if the fields are empty
    if (!username || !email || !password1 || !password2) {
      setError("All fields are required");
      return;    
    }
      // Check if passwords match
    if (password1 !== password2) {
      setError("Passwords do not match");
      return;
    }


    const userData = {
      username,
      email,
      password1,
      password2,
    };

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      username: userData.username,
      email: userData.email,
      password: userData.password1,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/auth/registration/",
        requestOptions
      );

      if (!response.ok) {
        throw new Error(`Registration failed: ${response.statusText}`);
      } 

      const result = await response.json();
      console.log(result);

      if (result.id) {
        localStorage.setItem("username", result.username);
        navigate("/login");
      } else {
        setError("An error occurred during registration");
      }
    } catch (error) {
      setError(`Error: ${error.message}`);
    }
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
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="username"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password1"
                  label="Password"
                  type="password"
                  id="password1"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password2"
                  label="Confirm Password"
                  type="password"
                  id="password2"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            {error && (
              <Typography variant="body2" color="error">
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "#296c00", color: "white" }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <RouterLink
                  to={"/login"}
                  variant="body2"
                  sx={{ color: "#8c5000" }}
                >
                  Already have an account? Sign in
                </RouterLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
