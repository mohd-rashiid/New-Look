import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Rating,
  IconButton,
  Breadcrumbs,
  Link,
  Paper,
  Stack,
  Card,
  CardMedia,
  Chip,
  Tabs,
  Tab,
  useTheme,
  useMediaQuery,
  Skeleton,
} from "@mui/material";
import { useParams } from "react-router-dom";

import {
  FavoriteBorder,
  ShoppingCart,
  NavigateNext,
} from "@mui/icons-material";
import locationIcon from "../../assets/location.png";
import downArrow from "../../assets/down-arrow.png";
import ProdCard from "./ProdCard";

function TabPanel({ children, value, index }) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function ProductSinglePage() {
  const { id } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("6");
  const [singleProduct, setSingleProduct] = useState("");

  const [allProducts, setAllProducts] = useState();
  const [productLoading, setProductLoading] = useState(true);

  const images = [
    "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80",
    "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=800&q=80",
    "https://images.unsplash.com/photo-1598522325074-042db73aa4e6?w=800&q=80",
  ];

  const sizes = ["6", "8", "10", "9", "10", "12", "14", "16", "18", "20", "22"];

  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    // Fetch data when the component mounts
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setAllProducts(data);
        setProductLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setProductLoading(false);
      });
  }, []); // Empty array = run only once

  useEffect(() => {
    const product = allProducts?.find((p) => p?.id === Number(id));
    setSingleProduct(product);
  }, [id, allProducts]);

  console.log(allProducts);

  const categories = [
    "Black Loungewear",
    "Womens Nightwear",
    "Hoodies & Sweatshirts",
    "Blanket Hoodies",
    "Knitwear",
    "Womens T-shirt",
    "Winter Dress",
    "Black Loungewear",
  ];

  const productFeatures = [
    "Dark grey",
    "Acid wash finish",
    "Drawstring waist",
    "Side slit pockets",
    "Relaxed fit",
    "Wide leg",
    "Model is 5'9'/175cm and wears UK 10/EU 38/US 6",
    "Product Code: 899545603",
  ];

  const rating = singleProduct?.rating?.rate;
  const count = singleProduct?.rating?.count;
  // const price = singleProduct?.price;
  console.log(singleProduct);
  return (
    <Box sx={{ bgcolor: "", minHeight: "100vh", py: 0, mt: 25, px: 0 }}>
      <Container maxWidth="xl">
        {/* Breadcrumbs */}
        <Breadcrumbs
          separator={<NavigateNext fontSize="small" />}
          sx={{ mb: 4, fontSize: "0.875rem" }}
        >
          <Link
            underline="hover"
            color="text.secondary"
            href="/"
            sx={{ "&:hover": { color: "text.primary" } }}
          >
            Home
          </Link>
          <Link
            underline="hover"
            color="text.secondary"
            href="/women-cloth"
            sx={{ "&:hover": { color: "text.primary" } }}
          >
            {/* Women Cloth */}
            {singleProduct?.category}
          </Link>
          {/* <Link
            underline="hover"
            color="text.secondary"
            href="/dresses"
            sx={{ "&:hover": { color: "text.primary" } }}
          >
            Dresses
          </Link> */}
          <Typography color="text.primary" fontSize="0.875rem">
            {singleProduct?.title}
          </Typography>
        </Breadcrumbs>
        {/* Main Grid - Image section is larger */}
        <Stack direction="row" alignItems="center" justifyContent="center">
          <Stack pl={3} width="100%">
            <Box
              sx={{
                display: "flex",
                gap: 2,
                height: "100%",
                flexDirection: {
                  xs: "column-reverse",
                  md: "row",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: isMobile ? "row" : "column",
                  gap: 2,
                }}
                justifyContent={"space-evenly"}
              >
                {images?.map((img, idx) => (
                  <Card
                    key={idx}
                    elevation={0}
                    sx={{
                      width: 170,
                      height: isMobile ? 170 : 160,
                      cursor: "pointer",
                      border:
                        selectedImage === idx
                          ? "2px solid #00bcd4"
                          : "1px solid #e0e0e0",
                      overflow: "hidden",
                      transition: "all 0.3s",
                      "&:hover": {
                        borderColor:
                          selectedImage === idx ? "#00bcd4" : "#bdbdbd",
                      },
                    }}
                    onClick={() => setSelectedImage(idx)}
                  >
                    <CardMedia
                      component="img"
                      image={img}
                      alt={`Product view ${idx + 1}`}
                      sx={{ height: "100%", objectFit: "cover", width: "100%" }}
                    />
                  </Card>
                ))}
              </Box>

              {/* Main Image */}
              <Card elevation={0} sx={{ flex: 1, overflow: "hidden" }}>
                {productLoading ? (
                  <Skeleton
                    variant="rectangular"
                    height={600}
                    width="420px"
                    sx={{ borderRadius: 2, mb: 2 }}
                  />
                ) : (
                  <CardMedia
                    component="img"
                    // image={images[selectedImage]}
                    image={singleProduct?.image}
                    alt="Main product view"
                    sx={{
                      height: isMobile ? "100%" : 600,
                      objectFit: "fill",
                      width: isMobile ? "100%" : 420,
                      ml: 5,
                    }}
                  />
                )}
              </Card>
            </Box>
          </Stack>

          {/* Right Side - Product Details - Exactly 50% */}
          <Stack item xs={12} lg={5} width="100%">
            <Box>
              {/* Product Title */}
              <Typography
                variant="h4"
                component="h1"
                sx={{ fontWeight: 600, mb: 2, lineHeight: 1.3 }}
              >
                {singleProduct?.title}
              </Typography>
              {/* Rating */}
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}
              >
                <Rating
                  value={Number(rating)}
                  precision={0.5}
                  readOnly
                  size="small"
                />
                <Typography variant="body2" color="text.secondary">
                  {rating} ({count} reviews)
                </Typography>
              </Box>
              {/* Price & Wishlist */}
              <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
                <Typography
                  variant="h5"
                  component="span"
                  sx={{ fontWeight: 700, mr: 2 }}
                >
                  $ {singleProduct?.price}
                </Typography>
                <Typography
                  variant="h5"
                  component="span"
                  sx={{
                    color: "text.disabled",
                    textDecoration: "line-through",
                    fontWeight: 400,
                  }}
                >
                  $ {singleProduct?.price + 50}
                </Typography>
                <Box
                  sx={{
                    ml: "auto",
                    display: "flex",
                    alignItems: "center",
                    gap: 0,
                  }}
                >
                  <IconButton
                    size="small"
                    sx={{
                      "&:hover": { color: "error.main" },
                    }}
                  >
                    <FavoriteBorder />
                  </IconButton>
                  <Typography variant="body2">Add to Wish List</Typography>
                </Box>
              </Box>

              {/* Color Selection */}
              <Box sx={{ mb: 3 }}>
                {/* <FormControl fullWidth>
                  <Select
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                    sx={{
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#e0e0e0",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#000",
                      },
                    }}
                  >
                    {colors.map((color) => (
                      <MenuItem key={color} value={color}>
                        {color}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl> */}
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  width="100%"
                  sx={{
                    borderBottom: "1px solid #DBDBDB",
                  }}
                >
                  <Stack direction="row" alignItems="center">
                    <Typography
                      sx={{
                        color: "#868686",
                      }}
                    >
                      Color: &nbsp;
                    </Typography>
                    <Typography
                      sx={{
                        color: "#3C3C3C",
                        fontWeight: 500,
                      }}
                    >
                      Black
                    </Typography>
                  </Stack>
                  <CardMedia
                    component="img"
                    src={downArrow}
                    height={16}
                    sx={{
                      pl: 0.3,
                      objectFit: "contain",
                      width: 16,
                    }}
                  />
                </Stack>
              </Box>
              {/* Size Selection */}
              <Box sx={{ mb: 4 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1.5,
                  }}
                >
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    Size:{" "}
                    <Box component="span" sx={{ fontWeight: 600 }}>
                      {selectedSize}
                    </Box>
                  </Typography>
                  <Link
                    href="#"
                    underline="hover"
                    sx={{
                      color: "#000",
                      fontSize: "0.875rem",
                      "&:hover": { color: "primary.main" },
                    }}
                  >
                    View size guide
                  </Link>
                </Box>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {sizes.map((size) => (
                    <Box
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      sx={{
                        bgcolor: selectedSize === size ? "#000" : "#f5f5f5",
                        color: selectedSize === size ? "#fff" : "#000",
                        border: "1px solid",
                        borderColor: selectedSize === size ? "#000" : "#e0e0e0",
                        fontWeight: 500,
                        minWidth: 35,
                        height: 35,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 1,
                        cursor: "pointer",
                        transition: "all 0.2s",
                        "&:hover": {
                          bgcolor: selectedSize === size ? "#000" : "#f5f5f5",
                          borderColor: "#000",
                        },
                      }}
                    >
                      {size}
                    </Box>
                  ))}
                </Stack>
              </Box>
              {/* Action Buttons */}
              <Stack
                spacing={2}
                sx={{ mb: 4 }}
                direction={"row"}
                justifyContent={"space-between"}
              >
                <Button
                  variant="contained"
                  startIcon={<ShoppingCart />}
                  sx={{
                    width: isMobile ? "60%" : "50%",
                    bgcolor: "#000",
                    py: 1.5,
                    fontSize: "1rem",
                    fontWeight: 500,
                    textTransform: "none",
                    "&:hover": {
                      bgcolor: "#333",
                    },
                  }}
                >
                  Add to Cart
                </Button>
                <Stack
                  direction={"row"}
                  spacing={1}
                  alignItems={"center"}
                  justifyContent={"center"}
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      opacity: 0.8,
                    },
                  }}
                >
                  <img
                    src={locationIcon}
                    alt=""
                    style={{
                      height: "20px",
                      objectFit: "cover",
                    }}
                  />
                  <Typography textAlign={"center"}>Find in store</Typography>
                </Stack>
              </Stack>
              {/* Shipping Info */}
              <Paper
                elevation={0}
                sx={{
                  bgcolor: "#f5f5f5",
                  p: 2.5,
                  mb: 3,
                  borderRadius: 1,
                }}
              >
                <Typography variant="body2" sx={{ mb: 0.5 }} textAlign="start">
                  Enjoy{" "}
                  <Box
                    component="span"
                    sx={{
                      fontWeight: 600,
                      textDecoration: "underline",
                      textUnderlineOffset: "2px",
                      textAlign: "center",
                    }}
                  >
                    FREE express
                  </Box>{" "}
                  &{" "}
                  <Box
                    component="span"
                    sx={{
                      fontWeight: 600,
                      textDecoration: "underline",
                      textUnderlineOffset: "2px",
                    }}
                  >
                    Free Returns
                  </Box>{" "}
                  on orders over £35!
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Kindly place your order by 6pm on December 22nd for expedited
                  processing
                </Typography>
              </Paper>
              {/* Payment Methods */}
              <Box>
                <Typography
                  variant="body2"
                  sx={{ mb: 1.5, fontWeight: 500 }}
                  textAlign="start"
                >
                  Payment method
                </Typography>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Paper
                    elevation={0}
                    sx={{
                      p: 1,
                      border: "1px solid #e0e0e0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 60,
                      height: 40,
                    }}
                  >
                    <Box
                      component="img"
                      src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                      alt="Visa"
                      sx={{ height: 20, width: "auto" }}
                    />
                  </Paper>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 1,
                      border: "1px solid #e0e0e0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 60,
                      height: 40,
                    }}
                  >
                    <Box
                      component="img"
                      src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                      alt="Mastercard"
                      sx={{ height: 20, width: "auto" }}
                    />
                  </Paper>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 1,
                      border: "1px solid #e0e0e0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 60,
                      height: 40,
                    }}
                  >
                    <Box
                      component="img"
                      src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg"
                      alt="American Express"
                      sx={{ height: 20, width: "auto" }}
                    />
                  </Paper>
                  <Link
                    href="#"
                    underline="hover"
                    sx={{
                      color: "#000",
                      fontSize: "0.875rem",
                      "&:hover": { color: "primary.main" },
                      textDecoration: "underline",
                      textUnderlineOffset: "2px",
                    }}
                  >
                    Learn more
                  </Link>
                </Stack>
              </Box>
            </Box>
          </Stack>
        </Stack>
      </Container>

      {/* productdetails */}

      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ bgcolor: "", borderRadius: 1 }}>
          {/* Tabs */}
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              backgroundColor: "#FAFAFA",
            }}
          >
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              sx={{
                "& .MuiTab-root": {
                  textTransform: "none",
                  fontSize: "25px",
                  // fontWeight: 500,
                  color: "text.secondary",
                  backgroundColor: "#FAFAFA",
                  minWidth: 173,
                  "&.Mui-selected": {
                    color: "#000",
                    // fontWeight: 600
                  },
                },
                "& .MuiTabs-indicator": {
                  backgroundColor: "#000",
                  height: 2,
                },
              }}
            >
              <Tab label="Product Details" />
              <Tab label="Care Guide" />
              <Tab label="Reviews" />
            </Tabs>
          </Box>

          {/* Product Details Tab */}
          <TabPanel value={tabValue} index={0}>
            <Box>
              {/* Description */}
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: 2, lineHeight: 1.8 }}
                textAlign="start"
              >
                {singleProduct?.description}
              </Typography>

              {/* <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: 3, lineHeight: 1.8 }}
                textAlign="start"
              >
                Step into a realm of unparalleled off-duty style with these grey
                acid wash joggers that effortlessly marry fashion with comfort.
                Crafted for those committed to style even on their days off,
                these joggers feature a chic drawstring waist and a wide leg
                cut. The distinctive acid wash adds a touch of urban edge,
                making these joggers a versatile choice for leisurely pursuits
                and relaxed outings. Elevate your casual wardrobe with the
                perfect blend of fashion-forward design and comfort-driven
                details, redefining off-duty elegance with every step.
              </Typography> */}

              {/* Product Features List */}
              <Box component="ul" sx={{ pl: 2, color: "text.secondary" }}>
                {productFeatures.map((feature, index) => (
                  <Typography
                    key={index}
                    component="li"
                    variant="body1"
                    sx={{ mb: 0.5 }}
                    textAlign="start"
                  >
                    {feature}
                  </Typography>
                ))}
              </Box>
            </Box>
          </TabPanel>

          {/* Care Guide Tab */}
          <TabPanel value={tabValue} index={1}>
            <Typography
              variant="body1"
              color="text.secondary"
              textAlign="start"
            >
              Care guide information will be displayed here...
            </Typography>
          </TabPanel>
          {/* Reviews Tab */}
          <TabPanel value={tabValue} index={2}>
            <Typography
              variant="body1"
              color="text.secondary"
              textAlign="start"
            >
              Customer reviews will be displayed here...
            </Typography>
          </TabPanel>
        </Box>

        {/* More Faves This Way Section */}
        <Box sx={{ mt: 1 }}>
          <Typography variant="h5" sx={{ mb: 3, textAlign: "start" }}>
            More Faves This Way
          </Typography>

          <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
            {categories.map((category, index) => (
              <Chip
                key={index}
                label={category}
                clickable
                sx={{
                  bgcolor: "#f5f5f5",
                  color: "#000",
                  fontSize: "0.875rem",
                  // fontWeight: 400,
                  px: isMobile ? 0 : 1,
                  py: 2.5,
                  // height: 'auto',
                  borderRadius: 2,
                  "&:hover": {
                    bgcolor: "#e0e0e0",
                  },
                  "& .MuiChip-label": {
                    px: 1,
                  },
                }}
              />
            ))}
          </Stack>
        </Box>
        <Stack pt={5}>
          <Typography
            sx={{
              color: "#3C3C3C",
              fontSize: "24px",
              fontWeight: 600,
              textAlign: "start",
            }}
          >
            Related Product
          </Typography>
          <ProdCard allProducts={allProducts?.slice(0, 5)} />
        </Stack>
      </Container>
    </Box>
  );
}
