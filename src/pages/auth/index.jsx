import { auth, provider } from "../../config/firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate, Navigate } from "react-router-dom";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { Box, Button, Typography, Stack } from "@mui/material";
import GhostGameSvg from "../../assets/images/Horror-video-game.svg";
import ComingSoon from "../../components/ComingSoon";
import OutletImageComponent from "../../components/OutletImage";
import Google from "@mui/icons-material/Google";

const Auth = () => {
  const navigate = useNavigate();
  const { isAuth } = useGetUserInfo();

  // const signInWithGoogle = async () => {
  //   const result = await signInWithPopup(auth, provider);
  //   console.log('user data :',result.user);
  //   const authInfo = {
  //     userID: result.user.uid,
  //     name: result.user.displayName,
  //     profilePhoto: result.user.photoURL,
  //     isAuth: true,
  //   };
  //   localStorage.setItem("auth", JSON.stringify(authInfo));

  //   navigate("/expense-tracker");
  // };
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('user data:', result.user);  // Check what user info you get
  
      const authInfo = {
        userID: result.user.uid,
        name: result.user.displayName,
        profilePhoto: result.user.photoURL,
        email: result.user.email,  // Store the email
        loginDate: new Date().toISOString(),  // Store the current date in ISO format
        isAuth: true,
      };
  
      localStorage.setItem("auth", JSON.stringify(authInfo));
  
      navigate("/expense-tracker");
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };
  
  

  if (isAuth) {
    return <Navigate to="/expense-tracker" />;
  }

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: { md: "row", xs: "column" },
      }}
    >
      <Box
        component="img"
        src={GhostGameSvg}
        alt="image"
        sx={{ display: { md: "none", xs: "block" } }}
      />

      <Box
        sx={{
          textAlign: "center",
          width: { md: "50%", xs: "100%" },
          mx: "auto",
        }}
      >
        <Stack flexDirection="column" p={{ md: 3, xs: 2 }}>
          <Typography variant="h5" gutterBottom>
            Sign In with Google to Access Your Account
          </Typography>
          <Typography variant="body2" color="gray" gutterBottom>
            By signing in with Google, you can quickly and securely access your
            personalized dashboard, manage your transactions.
          </Typography>
        </Stack>

        <Button
          startIcon={<Google />}
          variant="outlined"
          onClick={signInWithGoogle}
          sx={{
            mt: {md: 2, xs: 0},
            borderColor: "#4285F4",
            backgroundColor: "transparent",
            color: "#4285F4",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            "&:hover": {
              borderColor: "#357ae8",
              boxShadow: "0px 4px 14px rgba(0, 0, 1, 0.3)",
            },
          }}
        >
          Sign In with Google
        </Button>
      </Box>

      <OutletImageComponent />
    </Box>
  );
};

export default Auth;
