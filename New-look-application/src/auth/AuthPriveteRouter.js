import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const AuthPrivateRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return null; // or a loader
  }

  // If not logged in → redirect to login
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AuthPrivateRoute;
