import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Title from "./Title";

/**
 * Component for managing income deposits.
 * Displays the total income, allows adding new income transactions,
 * and shows a modal for adding income.
 */
export default function Deposits() {
  const [openModal, setOpenModal] = useState(false);
  const [incomeData, setIncomeData] = useState({
    description: "",
    amount: null,
    date: null,
  });
  const [incomeTransactions, setIncomeTransactions] = useState([]);
  const [error, setError] = useState(null);
    const userToken = JSON.parse(localStorage.getItem("user"))?.key;


  useEffect(() => {
    // Fetch income data from the API
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/income/");
        if (response.ok) {
          const data = await response.json();
          
          const incomeData = data.filter(
            (user) => user.user_token === userToken
          );
          setIncomeTransactions(incomeData);
        } else {
          console.error("Failed to fetch income data");
        }
      } catch (error) {
        console.error("Error during income data fetching:", error);
      }
    };

    fetchData();
  }, []);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    // Reset form fields
    setIncomeData({
      description: "",
      amount: null,
      date: null,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIncomeData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emptyFields = Object.keys(incomeData).filter(
      (key) => !incomeData[key]
    );

    if (emptyFields.length > 0) {
      setError(`Please fill in all fields: ${emptyFields.join(", ")}`);
      return;
    }

    setError(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/income/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          description: incomeData.description,
          amount: parseFloat(incomeData.amount),
          date: incomeData.date,
          user_token: userToken,
        }),
      });

      if (response.ok) {
        // Update the local state with the new income transaction
        const newTransaction = await response.json();
        setIncomeTransactions((prevTransactions) => [
          ...prevTransactions,
          newTransaction,
        ]);

        // Close the modal after successful submission
        handleCloseModal();
      } else {
        console.error("Failed to add income to the database");
      }
    } catch (error) {
      console.error("Error during income data submission:", error);
    }
  };


  const getTotalIncome = () => {
    return incomeTransactions.reduce(
      (total, transaction) => total + parseFloat(transaction.amount),
      0
    );
  };

  function getCurrentDate() {
    return new Date().toUTCString();
  }

  return (
    <React.Fragment>
      <Title>Income</Title>
      <Typography component="p" variant="h4">
        ${getTotalIncome().toFixed(2)}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on {getCurrentDate()}
      </Typography>
      <div>
        <Button color="primary" href="#" onClick={handleOpenModal}>
          Add Income
        </Button>
      </div>

      {/* Add Income Modal */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="add-income-modal"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="div" id="add-income-modal">
            Add Income
          </Typography>
          {error && (
            <Typography color="error" variant="subtitle2">
              {error}
            </Typography>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Description"
              name="description"
              value={incomeData.description}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Amount"
              type="number"
              name="amount"
              value={incomeData.amount}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Date"
              type="date"
              name="date"
              value={incomeData.date}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <Button type="submit" variant="contained" color="primary">
              Add
            </Button>
          </form>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
