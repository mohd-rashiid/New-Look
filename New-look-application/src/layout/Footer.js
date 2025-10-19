import React from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Link,
  CardMedia,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import fb from "../assets/footer/fb.png";
import instagram from "../assets/footer/instagram.png";
import youtube from "../assets/footer/youtube.png";
import x from "../assets/footer/x.png";
import Uk from "../assets/footer/Uk.png";
import downArrow from "../assets/down-arrow.png";
import cards from "../assets/footer/cards.png";

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const footerData = [
    {
      title: "Help & Info",
      links: [
        "Delivery & collection",
        "Returns & refunds",
        "How to shop",
        "Size guide",
        "Accessibility",
      ],
    },
    {
      title: "Payments & Discount",
      links: [
        "Payments & Discounts",
        "Black Friday",
        "Key worker discount",
        "Student discount",
        "Promotions & discounts",
      ],
    },
    {
      title: "About New Look",
      links: [
        "Find a store",
        "About us",
        "Careers",
        "Sustainability",
        "Modern slavery statement",
      ],
    },
    {
      title: "Be Social",
      is_be_social: true,
      links: ["Join the conversation"],
      icons: [fb, instagram, youtube, x],
    },
  ];
  return (
    <Box sx={{ bgcolor: "#F8F8F8", mt: 4 }}>
      {/* Promo Banner */}
      <Box
        sx={{
          pb: 4,
          textAlign: "center",
          borderBottom: "1px solid #00000020",
          p: isMobile ? 2 : 4,
        }}
      >
        <Typography
          fontWeight={500}
          color="#000000"
          fontSize={isMobile ? 16 : 32}
          gutterBottom
        >
          SIGN UP and get 25% OFF*
        </Typography>
        <Typography
          fontSize={isMobile ? 14 : 16}
          color="#868686"
          sx={{ mx: "auto", mb: 0 }}
        >
          Sign up to our e-mail to be the first to hear about the latest trends,
          new arrivals and exclusive offers.
        </Typography>
        <Typography
          fontSize={isMobile ? 14 : 16}
          color="#868686"
          sx={{ mx: "auto", mb: 2 }}
        >
          You can unsubscribe at any time. T&Cs apply.
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            flexWrap: "wrap",
            mt: 4,
          }}
        >
          <TextField
            label="Email address"
            variant="outlined"
            size="small"
            sx={{
              width: isMobile ? "100%" : "350px",
            }}
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#101010",
              color: "white",
              width: isMobile ? "100%" : "190px",
              borderRadius: 0,
              textTransform: "none",
            }}
          >
            Sign me up
          </Button>
        </Box>
      </Box>

      {/* Footer Links */}
      <Box
        sx={{
          backgroundColor: "#f5f5f5",
          p: 4,
          borderBottom: "1px solid #00000020",
        }}
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid container spacing={isMobile ? 4 : 25}>
          {footerData.map((section, index) => (
            <Grid key={index}>
              <Typography
                fontSize={section.is_be_social ? 32 : isMobile ? 16 : 24}
                gutterBottom
                pb={section.is_be_social ? 0 : isMobile ? 0 : 3}
                sx={{
                  fontWeight: 500,
                }}
              >
                {section.title}
              </Typography>
              {section.links.map((text, i) => (
                <Link
                  href="#"
                  key={i}
                  underline="hover"
                  fontSize={16}
                  color="#868686"
                  display="block"
                  sx={{ mb: 1.5 }}
                >
                  {text}
                </Link>
              ))}
              {section.icons && (
                <Box sx={{ mt: 1, display: "flex", alignItems: "center" }}>
                  {section.icons.map((Icon, i) => (
                    <CardMedia
                      key={i}
                      component="img"
                      src={Icon}
                      height={24}
                      width={24}
                      sx={{
                        objectFit: "contain",
                      }}
                    />
                  ))}
                </Box>
              )}
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Country & Language Selector */}
      <Stack
        sx={{
          backgroundColor: "#ECECEC",
        }}
      >
        <Box
          sx={{
            // mt: 4,
            display: "flex",
            flexDirection: { xs: "row", sm: "row" },
            gap: 2,
            alignItems: "center",
            justifyContent: "center",
            pt: 4,
          }}
        >
          <Stack direction="row" alignItems="center">
            <CardMedia
              component="img"
              src={Uk}
              height={15}
              sx={{
                objectFit: "contain",
                width: "24px",
                mr: 1,
              }}
            />
            <Typography color="#000000" fontSize="16px" width="100%">
              United Kingdom
            </Typography>
          </Stack>

          <Box
            sx={{
              // fill: "rgba(0, 123, 246, 8)",
              backgroundColor: "#e4e4e4",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "14px",
              py: 1,
              px: 2,
              borderRadius: "6px",
              width: "110px",
              textAlign: "center",
            }}
          >
            English{" "}
            <CardMedia
              component="img"
              src={downArrow}
              height={5}
              sx={{
                pl: 0.3,
                width: "11px",
              }}
            />
          </Box>
        </Box>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          pt={isMobile ? 1 : 0}
        >
          <CardMedia
            component="img"
            src={cards}
            sx={{
              width: "auto",
              height: isMobile ? "69px" : "73px",
            }}
          />
        </Stack>
        {/* Disclaimer & Legal */}
        <Box
          sx={{
            mt: 4,
            pb: 2,
            textAlign: "center",
            px: 2,
            // display: "flex",
            // alignItems: "center",
            // justifyContent: "center",
          }}
        >
          <Typography
            // variant="body2"
            fontSize={14}
            color="#868686"
            // sx={{ maxWidth: 600, mb: 1 }}
          >
            The celebrities named or featured on NewLook.com have not endorsed,
            recommended or approved the items offered on site unless they are
            promoting their own brand.
          </Typography>
          <Typography
            // variant="caption"
            sx={{
              pt: isMobile ? 2 : 1,
            }}
            fontSize={14}
            color="#868686"
          >
            © 2023 New Look Retailers Limited | Terms & Conditions | Privacy
            Policy | Cookies Settings
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default Footer;
