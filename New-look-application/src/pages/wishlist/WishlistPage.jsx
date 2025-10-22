import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useShop } from "../../contexts/ShopContext";
import { useNavigate } from "react-router-dom";

export default function WishlistPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { wishlistItems, removeFromWishlist, moveWishlistToCart } = useShop();
  const handleTextLength = isMobile ? 25 : 50;
  const navigateTo = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <Box sx={{ mt: { xs: 10, md: 22 }, minHeight: "60vh", bgcolor: "#fff" }}>
      <Container maxWidth="lg">
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: "#000" }}>
          Wishlist ({wishlistItems.length})
        </Typography>

        {wishlistItems.length === 0 ? (
          <Typography color="text.secondary">
            Your wishlist is empty.
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {wishlistItems.map((item) => (
              <Grid item xs={12} sm={6} md={6} key={item.id}>
                <Card
                  elevation={0}
                  sx={{
                    border: "1px solid #ddd",
                    position: "relative",
                    bgcolor: "#fff",
                    color: "#000",
                    height: "100%",
                    width: isMobile ? "auto " : "250px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    transition: "box-shadow 0.3s",
                    "&:hover": {
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <Stack position="absolute" top={8} right={8}>
                    <Tooltip title="Remove from wishlist">
                      <IconButton
                        // position="absolute"
                        // top={0}
                        // right={0}
                        onClick={() => removeFromWishlist(item.id)}
                        size="small"
                        sx={{
                          border: "1px solid #ddd",
                          width: 32,
                          height: 32,
                          color: "#f44336",
                          "&:hover": { bgcolor: "#f5f5f5" },
                        }}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                  <CardMedia
                    onClick={() => navigateTo(item.id)}
                    component="img"
                    image={item.image}
                    alt={item.title}
                    sx={{
                      width: isMobile ? "100% " : "250px",
                      height: isMobile ? "auto" : 180,
                      objectFit: "contain",
                      p: 2,
                      bgcolor: "#f5f5f5",
                      cursor: "pointer",
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: 600, color: "#000" }}
                    >
                      {/* {item.title} */}

                      {item?.title && item.title.length > handleTextLength
                        ? `${item.title.substring(0, handleTextLength)}...`
                        : item?.title}
                    </Typography>
                    <Typography sx={{ mt: 0.5, color: "#000" }}>
                      $ {item.price}
                    </Typography>
                  </CardContent>
                  <Stack direction="row" spacing={1} sx={{ p: 2 }}>
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        bgcolor: "#000",
                        color: "#fff",
                        "&:hover": { bgcolor: "#333" },
                      }}
                      onClick={() => moveWishlistToCart(item.id)}
                    >
                      Move to Cart
                    </Button>
                  </Stack>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
