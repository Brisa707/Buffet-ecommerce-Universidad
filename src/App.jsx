import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Contacto from "./pages/Contacto";
import Productos from "./pages/Productos";
import ProductoDetalle from "./pages/ProductoDetalle";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/producto/:id" element={<ProductoDetalle />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
