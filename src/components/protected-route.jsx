import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, requiredRole }) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  if (!usuario) return <Navigate to="/" />;

  if (requiredRole && usuario.rol !== requiredRole) {
    return <Navigate to="/" />;
  }

  return children;
}
