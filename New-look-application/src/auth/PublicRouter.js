import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PublicRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return null; // or a loader if you want
  }

  // If user is logged in, redirect to products page
  if (currentUser) {
    return <Navigate to="/products" replace />;
  }

  return children;
};

export default PublicRoute;
