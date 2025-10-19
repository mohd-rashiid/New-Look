import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Stack,
  useTheme,
  useMediaQuery,
  Skeleton,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import ProdCard from "./ProdCard";

const ProductGrid = () => {
  // Sample product data

  const [allProducts, setAllProducts] = useState();
  const [productLoading, setProductLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  // const searchValue = localStorage.getItem("searchKey");

  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (search) {
      const matches = allProducts?.filter((product) =>
        product?.title?.toLowerCase().includes(search.toLowerCase())
      );

      setFilteredProducts(matches);
    } else {
      setFilteredProducts(allProducts); // show all by default
    }
  }, [allProducts, search]);
  useEffect(() => {
    if (selectedCategory) {
      const matches = allProducts?.filter((product) =>
        product?.category
          ?.toLowerCase()
          .includes(selectedCategory.toLowerCase())
      );

      setFilteredProducts(matches);
    } else {
      setFilteredProducts(allProducts); // show all by default
    }
  }, [allProducts, selectedCategory]);

  const handleChangeSearchValue = (event) => {
    const value = event?.target?.value;
    setSearch(value);
  };

  useEffect(() => {
    // Fetch data when the component mounts
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setAllProducts(data);
        setProductLoading(false);
        const uniqueCategories = Array.from(
          new Set(data.map((p) => p.category))
        );
        setCategories(uniqueCategories);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setProductLoading(false);
      });
  }, []); // Empty array = run only once

  const loadingComp = isMobile ? (
    <Stack direction="row" spacing={2}>
      <Skeleton
        variant="rectangular"
        height={200}
        width="150px"
        sx={{ borderRadius: 2, mb: 4 }}
      />
      <Skeleton
        variant="rectangular"
        height={200}
        width="150px"
        sx={{ borderRadius: 2, mb: 4 }}
      />
    </Stack>
  ) : (
    <>
      <Stack
        direction="row"
        flexWrap="wrap"
        spacing={1}
        sx={{ justifyContent: "center", pb: 4 }}
      >
        {[1, 2, 3, 4].map((_, index) => (
          <Skeleton
            key={index}
            variant="rectangular"
            height={200}
            width="260px"
            sx={{ borderRadius: 2, mb: 2 }}
          />
        ))}
      </Stack>
      <Stack
        direction="row"
        flexWrap="wrap"
        spacing={1}
        sx={{ justifyContent: "center", pb: 4 }}
      >
        {[1, 2, 3, 4].map((_, index) => (
          <Skeleton
            key={index}
            variant="rectangular"
            height={200}
            width="260px"
            sx={{ borderRadius: 2, mb: 2 }}
          />
        ))}
      </Stack>
    </>
  );

  return (
    <Box sx={{ minHeight: "", width: "100%", p: 0 }}>
      {/* Header */}

      <Stack
        direction={isMobile ? "column" : "row"}
        alignItems="center"
        spacing={2}
        px={isMobile && 2}
      >
        <TextField
          placeholder="Search Product Here.."
          variant="outlined"
          onChange={(event) => handleChangeSearchValue(event)}
          sx={{
            width: isMobile ? "100%" : "25%",
            "& .MuiInputBase-input": {
              height: "30px", // controls input height
              padding: "6px 12px", // vertical and horizontal padding
              fontSize: "14px",
            },
          }}
          InputProps={{
            sx: {
              borderRadius: 2, // optional: rounded corners
            },
          }}
        />
        <FormControl
          sx={{
            "& .MuiOutlinedInput-root": {
              height: 43,
              minWidth: isMobile ? "355px" : 250,
              borderRadius: 2,
              "& fieldset": {
                borderColor: "#ccc",
              },
              "&:hover fieldset": {
                borderColor: "#999",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#ccc !important",
              },
            },
            "& .MuiInputLabel-root": {
              color: "#000", // default black
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#000 !important", // keep black when focused
            },
          }}
        >
          <InputLabel
            sx={{
              top: -3,
              fontSize: "0.95rem",
            }}
          >
            Select a Category
          </InputLabel>
          <Select
            value={selectedCategory}
            label="Category"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <MenuItem value="">All Categories</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
      <Box sx={{ mb: 3 }}>
        {search && (
          <Typography
            sx={{
              fontSize: isMobile ? 16 : "24px",
              color: "#3C3C3C",
              fontWeight: 500,
              textAlign: "start",
            }}
          >
            Showing 1 - {filteredProducts?.length} out of {allProducts?.length}{" "}
            Products
          </Typography>
        )}
      </Box>

      {/* Product Grid */}
      {productLoading ? (
        loadingComp
      ) : (
        <Stack pl={isMobile && 3}>
          <ProdCard
            allProducts={
              search || selectedCategory ? filteredProducts : allProducts
            }
          />
        </Stack>
      )}
    </Box>
  );
};

export default ProductGrid;
