import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  TablePagination,
  Button,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { format } from "date-fns";
import { Money } from "@mui/icons-material";

const TransactionList = ({
  transactions,
  handleMenuOpen,
  handleDeleteTransaction,
  menuAnchorEl,
  handleMenuClose,
}) => {
  // Pagination state
  const [page, setPage] = useState(0); // Current page
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset page to 0 when rows per page change
  };

  // Calculate the transactions to display based on pagination
  const paginatedTransactions = transactions.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box mt={4}>
      <Typography variant="h5">Transactions</Typography>

      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table stickyHeader aria-label="transaction table">
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedTransactions.map((tran) => (
              <TableRow key={tran.id}>
                <TableCell component="th" scope="row">
                  {tran.description}
                </TableCell>
                <TableCell>
                  {tran.createdAt
                    ? format(
                        new Date(tran.createdAt.seconds * 1000),
                        "MMMM dd, yyyy hh:mm a"
                      )
                    : "Date not available"}
                </TableCell>
                <TableCell align="right">
                  <Button
                  startIcon={<Money />}
                    sx={{
                      color:
                        tran.transactionType === "expense" ? "orange" : "green",
                        backgroundColor:
                        tran.transactionType === "expense" ? "#FFF2D7" : "#D1EECC",
                    }}
                  >
                    ${tran.transactionAmount}
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={(event) => handleMenuOpen(event, tran.id)}
                  >
                    <MoreHorizIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={transactions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleDeleteTransaction}>
          Delete Transaction
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>Cancel</MenuItem>
      </Menu>
    </Box>
  );
};

export default TransactionList;
