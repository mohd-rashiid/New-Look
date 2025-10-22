import React, { startTransition } from "react";
import {
  Box,
  Typography,
  Stack,
  Button,
  useTheme,
  useMediaQuery,
  Grid,
} from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useShop } from "../../contexts/ShopContext";

const ProfileSection = () => {
  const { logout, userData } = useAuth();
  const { cartItems, wishlistItems } = useShop();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const allProducts = JSON.parse(localStorage.getItem("allProducts")) || [];

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
    <Stack
      mt={isMobile ? 20 : 25}
      direction={"row"}
      alignItems={"center"}
      justifyContent={"center"}
      px={isMobile && 2}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fff",
          color: "#000",
        }}
      >
        <Stack spacing={3} alignItems="center">
          <AccountCircleIcon sx={{ fontSize: 64 }} />
          <Typography variant="h6" fontWeight="600">
            {userData.name}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            {userData.email}
          </Typography>
          <Typography variant="body2">
            <strong>Joined:</strong>{" "}
            {convertFirestoreTimestamp(userData.createdAt)}
          </Typography>

          {/* Stats Section */}
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 2 }}>
            {[
              { label: "Products", value: allProducts },
              { label: "Cart", value: cartItems.length },
              { label: "Wishlist", value: wishlistItems.length },
            ].map((item) => (
              <Grid
                item
                key={item.label}
                sx={{
                  textAlign: "center",
                  minWidth: 80,
                }}
              >
                <Typography variant="h6" fontWeight="bold">
                  {item.value}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.6 }}>
                  {item.label}
                </Typography>
              </Grid>
            ))}
          </Grid>

          {/* Buttons */}
          <Stack direction="row" spacing={2} mt={2}>
            <Button
              variant="contained"
              sx={{
                background: "#000",
                color: "#fff",
                textTransform: "none",
                px: 3,
                "&:hover": { background: "#222" },
              }}
              onClick={handleBackToProducts}
            >
              Back to Products
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderColor: "#000",
                color: "#000",
                textTransform: "none",
                px: 3,
                "&:hover": { background: "#f5f5f5" },
              }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};

export default ProfileSection;
