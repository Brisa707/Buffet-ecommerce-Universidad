import { Routes, Route } from "react-router-dom";
import Home from "@userpages/home/home";
import Contacto from "@userpages/contacto/contacto";
import Productos from "@userpages/producto/productos";
import ProductoDetalle from "@userpages/producto/producto-detalle";
import Carrito from "@userpages/carrito/carrito";
import Pedidos from "@userpages/pedidos/pedidos";
import Detalle from "@userpages/pedidos/detalle-pedido";
import QRPage from "@userpages/qr/qr-page";
import Perfil from "@userpages/perfil/perfil";

export default function UserRoutes() {
  return (
    <Routes>
      <Route path="home" element={<Home />} />
      <Route path="contacto" element={<Contacto />} />
      <Route path="perfil" element={<Perfil />} />
      <Route path="productos" element={<Productos />} />
      <Route path="producto/:id" element={<ProductoDetalle />} />
      <Route path="carrito" element={<Carrito />} />
      <Route path="pedidos" element={<Pedidos />} />
      <Route path="detalle/:id" element={<Detalle />} />
      <Route path="qr/:id" element={<QRPage />} />
    </Routes>
  );
}