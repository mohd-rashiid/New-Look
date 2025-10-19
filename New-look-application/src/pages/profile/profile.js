import React, { startTransition } from "react";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Divider,
  Stack,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const ProfileSection = () => {
  const { logout, userData } = useAuth();
  const navigate = useNavigate();
  const imageUrl = "";
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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
    <Stack
      mt={isMobile ? 20 : 25}
      direction={"row"}
      alignItems={"center"}
      justifyContent={"center"}
      px={isMobile && 2}
    >
      <Paper
        elevation={3}
        sx={{
          p: 3,
          width: isMobile ? "410px" : 420,
          // mx: "auto",
          borderRadius: 3,
          background: "linear-gradient(to right, #f5f7fa, #c3cfe2)",
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar
            src=""
            sx={{ width: 64, height: 64, bgcolor: "primary.main" }}
          >
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

        <Stack direction="row" spacing={2} pt={1}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleBackToProducts}
            sx={{
              py: 0,
            }}
          >
            Back to Products
          </Button>
          <Button
            sx={{
              py: 0,
            }}
            variant="outlined"
            color="error"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Stack>
      </Paper>
    </Stack>
  );
};

export default ProfileSection;
