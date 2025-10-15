import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/user/Home";
import Register from "./pages/user/Register";
import Contacto from "./pages/user/Contacto";
import Productos from "./pages/user/Productos";
import ProductoDetalle from "./pages/user/ProductoDetalle"; 
import Carrito from "./pages/user/Carrito";
import Pedidos from "./pages/user/Pedidos";
import Detalle from "./pages/user/Detalle";
import QRPage from "./pages/user/QRPage";
import Perfil from "./pages/user/Perfil";
import Navbar from './components/navbar/Navbar.jsx';
import Footer from './components/footer/Footer.jsx';

function AppLayout() {
  const location = useLocation();

  const hideNavFooter = location.pathname === "/" || location.pathname === "/register";

  return (
    <>
      {!hideNavFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/producto/:id" element={<ProductoDetalle />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/pedidos" element={<Pedidos />} />
        <Route path="/detalle/:id" element={<Detalle />} />
        <Route path="/qr/:id" element={<QRPage />} />
        <Route path="/perfil" element={<Perfil />} />
      </Routes>
      {!hideNavFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;

