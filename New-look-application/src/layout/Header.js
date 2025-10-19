import {
  AppBar,
  Box,
  CardMedia,
  Link,
  Stack,
  Toolbar,
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
import downArrow from "../assets/down-arrow.png";
import searchIcon from "../assets/search.png";
import moreIcon from "../assets/more.png";
import React, { useState } from "react";

function Header() {
  const [scrollValue, setScrollValue] = useState();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const headerIcons = [
    { image: wishlistImg },
    { image: cartImg },
    { image: userImg, isLink: true },
    isMobile && { image: moreIcon, isMobile: true },
  ].filter(Boolean);
  const subHeaderData = ["Sale", "Womens", "Mens", "Girls", "Christmas"];

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    setScrollValue(scrollY);
  });

  return (
    <>
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

              {/* Right side icons */}
              <Stack direction="row" spacing={2} alignItems="center">
                {headerIcons?.map((image) => (
                  <Stack spacing={2}>
                    {image?.isLink ? (
                      <Link
                        href="/profile"
                        sx={{
                          cursor: "pointer",
                        }}
                      >
                        <CardMedia
                          component="img"
                          src={image?.image}
                          height={25}
                          width={25}
                        />
                      </Link>
                    ) : (
                      <CardMedia
                        component="img"
                        src={image?.image}
                        height={25}
                        width={25}
                      />
                    )}
                  </Stack>
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

              {/* Right side icons */}
              <Stack direction="row" spacing={3} alignItems="center">
                {headerIcons?.map((image, k) => (
                  <Stack spacing={2} key={k}>
                    {image?.isLink ? (
                      <Link
                        href="/profile"
                        sx={{
                          cursor: "pointer",
                        }}
                      >
                        <CardMedia
                          component="img"
                          src={image?.image}
                          height={25}
                          width={25}
                        />
                      </Link>
                    ) : (
                      <CardMedia
                        component="img"
                        src={image?.image}
                        height={25}
                        width={25}
                      />
                    )}
                  </Stack>
                ))}
              </Stack>
            </Toolbar>
          </AppBar>
          {/* <Divider /> */}

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
              {subHeaderData?.map((name, k) => (
                <Box key={k}>
                  <Typography
                    color="#3C3C3C"
                    fontSize={16}
                    display="flex"
                    alignItems="center"
                  >
                    {name}
                    <CardMedia
                      component="img"
                      src={downArrow}
                      height={16}
                      width={16}
                      sx={{
                        pl: 0.3,
                      }}
                    />
                  </Typography>
                </Box>
              ))}
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
