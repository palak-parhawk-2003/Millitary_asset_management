import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }
  return user ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;