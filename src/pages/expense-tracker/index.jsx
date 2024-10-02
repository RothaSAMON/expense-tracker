import { useState } from "react";
import { signOut } from "firebase/auth";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { auth } from "../../config/firebase-config";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Avatar,
  Container,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tabs,
  Tab,
  CircularProgress,
  Stack,
} from "@mui/material";
import { useDeleteTransaction } from "../../hooks/useDeleteTransaction";
import { useThemeToggle } from "../../ThemeContext";
import TransactionList from "./TransactionList";
import ComingSoon from "../../components/ComingSoon";
import PaidOutlined from "@mui/icons-material/PaidOutlined";
import CurrencyExchange from "@mui/icons-material/CurrencyExchange";

const ExpenseTracker = () => {
  const { addTransaction } = useAddTransaction();
  const { transaction, transactionTotals } = useGetTransactions();
  const { name, profilePhoto } = useGetUserInfo();
  const { deleteTransaction } = useDeleteTransaction();
  const navigate = useNavigate();
  const { toggleTheme } = useThemeToggle();

  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(null);
  const [transactionType, setTransactionType] = useState("expense");
  const [open, setOpen] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [selectedTransactionId, setSelectedTransactionId] = useState(null);

  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);

  const { balance, income, expenses } = transactionTotals;

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
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const confirmSignOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleMenuOpen = (event, id) => {
    setSelectedTransactionId(id);
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleDeleteTransaction = async () => {
    setLoading(true);
    await deleteTransaction(selectedTransactionId);
    setLoading(false);
    handleMenuClose();
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="md" sx={{ my: 3, mx: "auto" }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
        >
          <Typography variant="h4" component="h1">
            {name}'s Expense Tracker
          </Typography>
          {profilePhoto ? (
            <Avatar
              alt="User Profile"
              src={profilePhoto}
              sx={{ width: 56, height: 56 }}
            />
          ) : (
            <Typography>No profile photo</Typography>
          )}
        </Box>

        <Box textAlign="center" mb={4}>
          <Typography variant="h6">Your Balance</Typography>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: balance >= 0 ? "green" : "red" }}
          >
            {balance >= 0 ? `$${balance}` : `-$${balance * -1}`}
          </Typography>
        </Box>

        <Stack spacing={2} mb={4} direction={{ xs: "column", sm: "row" }}>
          <Paper
            elevation={2}
            sx={{ p: 2, textAlign: "center", flex: 1, borderRadius: "8px" }}
          >
            <PaidOutlined
              sx={{
                backgroundColor: "#D1E9F6",
                p: 2,
                borderRadius: "8px",
                color: "#4379F2",
              }}
            />
            <Typography variant="subtitle1">Income</Typography>
            <Typography variant="h6" sx={{ color: "green" }}>
              ${income}
            </Typography>
          </Paper>
          <Paper
            elevation={2}
            sx={{ p: 2, textAlign: "center", flex: 1, borderRadius: "8px" }}
          >
            <CurrencyExchange
              sx={{
                backgroundColor: "#FCC8D1",
                p: 2,
                borderRadius: "8px",
                color: "#FF0000",
              }}
            />
            <Typography variant="subtitle1">Expenses</Typography>
            <Typography variant="h6" sx={{ color: "red" }}>
              ${expenses}
            </Typography>
          </Paper>
        </Stack>

        <Box component="form" onSubmit={onSubmit} mb={4}>
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
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Add Transaction"}
          </Button>
        </Box>

        <Button
          variant="outlined"
          color="secondary"
          onClick={handleClickOpen}
          fullWidth
          sx={{ mt: 2 }}
        >
          Sign Out
        </Button>

        <Button variant="outlined" onClick={toggleTheme} sx={{ mt: 2 }}>
          Toggle Theme
        </Button>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Confirm Sign Out</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to sign out? All unsaved changes will be
              lost.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => {
                confirmSignOut();
                handleClose();
              }}
              color="secondary"
              autoFocus
            >
              Sign Out
            </Button>
          </DialogActions>
        </Dialog>

        <Tabs value={tabValue} onChange={handleTabChange} sx={{ mt: 4 }}>
          <Tab label="Transaction" />
          <Tab label="Monthly" />
        </Tabs>

        {tabValue === 0 && (
          <TransactionList
            transactions={transaction}
            handleMenuOpen={handleMenuOpen}
            handleDeleteTransaction={handleDeleteTransaction}
            menuAnchorEl={menuAnchorEl}
            handleMenuClose={handleMenuClose}
          />
        )}
        {tabValue === 1 && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="250px"
          >
            <ComingSoon />
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default ExpenseTracker;
