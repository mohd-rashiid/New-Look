import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { AuthProvider } from "./contexts/AuthContext";

// const theme = createTheme({
//   palette: {
//     mode: "light",
//     primary: {
//       main: "#1976d2", // blue
//     },
//     secondary: {
//       main: "#9c27b0", // purple
//     },
//   },
// });

const theme = createTheme({
  palette: {
    primary: { main: "#667eea" },
    secondary: { main: "#764ba2" },
  },
  typography: {
    fontFamily: ["Raleway"].join(","),
    h4: { fontWeight: 700 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <CssBaseline />
        <App />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
