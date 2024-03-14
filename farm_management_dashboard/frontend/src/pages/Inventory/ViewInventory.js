import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const ViewInventory = () => {
  const [currentInventory, setCurrentInventory] = useState("machines");
  const [inventoryData, setInventoryData] = useState({
    machines: [],
    livestock: [],
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleFilter = (inventoryType) => {
    setCurrentInventory(inventoryType);
  };

  // Fetch inventory data
  const fetchData = async () => {
    try {
      // Fetch data based on the current inventory
      const response =
        currentInventory === "machines"
          ? await fetch("http://127.0.0.1:8000/api/machinery/")
          : await fetch("http://127.0.0.1:8000/api/livestocks/");

      if (response.ok) {
        const data = await response.json();
        setInventoryData((prevData) => ({
          ...prevData,
          [currentInventory]: data,
        }));
      } else {
        // Handle error
       alert("Failed to fetch inventory data");
      }
    } catch (error) {
      console.error("Error during inventory data fetching:", error);
    }
  };

  // Fetch data on initial render
  useEffect(() => {
    fetchData();
  }, [currentInventory]);

  // Update item
  const handleUpdate = (item) => {
    setSelectedItem(item);
    setOpenDialog(true);
  };

  // Delete item
  const handleDelete = async (itemId) => {
    try {
      // Delete item based on the current inventory
      const response =
        currentInventory === "machines"
          ? await fetch(`http://127.0.0.1:8000/api/machinery/${itemId}/`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            })
          : await fetch(`http://127.0.0.1:8000/api/livestocks/${itemId}/`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            });

      if (response.ok) {
        const updatedInventory = {
          ...inventoryData,
          [currentInventory]: inventoryData[currentInventory].filter(
            (item) => item.id !== itemId
          ),
        };
        setInventoryData(updatedInventory);
        alert("Item deleted successfully");
      } else {
        // Handle error
        alert("Failed to delete item");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // Update item 
  const handleSaveUpdate = async () => {
    try {
      // Update item based on the current inventory
      const response =
        currentInventory === "machines"
          ? await fetch(
              `http://127.0.0.1:8000/api/machinery/${selectedItem.id}/`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(selectedItem),
              }
            )
          : await fetch(
              `http://127.0.0.1:8000/api/livestocks/${selectedItem.id}/`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(selectedItem),
              }
            );

      if (response.ok) {
        setOpenDialog(false);
        alert("Item updated successfully");
        // Refresh the data after update
        fetchData();
      } else {
        alert("Failed to update item");
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  // Close dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedItem(null);
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedItem((prevItem) => ({ ...prevItem, [name]: value }));
  };

  return (
    <Container sx={{ marginTop: 10 }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <Button
            variant={currentInventory === "machines" ? "contained" : "outlined"}
            color="primary"
            onClick={() => handleFilter("machines")}
          >
            Machines
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant={
              currentInventory === "livestock" ? "contained" : "outlined"
            }
            color="primary"
            onClick={() => handleFilter("livestock")}
          >
            Livestock
          </Button>
        </Grid>
      </Grid>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {currentInventory === "machines" && (
                <>
                  <TableCell>Plate Number</TableCell>
                  <TableCell>Equipment Name</TableCell>
                  <TableCell>Purchase Price</TableCell>
                  <TableCell>Purchase Date</TableCell>
                  <TableCell>Actions</TableCell>
                </>
              )}
              {currentInventory === "livestock" && (
                <>
                  <TableCell>Tag Number</TableCell>
                  <TableCell>Animal Type</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Breed</TableCell>
                  <TableCell>Weight</TableCell>
                  <TableCell>Purchase Price</TableCell>
                  <TableCell>Purchase Date</TableCell>
                  <TableCell>Actions</TableCell>
                </>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {inventoryData[currentInventory]?.map((item) => (
              <TableRow key={item.id}>
                {currentInventory === "machines" && (
                  <>
                    <TableCell>{item.plate_number}</TableCell>
                    <TableCell>{item.equipment_name}</TableCell>
                    <TableCell>{item.purchase_price}</TableCell>
                    <TableCell>{item.purchase_date}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        onClick={() => handleUpdate(item)}
                        sx={{ marginRight: 5 }}
                      >
                        Update
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </>
                )}
                {currentInventory === "livestock" && (
                  <>
                    <TableCell>{item.tag_number}</TableCell>
                    <TableCell>{item.animal_type}</TableCell>
                    <TableCell>{item.age}</TableCell>
                    <TableCell>{item.breed}</TableCell>
                    <TableCell>{item.weight}</TableCell>
                    <TableCell>{item.purchase_date}</TableCell>
                    <TableCell>{item.purchase_date}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleUpdate(item)}
                        sx={{ marginRight: 5 }}
                      >
                        Update
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Update Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Update Item</DialogTitle>
        <DialogContent>
          <Grid
            container
            spacing={2}
            style={{
              marginTop: "10px",
            }}
          >
            {currentInventory === "machines" && (
              <>
                <Grid item xs={12}>
                  <TextField
                    label="Plate Number"
                    fullWidth
                    value={selectedItem?.plate_number || ""}
                    onChange={handleInputChange}
                    name="plate_number"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Equipment Name"
                    fullWidth
                    value={selectedItem?.equipment_name || ""}
                    onChange={handleInputChange}
                    name="equipment_name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Purchase Price"
                    fullWidth
                    value={selectedItem?.purchase_price || ""}
                    onChange={handleInputChange}
                    name="purchase_price"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Purchase Date"
                    fullWidth
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={selectedItem?.purchase_date || ""}
                    onChange={handleInputChange}
                    name="purchase_date"
                  />
                </Grid>
              </>
            )}
            {currentInventory === "livestock" && (
              <>
                <Grid item xs={12}>
                  <TextField
                    label="Tag Number"
                    fullWidth
                    value={selectedItem?.tag_number || ""}
                    onChange={handleInputChange}
                    name="tag_number"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Animal Type"
                    fullWidth
                    value={selectedItem?.animal_type || ""}
                    onChange={handleInputChange}
                    name="animal_type"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Age"
                    fullWidth
                    value={selectedItem?.age || ""}
                    onChange={handleInputChange}
                    name="age"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Breed"
                    fullWidth
                    value={selectedItem?.breed || ""}
                    onChange={handleInputChange}
                    name="breed"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Weight"
                    fullWidth
                    value={selectedItem?.weight || ""}
                    onChange={handleInputChange}
                    name="weight"
                  />
                </Grid>
              </>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveUpdate} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ViewInventory;
