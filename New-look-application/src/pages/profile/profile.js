import React, { startTransition } from "react";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Divider,
  Stack,
  Button,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const ProfileSection = () => {
  const { logout, userData } = useAuth();
  const navigate = useNavigate();
  const imageUrl = "";

  const handleLogout = async () => {
    try {
      await logout();
      startTransition(() => {
        navigate("/login");
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleBackToProducts = () => {
    navigate("/products");
  };

  console.log(userData);
  const convertFirestoreTimestamp = (timestamp) => {
    if (
      !timestamp ||
      typeof timestamp.seconds !== "number" ||
      typeof timestamp.nanoseconds !== "number"
    ) {
      return "Invalid date";
    }

    const milliseconds = timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6;
    const date = new Date(milliseconds);

    if (isNaN(date.getTime())) {
      return "Invalid date";
    }

    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        minWidth: 420,
        mx: "auto",
        mt: 25,
        borderRadius: 3,
        background: "linear-gradient(to right, #f5f7fa, #c3cfe2)",
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar src="" sx={{ width: 64, height: 64, bgcolor: "primary.main" }}>
          {!imageUrl && <PersonIcon fontSize="large" />}
        </Avatar>
        <Box>
          <Typography variant="h6" fontWeight={600}>
            {userData?.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {userData?.email}
          </Typography>
        </Box>
      </Stack>

      <Divider sx={{ my: 2 }} />

      <Typography variant="body2" color="text.secondary">
        <strong>Joined:</strong>{" "}
        {convertFirestoreTimestamp(userData?.createdAt)}
      </Typography>

      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleBackToProducts}
        >
          Back to Products
        </Button>
        <Button variant="outlined" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Stack>
    </Paper>
  );
};

export default ProfileSection;
