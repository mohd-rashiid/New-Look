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
import PrivateRoute from "./auth/PriveteRouter";

function App() {
  return (
    <Stack>
      <BrowserRouter>
        <Routes>
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <>
                  <Header />
                  <ProfileSection />
                  <Footer />
                </>
              </PrivateRoute>
            }
          />
          <Route
            path="/products"
            element={
              <PrivateRoute>
                <>
                  <Header />
                  <Products />
                  <Footer />
                </>
              </PrivateRoute>
            }
          />
          <Route
            path="/product/:id"
            element={
              <PrivateRoute>
                <>
                  <Header />
                  <ProductSinglePage />
                  <Footer />
                </>
              </PrivateRoute>
            }
          />

          {/* Public Routes */}
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

          {/* catch-all redirect */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </Stack>
  );
}

export default App;
