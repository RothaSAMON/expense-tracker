import {
  Avatar,
  Box,
  Stack,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import LogoutIcon from "@mui/icons-material/Logout";
import { useGetUserInfo } from "../hooks/useGetUserInfo";
import { useThemeToggle } from "../ThemeContext";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase-config";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ProfileBar = () => {
  const { name, profilePhoto, email, loginDate } = useGetUserInfo();
  const { toggleTheme } = useThemeToggle();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

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

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      gap={2}
      alignItems="center"
      mb={4}
    >
      <Stack sx={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
        {profilePhoto ? (
          <Avatar
            alt="User Profile"
            src={profilePhoto}
            sx={{ width: 56, height: 56 }}
          />
        ) : (
          <Typography>No profile photo</Typography>
        )}
        <Stack>
          <Typography variant="h6">{name}</Typography>
          <Typography variant="body2" color="gray">
            {email ? email : "No email provided"}
          </Typography>
        </Stack>
      </Stack>

      <Stack direction="row" spacing={2}>
        <IconButton onClick={toggleTheme}>
          <Brightness4Icon />
        </IconButton>
        <IconButton onClick={handleClickOpen} color="error">
          <LogoutIcon />
        </IconButton>
      </Stack>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Stack alignItems="center" justifyContent="center" spacing={1}>
            <WarningAmberIcon
              sx={{
                backgroundColor: "#F8EDED",
                borderRadius: "100%",
                p: 1,
                width: 30,
                height: 30,
                color: "#FF4C4C",
                "&:hover": {
                  backgroundColor: "#FFB3B3",
                  color: "#D50000",
                },
              }}
            />

            <Typography variant="h6" textAlign="center">
              Confirm Sign Out
            </Typography>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <DialogContentText textAlign="center">
            Are you sure you want to sign out? All unsaved changes will be lost.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            onClick={handleClose}
            sx={{ color: "gray", borderRadius: "20px" }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              confirmSignOut();
              handleClose();
            }}
            variant="contained"
            autoFocus
            sx={{ borderRadius: "20px", backgroundColor: "#FF4C4C" }}
          >
            Sign Out
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProfileBar;
