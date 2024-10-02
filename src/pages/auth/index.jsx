import { auth, provider } from "../../config/firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate, Navigate } from "react-router-dom";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { Box, Button, Typography, Container } from "@mui/material";

const Auth = () => {
  const navigate = useNavigate();
  const { isAuth } = useGetUserInfo();

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    const authInfo = {
      userID: result.user.uid,
      name: result.user.displayName,
      profilePhoto: result.user.photoURL,
      isAuth: true,
    };
    localStorage.setItem("auth", JSON.stringify(authInfo));

    navigate("/expense-tracker");
  };

  if (isAuth) {
    return <Navigate to="/expense-tracker" />;
  }

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          boxShadow: 3,
          p: 4,
          borderRadius: 2,
          textAlign: "center",
          backgroundColor: "background.paper",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Sign In with Google to Continue
        </Typography>
        <Button
          variant="contained"
          onClick={signInWithGoogle}
          sx={{
            mt: 2,
            backgroundColor: "#4285F4",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#357ae8",
            },
          }}
        >
          Sign In with Google
        </Button>
      </Box>
    </Container>
  );
};

export default Auth;
