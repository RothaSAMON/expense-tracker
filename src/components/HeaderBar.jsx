import { Add } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import React from "react";

const HeaderBar = ({ onClick }) => {
  return (
    <Stack
      sx={{
        flexDirection: { md: "row", xs: "column" },
        justifyContent: "space-between",
      }}
    >
      <Stack>
        <Typography variant="h5" fontWeight={550}>
          Monitor Your Daily Progress
        </Typography>
        <Typography color="gray">
          Stay informed about your daily activities and achievements.
        </Typography>
      </Stack>

      <Button
        variant="contained"
        onClick={onClick}
        sx={{ mt: 2, backgroundColor: "#0D92F4", borderRadius: "10px" }}
        startIcon={<Add />}
      >
        Add Transaction
      </Button>
    </Stack>
  );
};

export default HeaderBar;
