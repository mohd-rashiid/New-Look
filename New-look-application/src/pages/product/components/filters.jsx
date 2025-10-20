import React, { useState } from "react";
import {
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Slider,
  Stack,
} from "@mui/material";

const Filters = () => {
  const [priceRange, setPriceRange] = useState([179, 260]);
  const [filters, setFilters] = useState({
    version: false,
    ladies: false,
    grill: false,
    hm: false,
    zara: false,
    dg: false,
    gucci: false,
    fendi: false,
    prada: false,
    lv: false,
    versace: false,
    cg: false,
    dce: false,
    tops: false,
    printed: false,
    tshirt: false,
    boxers: false,
    medium: false,
    large: false,
    xl: false,
    xxl: false,
  });

  const handleFilterChange = (name) => {
    setFilters((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const FilterSection = ({ title, children, showMoreCount }) => (
    <Box>
      <Typography
        variant="body2"
        sx={{
          fontWeight: 400,
          mb: 1.5,
          fontSize: "16px",
          textTransform: "uppercase",
          letterSpacing: "0.5px",
          color: "#1F2937",
          textAlign: "start",
        }}
      >
        {title}
      </Typography>
      {children}
      {showMoreCount && (
        <Typography
          variant="body2"
          sx={{
            color: "#EB5757",
            fontSize: "14px",
            textAlign: "start",
            pl: 3,
            mt: 1,
            cursor: "pointer",
            "&:hover": { color: "#EB5757" },
          }}
        >
          +{showMoreCount} more
        </Typography>
      )}
    </Box>
  );

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        width: 280,
        p: 3,
        bgcolor: "#fff",
        height: "100vh",
        overflowY: "auto",
        "&::-webkit-scrollbar": {
          width: "4px",
        },
        "&::-webkit-scrollbar-track": {
          background: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#E5E7EB",
          borderRadius: "10px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          background: "#D1D5DB",
        },
        scrollbarWidth: "thin",
        scrollbarColor: "#E5E7EB transparent",
      }}
    >
      {/* PRICES */}
      <FilterSection title="PRICES">
        <Box sx={{ pb: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 0.5,
            }}
          >
            <Typography
              variant="caption"
              sx={{ fontSize: "14px", color: "#666" }}
            >
              Range:
            </Typography>
            <Typography
              variant="caption"
              sx={{ fontSize: "14px", fontWeight: 400 }}
            >
              ${priceRange[0]} - ${priceRange[1]}
            </Typography>
          </Box>
          <Slider
            value={priceRange}
            onChange={handlePriceChange}
            min={179}
            max={260}
            sx={{
              color: "#EB5757",
              "& .MuiSlider-thumb": {
                width: 10,
                height: 10,
              },
            }}
          />
        </Box>
      </FilterSection>

      {/* FILTERS */}
      <FilterSection title="FILTERS">
        <FormGroup
          sx={{
            pb: 1,
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                color="error"
                checked={filters.version}
                onChange={() => handleFilterChange("version")}
                size="small"
                sx={{ py: 1 }}
              />
            }
            label={
              <Typography variant="body2" sx={{ fontSize: "14px" }}>
                Version
              </Typography>
            }
          />
          <FormControlLabel
            control={
              <Checkbox
                color="error"
                checked={filters.ladies}
                onChange={() => handleFilterChange("ladies")}
                size="small"
                sx={{ py: 1 }}
              />
            }
            label={
              <Typography variant="body2" sx={{ fontSize: "14px" }}>
                Ladies
              </Typography>
            }
          />
          <FormControlLabel
            control={
              <Checkbox
                color="error"
                checked={filters.grill}
                onChange={() => handleFilterChange("grill")}
                size="small"
                sx={{ py: 1 }}
              />
            }
            label={
              <Typography variant="body2" sx={{ fontSize: "14px" }}>
                Grill
              </Typography>
            }
          />
        </FormGroup>
      </FilterSection>

      {/* BRANDS */}
      <Stack pt={2}>
        <FilterSection title="BRANDS" showMoreCount={263}>
          <FormGroup>
            {[
              { key: "hm", label: "H&M" },
              { key: "zara", label: "Zara & Superdry" },
              { key: "dg", label: "D&G" },
              { key: "gucci", label: "Gucci" },
              { key: "fendi", label: "Fendi" },
              { key: "prada", label: "Prada" },
              { key: "lv", label: "LV" },
              { key: "versace", label: "Versace" },
              { key: "cg", label: "Dolce & Gabbana" },
              { key: "dce", label: "D&G" },
            ].map((item) => (
              <FormControlLabel
                key={item.key}
                control={
                  <Checkbox
                    color="error"
                    checked={filters[item.key]}
                    onChange={() => handleFilterChange(item.key)}
                    size="small"
                    sx={{ py: 1 }}
                  />
                }
                label={
                  <Typography variant="body2" sx={{ fontSize: "14px" }}>
                    {item.label}
                  </Typography>
                }
              />
            ))}
          </FormGroup>
        </FilterSection>
      </Stack>

      <Stack pt={4}>
        {/* CATEGORIES */}
        <FilterSection title="CATEGORIES" showMoreCount={4}>
          <FormGroup>
            {[
              { key: "tops", label: "Tops" },
              { key: "printed", label: "Printed T-shirts" },
              { key: "tshirt", label: "T-Shirt & Lounger Wear" },
              { key: "boxers", label: "Boxers" },
            ].map((item) => (
              <FormControlLabel
                key={item.key}
                control={
                  <Checkbox
                    color="error"
                    checked={filters[item.key]}
                    onChange={() => handleFilterChange(item.key)}
                    size="small"
                    sx={{ py: 1 }}
                  />
                }
                label={
                  <Typography variant="body2" sx={{ fontSize: "14px" }}>
                    {item.label}
                  </Typography>
                }
              />
            ))}
          </FormGroup>
        </FilterSection>
      </Stack>

      {/* SIZE */}
      <Stack pt={4}>
        <FilterSection title="SIZE">
          <FormGroup>
            {[
              { key: "medium", label: "Medium" },
              { key: "large", label: "Large" },
              { key: "xl", label: "Plus Size" },
              { key: "xxl", label: "XXL" },
            ].map((item) => (
              <FormControlLabel
                key={item.key}
                control={
                  <Checkbox
                    color="error"
                    checked={filters[item.key]}
                    onChange={() => handleFilterChange(item.key)}
                    size="small"
                    sx={{ py: 1 }}
                  />
                }
                label={
                  <Typography variant="body2" sx={{ fontSize: "14px" }}>
                    {item.label}
                  </Typography>
                }
              />
            ))}
          </FormGroup>
        </FilterSection>
      </Stack>
    </Box>
  );
};

export default Filters;
