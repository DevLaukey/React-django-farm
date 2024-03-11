import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import { Link as RouterLink } from "react-router-dom";
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

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = React.useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password"); 

    if (!email || !password ) {
      setError("Email and password are required");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/auth/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        const userData = await response.json();

        // Store user details in local storage
        localStorage.setItem("user", JSON.stringify(userData));

        // Redirect to the '/' route
        navigate("/");
      } else {
        // Handle login failure
        setError("Invalid email or password");
      }
    } catch (error) {
      setError("Error during login");
      console.error("Error during login:", error);
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
          <Avatar sx={{ m: 1, bgcolor: "#93fb5f" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              color="secondary"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "#296c00", color: "white" }}
            >
              Sign In
            </Button>
          </Box>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <RouterLink
                to={"/register"}
                variant="body2"
                sx={{ color: "#8c5000" }}
              >
                Create Account? Register
              </RouterLink>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
