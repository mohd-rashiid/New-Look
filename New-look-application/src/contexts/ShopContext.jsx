import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import PropTypes from "prop-types";
import { useAuth } from "./AuthContext";
import { Snackbar, Alert } from "@mui/material";

const ShopContext = createContext();

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used within ShopProvider");
  return ctx;
}

function getStorageKey(baseKey, userId) {
  return `${baseKey}:${userId ?? "guest"}`;
}

export function ShopProvider({ children }) {
  const { currentUser } = useAuth();
  const userId = currentUser?.uid ?? "guest";

  const [cartItems, setCartItems] = useState([]); // [{id, title, price, image, qty}]
  const [wishlistItems, setWishlistItems] = useState([]); // [{id, title, price, image}]
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  console.log(
    "ShopContext - userId:",
    userId,
    "cartItems:",
    cartItems.length,
    "wishlistItems:",
    wishlistItems.length
  );

  console.log(cartItems);

  // Load from localStorage when userId changes
  useEffect(() => {
    try {
      const cartKey = getStorageKey("cart", userId);
      const wishKey = getStorageKey("wishlist", userId);
      const storedCart = localStorage.getItem(cartKey);
      const storedWishlist = localStorage.getItem(wishKey);

      setCartItems(storedCart ? JSON.parse(storedCart) : []);
      setWishlistItems(storedWishlist ? JSON.parse(storedWishlist) : []);
    } catch (error) {
      console.error("Error loading from localStorage:", error);
      setCartItems([]);
      setWishlistItems([]);
    }
  }, [userId]);

  // Persist cart changes to localStorage (with debounce)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      try {
        const cartKey = getStorageKey("cart", userId);
        localStorage.setItem(cartKey, JSON.stringify(cartItems));
      } catch (error) {
        console.error("Error saving cart to localStorage:", error);
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [cartItems, userId]);

  // Persist wishlist changes to localStorage (with debounce)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      try {
        const wishKey = getStorageKey("wishlist", userId);
        localStorage.setItem(wishKey, JSON.stringify(wishlistItems));
      } catch (error) {
        console.error("Error saving wishlist to localStorage:", error);
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [wishlistItems, userId]);

  const addToCart = useCallback((product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (p) => p.id === product.id && p.size === product.size
      );

      if (existing) {
        return prev.map((p) =>
          p.id === product.id && p.size === product.size
            ? { ...p, qty: p.qty + quantity }
            : p
        );
      }

      return [
        ...prev,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          size: product.size, // now part of uniqueness
          qty: quantity,
        },
      ];
    });

    setToast({ open: true, message: "Added to cart!", severity: "success" });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCartItems((prev) => prev.filter((p) => p.id !== productId));
  }, []);

  const updateCartQty = useCallback((productId, qty) => {
    setCartItems((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, qty: Math.max(1, qty) } : p
      )
    );
  }, []);

  const clearCart = useCallback(() => setCartItems([]), []);

  const addToWishlist = useCallback((product) => {
    setWishlistItems((prev) => {
      if (prev.some((p) => p.id === product.id)) {
        setToast({
          open: true,
          message: "Already in wishlist!",
          severity: "info",
        });
        return prev;
      }
      setToast({
        open: true,
        message: "Added to wishlist!",
        severity: "success",
      });
      return [
        ...prev,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          size: product?.size,
        },
      ];
    });
  }, []);

  const removeFromWishlist = useCallback((productId) => {
    setWishlistItems((prev) => prev.filter((p) => p.id !== productId));
  }, []);

  const moveWishlistToCart = useCallback((productId) => {
    setWishlistItems((prev) => {
      const product = prev.find((p) => p.id === productId);
      if (product) {
        setCartItems((c) => {
          const exists = c.find((p) => p.id === productId);
          if (exists)
            return c.map((p) =>
              p.id === productId ? { ...p, qty: p.qty + 1 } : p
            );
          return [...c, { ...product, qty: 1 }];
        });
      }
      return prev.filter((p) => p.id !== productId);
    });
  }, []);

  const totals = useMemo(() => {
    const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);
    const cartTotal = cartItems.reduce(
      (sum, i) => sum + i.qty * Number(i.price || 0),
      0
    );
    const wishlistCount = wishlistItems.length;
    return { cartCount, cartTotal, wishlistCount };
  }, [cartItems, wishlistItems]);

  const handleCloseToast = () => {
    setToast((prev) => ({ ...prev, open: false }));
  };

  const value = useMemo(
    () => ({
      cartItems,
      wishlistItems,
      addToCart,
      removeFromCart,
      updateCartQty,
      clearCart,
      addToWishlist,
      removeFromWishlist,
      moveWishlistToCart,
      totals,
    }),
    [
      cartItems,
      wishlistItems,
      addToCart,
      removeFromCart,
      updateCartQty,
      clearCart,
      addToWishlist,
      removeFromWishlist,
      moveWishlistToCart,
      totals,
    ]
  );

  return (
    <ShopContext.Provider value={value}>
      {children}
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseToast}
          severity={toast.severity}
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </ShopContext.Provider>
  );
}

ShopProvider.propTypes = {
  children: PropTypes.any,
};

export default ShopContext;
