import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <p style={{ textAlign: "center", marginTop: "3rem" }}>
        Checking session...
      </p>
    );
  }

  return user ? children : <Navigate to="/login" />;
}
