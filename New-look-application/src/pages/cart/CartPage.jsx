import React, { useMemo } from "react";
import {
  Box,
  Button,
  CardMedia,
  Container,
  IconButton,
  Stack,
  TextField,
  Typography,
  Divider,
  Paper,
  Grid,
  Chip,
} from "@mui/material";
import {
  Add,
  Remove,
  Delete,
  ShoppingCart,
  LocalShipping,
  Security,
} from "@mui/icons-material";
import { useShop } from "../../contexts/ShopContext";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const navigate = useNavigate();

  const { cartItems, updateCartQty, removeFromCart, totals, clearCart } =
    useShop();

  const navigateTo = (id) => {
    navigate(`/product/${id}`);
  };
  const isEmpty = cartItems.length === 0;
  const totalText = useMemo(
    () => totals.cartTotal.toFixed(2),
    [totals.cartTotal]
  );
  const handleTextLength = 50;

  return (
    <Box sx={{ mt: { xs: 15, md: 20 }, minHeight: "90vh", bgcolor: "#f8f9fa" }}>
      <Container maxWidth="xl">
        {/* Header Section */}
        <Box sx={{ mb: 4, pt: 2 }}>
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
            <ShoppingCart sx={{ fontSize: 32, color: "#000" }} />
            <Typography variant="h4" sx={{ fontWeight: 700, color: "#000" }}>
              Shopping Cart
            </Typography>
            <Chip
              label={`${cartItems.reduce((s, i) => s + i.qty, 0)} items`}
              sx={{ bgcolor: "#000", color: "#fff", fontWeight: 600 }}
            />
          </Stack>
          <Typography variant="body1" color="text.secondary">
            Review your items and proceed to checkout
          </Typography>
        </Box>

        {isEmpty ? (
          <Paper
            elevation={0}
            sx={{ p: 6, textAlign: "center", bgcolor: "#fff" }}
          >
            <ShoppingCart sx={{ fontSize: 64, color: "#ccc", mb: 2 }} />
            <Typography variant="h6" sx={{ mb: 1, color: "#666" }}>
              Your cart is empty
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Add some items to get started
            </Typography>
            <Button
              variant="contained"
              sx={{ bgcolor: "#000", "&:hover": { bgcolor: "#333" } }}
            >
              Continue Shopping
            </Button>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {/* Cart Items */}
            <Stack
              direction={{ xs: "column", md: "row" }}
              alignItems="center"
              spacing={2}
            >
              <Stack>
                <Grid item xs={12} lg={8}>
                  <Paper
                    elevation={0}
                    sx={{
                      bgcolor: "#fff",
                      color: "#000",
                      borderRadius: 2,
                      overflow: "hidden",
                      border: "1px solid #eee",
                      minHeight: 400,
                      minWidth: "250px",
                      maxWidth: "100%",
                    }}
                  >
                    {/* Header */}
                    <Box
                      sx={{
                        p: 3,
                        borderBottom: "1px solid #ddd",
                        bgcolor: "#000",
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 600, color: "#fff" }}
                      >
                        Cart Items
                      </Typography>
                    </Box>

                    {/* Scrollable Body */}
                    <Box
                      sx={{
                        p: 0,
                        maxHeight: 440,
                        overflowY: "auto",
                        "&::-webkit-scrollbar": { width: 6 },
                        "&::-webkit-scrollbar-thumb": {
                          backgroundColor: "#ccc",
                          borderRadius: 10,
                        },
                      }}
                    >
                      {cartItems.map((item, index) => (
                        <Box key={item.id}>
                          <Box
                            sx={{
                              p: { xs: 2, md: 3 },
                              display: "flex",
                              alignItems: { xs: "flex-start", md: "center" },
                              gap: 3,
                              flexDirection: { xs: "column", md: "row" },
                              bgcolor: "#fff",
                            }}
                          >
                            <CardMedia
                              onClick={() => navigateTo(item.id)}
                              component="img"
                              image={item.image}
                              alt={item.title}
                              sx={{
                                width: { xs: 96, md: 120 },
                                height: { xs: 96, md: 120 },
                                objectFit: "contain",
                                borderRadius: 1,
                                border: "1px solid #eee",
                                bgcolor: "#fff",
                                cursor: "pointer",
                              }}
                            />
                            <Box sx={{ flex: 1, width: "100%" }}>
                              <Typography
                                variant="h6"
                                sx={{
                                  fontWeight: 600,
                                  mb: 1,
                                  lineHeight: 1.3,
                                  pr: { md: 2 },
                                }}
                              >
                                {/* {item.title} */}

                                {item?.title &&
                                item.title.length > handleTextLength
                                  ? `${item.title.substring(
                                      0,
                                      handleTextLength
                                    )}...`
                                  : item?.title}
                              </Typography>
                              {item.size && (
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  spacing={1}
                                  py={0.1}
                                >
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    Size:
                                  </Typography>
                                  <Typography
                                    variant="h5"
                                    sx={{
                                      fontWeight: 700,
                                      color: "#000",
                                      mb: 2,
                                    }}
                                  >
                                    {item.size}
                                  </Typography>
                                </Stack>
                              )}

                              <Typography
                                variant="h5"
                                sx={{ fontWeight: 700, color: "#000", mb: 2 }}
                              >
                                ${item.price}
                              </Typography>

                              <Stack
                                direction={{ xs: "column", sm: "row" }}
                                alignItems={{ xs: "flex-start", sm: "center" }}
                                spacing={2}
                              >
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  Quantity:
                                </Typography>

                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  spacing={1}
                                >
                                  <IconButton
                                    onClick={() =>
                                      updateCartQty(item.id, item.qty - 1)
                                    }
                                    size="small"
                                    sx={{
                                      border: "1px solid #ddd",
                                      width: 32,
                                      height: 32,
                                      color: "#000",
                                    }}
                                  >
                                    <Remove fontSize="small" />
                                  </IconButton>

                                  <TextField
                                    size="small"
                                    value={item.qty}
                                    inputProps={{
                                      inputMode: "numeric",
                                      pattern: "[0-9]*",
                                      style: {
                                        width: 50,
                                        textAlign: "center",
                                        color: "#000",
                                        backgroundColor: "#fff",
                                      },
                                    }}
                                    onChange={(e) => {
                                      const val = parseInt(
                                        e.target.value || "1",
                                        10
                                      );
                                      updateCartQty(
                                        item.id,
                                        isNaN(val) ? 1 : val
                                      );
                                    }}
                                    sx={{
                                      "& .MuiOutlinedInput-root": {
                                        width: 60,
                                        "& fieldset": { borderColor: "#ddd" },
                                        "&:hover fieldset": {
                                          borderColor: "#aaa",
                                        },
                                        "&.Mui-focused fieldset": {
                                          borderColor: "#999",
                                        },
                                      },
                                    }}
                                  />

                                  <IconButton
                                    onClick={() =>
                                      updateCartQty(item.id, item.qty + 1)
                                    }
                                    size="small"
                                    sx={{
                                      border: "1px solid #ddd",
                                      width: 32,
                                      height: 32,
                                      color: "#000",
                                    }}
                                  >
                                    <Add fontSize="small" />
                                  </IconButton>
                                </Stack>
                              </Stack>
                            </Box>

                            <Box
                              sx={{
                                textAlign: { xs: "left", md: "right" },
                                width: { xs: "100%", md: "auto" },
                              }}
                            >
                              <Typography
                                variant="h6"
                                sx={{ fontWeight: 700, mb: 2 }}
                              >
                                ${(item.price * item.qty).toFixed(2)}
                              </Typography>

                              <IconButton
                                onClick={() => removeFromCart(item.id)}
                                sx={{
                                  border: "1px solid #f5f5f5",
                                  color: "#f44336",
                                  "&:hover": { bgcolor: "#f5f5f5" },
                                }}
                              >
                                <Delete fontSize="small" />
                              </IconButton>
                            </Box>
                          </Box>

                          {index < cartItems.length - 1 && (
                            <Divider sx={{ borderColor: "#eee" }} />
                          )}
                        </Box>
                      ))}
                    </Box>
                  </Paper>
                </Grid>
              </Stack>
              <Stack>
                <Grid item xs={12} lg={4}>
                  <Paper
                    elevation={0}
                    sx={{
                      bgcolor: "#fff",
                      borderRadius: 2,
                      p: 3,
                      position: { xs: "static", md: "sticky" },
                      top: { md: 20 },
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                      Order Summary
                    </Typography>

                    <Stack spacing={2} sx={{ mb: 3 }}>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography>
                          Subtotal ({cartItems.reduce((s, i) => s + i.qty, 0)}{" "}
                          items)
                        </Typography>
                        <Typography>${totalText}</Typography>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography>Shipping</Typography>
                        <Typography color="success.main">FREE</Typography>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography>Tax</Typography>
                        <Typography>$0.00</Typography>
                      </Stack>
                      <Divider />
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                          Total
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                          ${totalText}
                        </Typography>
                      </Stack>
                    </Stack>

                    <Button
                      variant="contained"
                      fullWidth
                      size="large"
                      sx={{
                        bgcolor: "#000",
                        py: 1.5,
                        mb: 2,
                        "&:hover": { bgcolor: "#333" },
                      }}
                    >
                      Proceed to Checkout
                    </Button>

                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={clearCart}
                      sx={{ mb: 3, borderColor: "#ddd", color: "#666" }}
                    >
                      Clear Cart
                    </Button>

                    {/* Security Features */}
                    <Box sx={{ mt: 3, pt: 3, borderTop: "1px solid #eee" }}>
                      <Stack spacing={2}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <LocalShipping sx={{ fontSize: 20, color: "#666" }} />
                          <Typography variant="body2" color="text.secondary">
                            Free shipping on orders over $35
                          </Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Security sx={{ fontSize: 20, color: "#666" }} />
                          <Typography variant="body2" color="text.secondary">
                            Secure checkout with SSL
                          </Typography>
                        </Stack>
                      </Stack>
                    </Box>
                  </Paper>
                </Grid>
              </Stack>
            </Stack>
          </Grid>
        )}
      </Container>
    </Box>
  );
}
