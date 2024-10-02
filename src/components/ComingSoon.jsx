import { Box, Stack, Typography } from "@mui/material";
import ComingSoonSvg from "../assets/images/coming-soon.svg";

const ComingSoon = () => {
  return (
    <Stack
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={1}
    >
      <Box
        component="img"
        src={ComingSoonSvg}
        alt="image"
        sx={{ maxWidth: 250, width: "100%" }}
      />
      <Typography
        sx={{ fontSize: { md: "26px", xs: "20px" }, textAlign: "center" }}
      >
        Coming Soon!
      </Typography>
    </Stack>
  );
};

export default ComingSoon;
