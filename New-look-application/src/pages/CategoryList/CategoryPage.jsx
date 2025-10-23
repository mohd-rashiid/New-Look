import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Skeleton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useParams } from "react-router-dom";
import ProductSingleCard from "../product/components/ProductSingleCard";

export default function CategoryPage() {
  const theme = useTheme();
  const params = useParams();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [allProducts, setAllProducts] = useState();
  const [productLoading, setProductLoading] = useState(true);

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

  console.log(allProducts);

  const categoryBasedProducts = allProducts?.filter(
    (item) => item?.category && item.category === params?.name
  );

  console.log(categoryBasedProducts);

  const loadingComp = isMobile ? (
    <>
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="center"
      >
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
    </>
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
    </>
  );

  return (
    <Box sx={{ mt: { xs: 16, md: 22 }, minHeight: "60vh", bgcolor: "#fff" }}>
      <Container maxWidth="lg">
        <Typography
          sx={{
            color: "#3C3C3C",
            fontSize: "24px",
            fontWeight: 600,
            textAlign: "start",
            textTransform: "capitalize",
            py: isMobile ? 3 : 0,
          }}
        >
          {params?.name}
        </Typography>
        <Stack
          direction={isMobile && "row"}
          alignItems={isMobile && "center"}
          justifyContent={isMobile && "center"}
        >
          {productLoading ? (
            loadingComp
          ) : (
            <Stack
              direction={isMobile && "row"}
              alignItems={isMobile && "center"}
              justifyContent={isMobile && "center"}
            >
              <ProductSingleCard
                allProducts={categoryBasedProducts}
                isCategory
              />
            </Stack>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
