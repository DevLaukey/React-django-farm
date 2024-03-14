import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Dashboard, SupervisedUserCircle } from "@mui/icons-material";
import GrassIcon from "@mui/icons-material/Grass";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import InventoryIcon from "@mui/icons-material/Inventory";
import { Link } from "react-router-dom";
import { Add, ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, List } from "@mui/material";
import AcUnitIcon from "@mui/icons-material/AcUnit";


/**
 * Renders the main list items for the dashboard.
 * @returns {JSX.Element} The main list items component.
 */
export const MainListItems = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [color, setColor] = React.useState("");

  const [open, setOpen] = React.useState(false);
  const [openInventory, setOpenInventory] = React.useState(false);

  /**
   * Handles the click event for the main list item.
   */
  const handleClick = () => {
    setOpen(!open);
  };

  /**
   * Handles the click event for the inventory list item.
   */
  const handleInventoryClick = () => {
    setOpenInventory(!openInventory);
  };

  /**
   * Handles the click event for the list item.
   * @param {Event} event - The click event.
   * @param {number} index - The index of the selected item.
   */
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    setColor("#8c5000");
  };

  return (
    <>
      {/* Dashboard */}
      <ListItemButton
        component={Link}
        to="/"
        selected={selectedIndex === 0}
        color={color}
        onClick={(e) => handleListItemClick(e, 0)}
      >
        <ListItemIcon>
          <Dashboard />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>

      {/* Weather */}
      <ListItemButton
        component={Link}
        to="/weather"
        selected={selectedIndex === 0}
        color={color}
        onClick={(e) => handleListItemClick(e, 0)}
      >
        <ListItemIcon>
          <AcUnitIcon />
        </ListItemIcon>
        <ListItemText primary="Weather" />
      </ListItemButton>

      {/* Employees */}
      <ListItemButton
        component={Link}
        to="/employees"
        selected={selectedIndex === 0}
        color={color}
        onClick={(e) => handleListItemClick(e, 0)}
      >
        <ListItemIcon>
          <SupervisedUserCircle />
        </ListItemIcon>
        <ListItemText primary="Employees" />
      </ListItemButton>

      {/* Financials */}
      <ListItemButton
        component={Link}
        to="/financials"
        selected={selectedIndex === 0}
        color={color}
        onClick={(e) => handleListItemClick(e, 0)}
      >
        <ListItemIcon>
          <AccountBalanceIcon />
        </ListItemIcon>
        <ListItemText primary="Financials" />
      </ListItemButton>

      {/* Crop Monitoring */}
      <ListItemButton
        component={Link}
        to="/add"
        selected={selectedIndex === 0}
        onClick={(e) => {
          handleClick();
          handleListItemClick(e, 0);
        }}
      >
        <ListItemIcon>
          <GrassIcon />
        </ListItemIcon>
        <ListItemText primary="Crop Monitoring" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List>
          {/* Add Crop */}
          <ListItemButton component={Link} to="/add">
            <ListItemIcon>
              <Add />
            </ListItemIcon>
            <ListItemText primary="Add Crop" />
          </ListItemButton>

          {/* View Crop */}
          <ListItemButton component={Link} to="/view">
            <ListItemIcon>
              <GrassIcon />
            </ListItemIcon>
            <ListItemText primary="View Crop" />
          </ListItemButton>
        </List>
      </Collapse>

      {/* Inventory Tracking */}
      <ListItemButton
        selected={selectedIndex === 0}
        component={Link}
        to="/addInventory"
        onClick={(e) => {
          handleInventoryClick();
          handleListItemClick(e, 0);
        }}
      >
        <ListItemIcon>
          <InventoryIcon />
        </ListItemIcon>
        <ListItemText primary="Inventory Tracking" />
        <ListItemText
          style={{
            marginTop: "10px",
            marginLeft: "20px",
          }}
        >
          {openInventory ? <ExpandLess /> : <ExpandMore />}
        </ListItemText>
      </ListItemButton>
      <Collapse in={openInventory} timeout="auto" unmountOnExit>
        <List>
          {/* Add Machine */}
          <ListItemButton component={Link} to="/addInventory">
            <ListItemIcon>
              <Add />
            </ListItemIcon>
            <ListItemText primary="Add Machine" />
          </ListItemButton>

          {/* Add Livestock */}
          <ListItemButton component={Link} to="/addLivestock">
            <ListItemIcon>
              <Add />
            </ListItemIcon>
            <ListItemText primary="Add Livestock" />
          </ListItemButton>

          {/* View Inventory */}
          <ListItemButton component={Link} to="/viewInventory">
            <ListItemIcon>
              <InventoryIcon />
            </ListItemIcon>
            <ListItemText primary="View Inventory" />
          </ListItemButton>
        </List>
      </Collapse>
    </>
  );
};
