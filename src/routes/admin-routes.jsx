import { Routes, Route } from "react-router-dom";
import Dashboard from "@adminpages/dashboard/dashboard";
import QRAdmin from "@adminpages/qr/qr-admin";
import ProductosAdmin from "@adminpages/productos/productos-admin";
import EditarProducto from "@adminpages/productos/producto-editar";
import CrearProducto from "@adminpages/productos/producto-crear";
import UsuariosAdmin from "@adminpages/usuarios/usuarios-admin";
import EditarUsuario from "@adminpages/usuarios/usuario-editar";
import CrearUsuario from "@adminpages/usuarios/usuario-crear";
import PedidosAdmin from "@adminpages/pedidos/pedidos-admin";
import EditarPedido from "@adminpages/pedidos/pedido-editar";
import CrearPedido from "@adminpages/pedidos/pedido-crear";
import CategoriasAdmin from "@adminpages/categorias/categorias-admin";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="" element={<Dashboard />} />
      <Route path="qr" element={<QRAdmin />} />
      <Route path="categorias" element={<CategoriasAdmin />} />
      <Route path="productos" element={<ProductosAdmin />} />
      <Route path="productos/agregar" element={<CrearProducto />} />
      <Route path="productos/editar/:id" element={<EditarProducto />} />
      <Route path="usuarios" element={<UsuariosAdmin />} />
      <Route path="usuarios/agregar" element={<CrearUsuario />} />
      <Route path="usuarios/editar/:id" element={<EditarUsuario />} />
      <Route path="pedidos" element={<PedidosAdmin />} />
      <Route path="pedidos/agregar" element={<CrearPedido />} />
      <Route path="pedidos/editar/:id" element={<EditarPedido />} />
    </Routes>
  );
}