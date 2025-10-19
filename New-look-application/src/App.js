import { Stack } from "@mui/material";
import Products from "./pages/product/allProducts";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./auth/Login";
import SignUpPage from "./auth/SignUp";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import ProductSinglePage from "./pages/product/ProductSingleview";
import PublicRoute from "./auth/PublicRouter";
import ProfileSection from "./pages/profile/profile";

function App() {
  return (
    // <Container maxWidth="xl" sx={{ textAlign: "center", mt: 5 }}>
    <Stack>
      <BrowserRouter>
        <Routes>
          <Route
            path="/profile"
            element={
              <>
                <Header />
                <ProfileSection />
                <Footer />
              </>
            }
          />
          <Route
            path="/products"
            element={
              <>
                <Header />
                <Products />
                <Footer />
              </>
            }
          />
          <Route
            path="/product/:id"
            element={
              <>
                <Header />
                <ProductSinglePage /> <Footer />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/sign-up"
            element={
              <PublicRoute>
                <SignUpPage />
              </PublicRoute>
            }
          />
          {/* catch-all / redirect */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </Stack>
    // </Container>
  );
}

export default App;
