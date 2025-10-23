import {
  AppBar,
  Box,
  Button,
  CardMedia,
  Drawer,
  IconButton,
  Link,
  Skeleton,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import wishlistImg from "../../src/assets/Wishlist.png";
import cartImg from "../../src/assets/Cart.png";
import userImg from "../../src/assets/User.png";
import location from "../assets/location.png";
import logo from "../assets/logo.png";
import logoMob from "../assets/logo-mob.png";
import searchIcon from "../assets/search.png";
import moreIcon from "../assets/more.png";
import React, { useEffect, useState } from "react";
import { useShop } from "../contexts/ShopContext";
import { CloseRounded } from "@mui/icons-material";

function Header() {
  const { totals } = useShop();
  const [scrollValue, setScrollValue] = useState();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const headerIcons = [
    { image: wishlistImg, href: "/wishlist", showBadge: totals.wishlistCount },
    { image: cartImg, href: "/cart", showBadge: totals.cartCount },
    { image: userImg, isLink: true, href: "/profile" },
    isMobile && {
      image: moreIcon,
      isMobile: true,
      onClick: () => setMobileDrawerOpen(true),
    },
  ].filter(Boolean);

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    setScrollValue(scrollY);
  });
  const [categories, setCategories] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(true);
  useEffect(() => {
    // Fetch data when the component mounts
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
        setCategoryLoading(false);
        const uniqueCategories = Array.from(
          new Set(data.map((p) => p.category))
        );
        setCategories(uniqueCategories);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setCategoryLoading(false);
      });
  }, []); // Empty array = run only once

  console.log(categoryLoading);

  return (
    <>
      <Drawer
        anchor="top"
        open={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
        PaperProps={{
          sx: {
            borderBottomLeftRadius: 12,
            borderBottomRightRadius: 12,
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            bgcolor: "#fff",
          },
        }}
      >
        <Box sx={{ px: 3, pt: 17, pb: 4 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 2 }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, color: "#000", fontSize: "1.1rem" }}
            >
              More Options
            </Typography>
            <Tooltip title="Close">
              <IconButton
                onClick={() => setMobileDrawerOpen(false)}
                size="small"
              >
                <CloseRounded sx={{ fontSize: 22, color: "#555" }} />
              </IconButton>
            </Tooltip>
          </Stack>

          <Stack spacing={2}>
            <Button
              href="/wishlist"
              variant="outlined"
              fullWidth
              sx={{
                borderColor: "#000",
                color: "#000",
                textTransform: "none",
                fontWeight: 500,
                "&:hover": {
                  borderColor: "#333",
                  color: "#333",
                },
              }}
            >
              Wishlist
            </Button>
            <Button
              href="/cart"
              variant="outlined"
              fullWidth
              sx={{
                borderColor: "#000",
                color: "#000",
                textTransform: "none",
                fontWeight: 500,
                "&:hover": {
                  borderColor: "#333",
                  color: "#333",
                },
              }}
            >
              Cart
            </Button>
            <Button
              href="/profile"
              variant="outlined"
              fullWidth
              sx={{
                borderColor: "#000",
                color: "#000",
                textTransform: "none",
                fontWeight: 500,
                "&:hover": {
                  borderColor: "#333",
                  color: "#333",
                },
              }}
            >
              Profile
            </Button>
          </Stack>
        </Box>
      </Drawer>

      {isMobile ? (
        <>
          <AppBar
            position="fixed"
            elevation={0}
            sx={{
              backgroundColor: "white",
              color: "#2B0000",
              px: { xs: 2, md: 6 },
              pt: 0,
              minHeight: 40,
              textAlign: "center",
              borderBottom: "1px solid #00000020",
              zIndex: 1300,
            }}
          >
            <Toolbar
              disableGutters
              sx={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* Left side */}
              <Stack direction="row" alignItems="center" spacing={1}>
                <CardMedia
                  component="img"
                  src={location}
                  height={25}
                  //   width={10}
                  sx={{
                    objectFit: "contain",
                    width: "25px",
                  }}
                />

                <Link href="#" underline="none">
                  <Typography
                    sx={{
                      color: "#3C3C3C",
                      fontSize: 14,
                      fontWeight: 500,
                      textDecoration: "none",
                    }}
                  >
                    Find a store
                  </Typography>
                </Link>
              </Stack>
            </Toolbar>
          </AppBar>
          {/* <AppBar
            position="static"
            elevation={0}
            sx={{
              backgroundColor: "transparent",
              boxShadow: "0px 4px 8px -2px rgba(0, 0, 0, 0.1)", // ⬅️ soft bottom shadow
              color: "#2B0000",
              px: { xs: 2, md: 6 },
              py: 2,
              minHeight: 48,
              textAlign: "center",
            }}
          > */}

          <AppBar
            position="fixed"
            elevation={0}
            sx={{
              top: 40, // offset below the first AppBar
              backgroundColor: "white",
              boxShadow: "0px 4px 8px -2px rgba(0, 0, 0, 0.1)",
              color: "#2B0000",
              px: { xs: 2, md: 6 },
              py: 2,
              minHeight: 48,
              zIndex: 1299,
              mt: 2,
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Link href="/products">
                <CardMedia
                  component="img"
                  src={logoMob}
                  height="auto"
                  //   width={10}
                  sx={{
                    objectFit: "contain",
                    width: "auto",
                  }}
                />
              </Link>
              {/* Right side icons */}
              <Stack direction="row" spacing={2} alignItems="center">
                {headerIcons?.map((icon, idx) => (
                  <Box key={idx} sx={{ position: "relative" }}>
                    <Box
                      onClick={icon.onClick}
                      sx={{ cursor: "pointer" }}
                      component={icon.href ? Link : "div"}
                      href={icon.href || undefined}
                    >
                      <CardMedia
                        component="img"
                        src={icon?.image}
                        height={25}
                        width={25}
                      />
                    </Box>
                    {icon.showBadge ? (
                      <Box
                        sx={{
                          position: "absolute",
                          top: -6,
                          right: -8,
                          bgcolor: "#000",
                          color: "#fff",
                          borderRadius: "10px",
                          fontSize: 10,
                          px: 0.7,
                          minWidth: 16,
                          textAlign: "center",
                        }}
                      >
                        {icon.showBadge}
                      </Box>
                    ) : null}
                  </Box>
                ))}
              </Stack>
            </Stack>
          </AppBar>
        </>
      ) : (
        <>
          <AppBar
            position="fixed"
            elevation={0}
            sx={{
              backgroundColor: scrollValue > 20 ? "white" : "transparent",
              borderBottom: "1px solid #00000020",

              color: "#2B0000",
              px: { xs: 2, md: 6 },
              pt: 2,
              minHeight: 96,
              textAlign: "center",
            }}
          >
            <Toolbar
              disableGutters
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {/* Left side */}
              <Stack direction="row" alignItems="center" spacing={1}>
                <CardMedia
                  component="img"
                  src={location}
                  height={25}
                  //   width={10}
                  sx={{
                    objectFit: "contain",
                    width: "25px",
                  }}
                />

                <Link
                  href="#"
                  underline="none"
                  sx={{ color: "inherit", fontSize: 14, fontWeight: 500 }}
                >
                  Find a store
                </Link>
              </Stack>

              {/* Center Brand Name */}
              <Link href="/products">
                <CardMedia
                  component="img"
                  src={logo}
                  height={48}
                  //   width={10}
                  sx={{
                    objectFit: "contain",
                    width: "230px",
                  }}
                />
              </Link>

              {/* Right side icons */}
              <Stack direction="row" spacing={3} alignItems="center">
                {headerIcons?.map((icon, k) => (
                  <Box key={k} sx={{ position: "relative" }}>
                    <Link href={icon.href || "#"} sx={{ cursor: "pointer" }}>
                      <CardMedia
                        component="img"
                        src={icon?.image}
                        height={25}
                        width={25}
                      />
                    </Link>
                    {icon.showBadge ? (
                      <Box
                        sx={{
                          position: "absolute",
                          top: -8,
                          right: -10,
                          bgcolor: "#000",
                          color: "#fff",
                          borderRadius: "10px",
                          fontSize: 12,
                          px: 0.8,
                          minWidth: 16,
                          textAlign: "center",
                        }}
                      >
                        {icon.showBadge}
                      </Box>
                    ) : null}
                  </Box>
                ))}
              </Stack>
            </Toolbar>
          </AppBar>

          <AppBar
            position="fixed"
            elevation={0}
            sx={{
              backgroundColor: scrollValue > 20 ? "white" : "transparent",
              borderBottom: "1px solid #00000020",
              top: 80,
              color: "#2B0000",
              px: { xs: 2, md: 6 },
              pt: 1.5,
              minHeight: 80,
              textAlign: "center",
            }}
          >
            <Toolbar
              disableGutters
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 5,
              }}
            >
              {categoryLoading ? (
                <Stack direction="row" spacing={1} pt={1}>
                  <Skeleton
                    variant="rectangular"
                    height={20}
                    width="120px"
                    sx={{ borderRadius: 2, mb: 4 }}
                  />
                  <Skeleton
                    variant="rectangular"
                    height={20}
                    width="120px"
                    sx={{ borderRadius: 2, mb: 4 }}
                  />
                  <Skeleton
                    variant="rectangular"
                    height={20}
                    width="120px"
                    sx={{ borderRadius: 2, mb: 4 }}
                  />
                  <Skeleton
                    variant="rectangular"
                    height={20}
                    width="120px"
                    sx={{ borderRadius: 2, mb: 4 }}
                  />
                </Stack>
              ) : (
                <>
                  {categories?.map((name, k) => (
                    <Box key={k}>
                      <Link href={`/category/${name}`}>
                        <Typography
                          color="#3C3C3C"
                          fontSize={16}
                          display="flex"
                          alignItems="center"
                          sx={{
                            textTransform: "capitalize",
                            cursor: "pointer",
                          }}
                        >
                          {name}
                        </Typography>
                      </Link>
                    </Box>
                  ))}
                </>
              )}

              <Stack>
                <CardMedia
                  component="img"
                  src={searchIcon}
                  height={24}
                  width={24}
                  sx={{
                    pl: 0.3,
                  }}
                />
              </Stack>
            </Toolbar>
          </AppBar>
        </>
      )}
    </>
  );
}

export default Header;
