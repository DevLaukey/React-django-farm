import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import { ThemeProvider } from "@emotion/react";
import { Box, CssBaseline } from "@mui/material";
import TopBar from "./Components/TopBar";
import CropMonitoring from "./pages/Crops/CropMonitoring";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ViewCrops from "./pages/Crops/ViewCrops";
import Inventory from "./pages/Inventory/Inventory";
import LivestockInventory from "./pages/Inventory/LivestockInventory";
import ViewInventory from "./pages/Inventory/ViewInventory";
import theme from "./theme";
import Employees from "./pages/Employees/employees";
import AddEmployee from "./pages/Employees/addEmployee";
import Financials from "./pages/financials/financials";
import Weather from "./pages/Weather/weather";

const isAuthenticated = () => {
  // Check if the user is logged in. You can modify this check based on your authentication logic.
  const user = JSON.parse(localStorage.getItem("user"));

  return user !== null && user !== undefined;
};

// A wrapper for <Route> that redirects to the login
const PrivateRoute = ({ element, ...rest }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

// A wrapper for <Route> that redirects to the dashboard
const AuthRoute = ({ element, ...rest }) => {
  return !isAuthenticated() ? element : <Navigate to="/" />;
};


const DashboardLayout = ({ children }) => (
  <ThemeProvider theme={theme}>
    <Box sx={{ display: "flex" }}>
      <TopBar />
      <CssBaseline />
      {children}
    </Box>
  </ThemeProvider>
);

const AuthLayout = ({ children }) => (
  <ThemeProvider theme={theme}>
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {children}
    </Box>
  </ThemeProvider>
);

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute
            element={
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            }
          />
        }
      />
      <Route
        path="/add"
        element={
          <PrivateRoute
            element={
              <DashboardLayout>
                <CropMonitoring />
              </DashboardLayout>
            }
          />
        }
      />
      <Route
        path="/view"
        element={
          <PrivateRoute
            element={
              <DashboardLayout>
                <ViewCrops />
              </DashboardLayout>
            }
          />
        }
      />
      <Route
        path="/weather"
        element={
          <PrivateRoute
            element={
              <DashboardLayout>
                <Weather />
              </DashboardLayout>
            }
          />
        }
      />
      <Route
        path="/addEmployee"
        element={
          <PrivateRoute
            element={
              <DashboardLayout>
                <AddEmployee />
              </DashboardLayout>
            }
          />
        }
      />
      <Route
        path="/addInventory"
        element={
          <PrivateRoute
            element={
              <DashboardLayout>
                <Inventory />
              </DashboardLayout>
            }
          />
        }
      />
      <Route
        path="/employees"
        element={
          <PrivateRoute
            element={
              <DashboardLayout>
                <Employees />
              </DashboardLayout>
            }
          />
        }
      />
      <Route
        path="/financials"
        element={
          <PrivateRoute
            element={
              <DashboardLayout>
                <Financials />
              </DashboardLayout>
            }
          />
        }
      />
      <Route
        path="/viewInventory"
        element={
          <PrivateRoute
            element={
              <DashboardLayout>
                <ViewInventory />
              </DashboardLayout>
            }
          />
        }
      />
      <Route
        path="/addLivestock"
        element={
          <PrivateRoute
            element={
              <DashboardLayout>
                <LivestockInventory />
              </DashboardLayout>
            }
          />
        }
      />
      <Route
        path="/login"
        element={
          <AuthRoute
            element={
              <AuthLayout>
                <Login />
              </AuthLayout>
            }
          />
        }
      />
      <Route
        path="/register"
        element={
          <AuthRoute
            element={
              <AuthLayout>
                <Register />
              </AuthLayout>
            }
          />
        }
      />
    </Routes>
  );
}

export default App;
