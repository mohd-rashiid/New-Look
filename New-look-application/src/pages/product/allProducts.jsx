import { Grid, Stack, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import Filters from "./filters";
import ProductGrid from "./productCard";

function Products() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Stack
      direction={isMobile ? "column" : "row"}
      // alignItems="center"
      spacing={0}
      mt={isMobile ? 20 : 25}
    >
      {!isMobile && (
        <Grid width="25%">
          <Filters />
        </Grid>
      )}
      <Grid width="100%">
        <ProductGrid />
      </Grid>
    </Stack>
  );
}

export default Products;
