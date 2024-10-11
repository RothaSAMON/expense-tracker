import { useState } from "react";
import { useAddTransaction } from "../hooks/useAddTransaction";
import {
  Box,
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Stack,
} from "@mui/material";
import { Close } from "@mui/icons-material";

const TransactionForm = ({ open, handleClose }) => {
  const { addTransaction } = useAddTransaction();

  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(null);
  const [transactionType, setTransactionType] = useState("expense");

  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await addTransaction({
      description,
      transactionAmount,
      transactionType,
    });
    setLoading(false);

    setDescription("");
    setTransactionAmount(0);
    handleClose(); // Close the modal after submission
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6">Add Transaction</Typography>
          <IconButton
            onClick={handleClose}
            sx={{
              "&:hover": {
                backgroundColor: "#EEEEEE",
              },
            }}
          >
            <Close />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Stack component="form" onSubmit={onSubmit} sx={{ my: 2 }}>
          <TextField
            fullWidth
            label="Description"
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            type="number"
            label="Amount"
            value={transactionAmount}
            required
            onChange={(e) => setTransactionAmount(e.target.value)}
            sx={{ mb: 2 }}
          />
          <FormControl component="fieldset">
            <RadioGroup
              row
              value={transactionType}
              onChange={(e) => setTransactionType(e.target.value)}
            >
              <FormControlLabel
                value="expense"
                control={<Radio />}
                label="Expense"
              />
              <FormControlLabel
                value="income"
                control={<Radio />}
                label="Income"
              />
            </RadioGroup>
          </FormControl>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loading}
          onClick={onSubmit}
          sx={{
            borderRadius: "10px",
            backgroundColor: "#0D92F4",
            color: "white",
            "&:hover": {
              backgroundColor: "#0D92FF",
            },
          }}
        >
          {loading ? <CircularProgress size={24} /> : "Add Transaction"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TransactionForm;
