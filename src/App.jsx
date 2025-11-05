import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "./layout/admin-layout";
import UserLayout from "./layout/user-layout";
import AdminRoutes from "./routes/admin-routes";
import UserRoutes from "./routes/user-routes";
import Login from "@pages/login";
import Register from "@pages/user/registro/registro";
import ProtectedRoute from "@components/protected-route";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas de usuario protegidas */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <UserLayout>
                <UserRoutes />
              </UserLayout>
            </ProtectedRoute>
          }
        />

        {/* Rutas de admin protegidas */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminLayout>
                <AdminRoutes />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
