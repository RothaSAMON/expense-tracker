import { Avatar, Box, Stack, Typography } from "@mui/material";
import { useGetUserInfo } from "../hooks/useGetUserInfo";
import HeroImage from "../assets/images/undraw-program.svg";

const Greeting = () => {
  const { name, loginDate } = useGetUserInfo();

  return (
    <Stack
      width={{md: "100%", xs: 'none'}}
      sx={{
        p: 3,
        gap: 2,
        border: "1px solid #F5F5F5",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        borderRadius: "16px",
        justifyContent: 'center'
      }}
    >
      <Stack alignItems="center" gap={2}>
        <Typography variant="h5">Good morning, {name}!👋</Typography>
        <Typography variant="body1" color="gray">
          Hello there, is this a new thing that is really happen to me.
        </Typography>

        <Box
          component="img"
          src={HeroImage}
          alt="Image"
          maxWidth={400}
          width="100%"
        />
        <Typography variant="body2" color="gray">
          Your login date: 
          {loginDate
            ? new Date(loginDate).toLocaleString()
            : "No date login provided"}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default Greeting;
