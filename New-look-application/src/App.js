import { Stack } from "@mui/material";
import Products from "./pages/product/allProductList";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./auth/Login";
import SignUpPage from "./auth/SignUp";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import AuthPublicRoute from "./auth/AuthPublicRouter";
import ProfileSection from "./pages/profile/profile";
import ProductSinglePage from "./pages/product/singleProduct/ProductSingleview";
import AuthPrivateRoute from "./auth/AuthPriveteRouter";
import WishlistPage from "./pages/wishlist/WishlistPage";
import CartPage from "./pages/cart/CartPage";

function App() {
  return (
    <Stack>
      <BrowserRouter>
        <Routes>
          <Route
            path="/profile"
            element={
              <AuthPrivateRoute>
                <>
                  <Header />
                  <ProfileSection />
                  <Footer />
                </>
              </AuthPrivateRoute>
            }
          />
          <Route
            path="/products"
            element={
              <AuthPrivateRoute>
                <>
                  <Header />
                  <Products />
                  <Footer />
                </>
              </AuthPrivateRoute>
            }
          />
          <Route
            path="/product/:id"
            element={
              <AuthPrivateRoute>
                <>
                  <Header />
                  <ProductSinglePage />
                  <Footer />
                </>
              </AuthPrivateRoute>
            }
          />

          <Route
            path="/wishlist"
            element={
              <AuthPrivateRoute>
                <>
                  <Header />
                  <WishlistPage />
                  <Footer />
                </>
              </AuthPrivateRoute>
            }
          />

          <Route
            path="/cart"
            element={
              <AuthPrivateRoute>
                <>
                  <Header />
                  <CartPage />
                  <Footer />
                </>
              </AuthPrivateRoute>
            }
          />

          {/* Public Routes */}
          <Route
            path="/login"
            element={
              <AuthPublicRoute>
                <LoginPage />
              </AuthPublicRoute>
            }
          />
          <Route
            path="/sign-up"
            element={
              <AuthPublicRoute>
                <SignUpPage />
              </AuthPublicRoute>
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
