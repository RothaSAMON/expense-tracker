import {
  Circle,
  CurrencyExchange,
  InsertCommentOutlined,
  MoneyOutlined,
  PaidOutlined,
} from "@mui/icons-material";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { useGetTransactions } from "../hooks/useGetTransactions";

const BudgetOverview = () => {
  const { transactionTotals } = useGetTransactions();
  const { balance, income, expenses } = transactionTotals;

  return (
    <Stack
      sx={{
        width: { md: "100%", xs: "none" },
        p: 3,
        gap: 2,
        border: "1px solid #F5F5F5",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        borderRadius: "16px",
      }}
    >
      <Typography variant="h6">Overview</Typography>

      <Stack
        sx={{
          justifyContent: "space-between",
          gap: 2,
          backgroundColor: "#D1E9F6",
          p: 2,
          borderRadius: "16px",
        }}
      >
        <Stack
          sx={{
            flexDirection: { sm: "row", xs: "column" },
            alignItems: {sm: "center", xs: 'start'},
            justifyContent: "space-between",
            gap: 2,
            backgroundColor: "#D1E9F6",
            borderRadius: "16px",
          }}
        >
          <Stack sx={{ flexDirection: "row", gap: 2 }}>
            <Circle fontSize="30px" sx={{ py: "7px", color: "#0D92F4" }} />
            <Box>
              <Typography variant="h6">Your Balance</Typography>
              <Typography variant="subtitle1" color="gray">
                Your total money.
              </Typography>
            </Box>
          </Stack>
          <Typography variant="h6" sx={{ color: "#0D92F4", textWrap: 'wrap' }}>
            {balance >= 0 ? `$${balance}` : `-$${balance * -1}`}
          </Typography>
        </Stack>

        <Stack gap={1}>
          <Typography variant="subtitle1" color="gray">
            This calculate by :
          </Typography>
          <Button
            variant="contained"
            startIcon={<MoneyOutlined style={{ color: "white" }} />}
            disabled
            sx={{
              backgroundColor: "#0D92F4",
              borderRadius: "8px",
              maxWidth: 100,
              textAlign: "center",
              color: "white",
              "&.Mui-disabled": {
                backgroundColor: "#0D92F4",
                color: "white",
              },
            }}
          >
            Income
          </Button>
          <Button
            variant="contained"
            startIcon={<MoneyOutlined style={{ color: "white" }} />}
            disabled
            sx={{
              backgroundColor: "#0D92F4",
              borderRadius: "8px",
              maxWidth: 120,
              textAlign: "center",
              color: "white",
              "&.Mui-disabled": {
                backgroundColor: "#0D92F4",
                color: "white",
              },
            }}
          >
            Expenses
          </Button>
        </Stack>
      </Stack>

      <Stack
        sx={{
          flexDirection: { sm: "row", xs: "column" },
          alignItems: {sm: "center", xs: 'start'},
          justifyContent: "space-between",
          gap: 2,
          backgroundColor: "#D1EECC",
          p: 2,
          borderRadius: "16px",
        }}
      >
        <Stack sx={{ flexDirection: "row", gap: 2 }}>
          <Circle fontSize="30px" sx={{ py: "7px", color: "green" }} />
          <Box>
            <Typography variant="h6">Income</Typography>
            <Typography variant="subtitle1" color="gray">
              Your income money.
            </Typography>
          </Box>
        </Stack>
        <Typography variant="h6" sx={{ color: "green" }}>
          ${income}
        </Typography>
      </Stack>

      <Stack
        sx={{
          flexDirection: { sm: "row", xs: "column" },
          alignItems: {sm: "center", xs: 'start'},
          justifyContent: "space-between",
          gap: 2,
          backgroundColor: "#FFF2D7",
          p: 2,
          borderRadius: "16px",
        }}
      >
        <Stack sx={{ flexDirection: "row", gap: 2 }}>
          <Circle fontSize="30px" sx={{ py: "7px", color: "orange" }} />
          <Box>
            <Typography variant="h6">Expenses</Typography>
            <Typography variant="subtitle1" color="gray">
              Your Expenses money.
            </Typography>
          </Box>
        </Stack>
        <Typography variant="h6" sx={{ color: "orange" }}>
          ${expenses}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default BudgetOverview;
