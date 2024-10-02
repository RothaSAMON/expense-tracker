import {
  Box,
  Paper,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { format } from "date-fns"; // Import date-fns for date formatting

const TransactionList = ({
  transactions,
  handleMenuOpen,
  handleDeleteTransaction,
  menuAnchorEl,
  handleMenuClose,
}) => {
  return (
    <Box mt={4}>
      <Typography variant="h5">Transactions</Typography>
      <Box
        sx={{
          maxHeight: "300px",
          overflowY: "auto",
          mt: 2,
        }}
      >
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {transactions.map((tran) => (
            <li key={tran.id} style={{ margin: "8px 0" }}>
              <Paper
                elevation={1}
                sx={{
                  p: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "start",
                }}
              >
                <Box sx={{ flexGrow: 1 }}>
                  <Typography>{tran.description}</Typography>
                  {/* Display the formatted date and time */}
                  <Typography variant="body2" color="textSecondary">
                    {tran.createdAt
                      ? format(
                          new Date(tran.createdAt.seconds * 1000),
                          "MMMM dd, yyyy hh:mm a"
                        )
                      : "Date not available"}
                  </Typography>

                  <Typography
                    sx={{
                      color:
                        tran.transactionType === "expense" ? "red" : "green",
                    }}
                  >
                    ${tran.transactionAmount}
                  </Typography>
                </Box>
                <Box>
                  <IconButton
                    onClick={(event) => handleMenuOpen(event, tran.id)}
                  >
                    <MoreHorizIcon />
                  </IconButton>
                </Box>
              </Paper>
            </li>
          ))}
        </ul>
      </Box>

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
