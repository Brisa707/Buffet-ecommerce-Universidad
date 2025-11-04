import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "./layout/admin-layout";
import UserLayout from "./layout/user-layout";
import AdminRoutes from "./routes/admin-routes";
import UserRoutes from "./routes/user-routes";
import Login from "@pages/login";
import Register from "@pages/user/registro/registro";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas de usuario sin prefijo */}
        <Route
          path="/*"
          element={
            <UserLayout>
              <UserRoutes />
            </UserLayout>
          }
        />

        {/* Rutas de admin con layout */}
        <Route
          path="/admin/*"
          element={
            <AdminLayout>
              <AdminRoutes />
            </AdminLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
