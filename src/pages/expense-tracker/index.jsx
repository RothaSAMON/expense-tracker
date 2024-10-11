import { useState } from "react";
import { signOut } from "firebase/auth";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import { auth } from "../../config/firebase-config";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tabs,
  Tab,
  Stack,
} from "@mui/material";
import { useDeleteTransaction } from "../../hooks/useDeleteTransaction";
import TransactionList from "./TransactionList";
import ComingSoon from "../../components/ComingSoon";
import ProfileBar from "../../components/ProfileBar";
import BudgetOverview from "../../components/BudgetOverview";
import Greeting from "../../components/Greeting";
import TransactionForm from "../../components/TransactionForm";
import HeaderBar from "../../components/HeaderBar";

const ExpenseTracker = () => {
  const { transaction, transactionTotals } = useGetTransactions();
  const { deleteTransaction } = useDeleteTransaction();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [selectedTransactionId, setSelectedTransactionId] = useState(null);

  const [openForm, setOpenForm] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);

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

  const handleOpenForm = () => {
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  return (
    <Stack sx={{ my: 3, mx: "auto", maxWidth: 1500, gap: 3, p: 2 }}>
      <ProfileBar />
      <HeaderBar onClick={handleOpenForm} />
      <Stack flexDirection={{ md: "row", xs: "column" }} width="100%" gap={2}>
        <Greeting />
        <BudgetOverview />
      </Stack>

      {/* Transaction Form Modal */}
      <TransactionForm open={openForm} handleClose={handleCloseForm} />

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
    </Stack>
  );
};

export default ExpenseTracker;
