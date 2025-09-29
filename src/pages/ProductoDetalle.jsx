import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/ProductoDetalle.css";

function ProductoDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cantidad, setCantidad] = useState(1);

  // Datos simulados
  const productosData = [
    { id: 1, nombre: "Café + 2 medialunas", precio: 2000, descripcion: "Café a elección con dos medialunas frescas.", img: "https://via.placeholder.com/300" },
    { id: 2, nombre: "Sándwich de jamón y queso", precio: 2500, descripcion: "Clásico sándwich con pan fresco.", img: "https://via.placeholder.com/300" },
    { id: 3, nombre: "Hamburguesa + papas", precio: 3500, descripcion: "Hamburguesa completa con papas fritas.", img: "https://via.placeholder.com/300" },
    { id: 4, nombre: "Flan con dulce", precio: 1500, descripcion: "Flan casero con dulce de leche.", img: "https://via.placeholder.com/300" },
    { id: 5, nombre: "Café con leche", precio: 1800, descripcion: "Café con leche caliente y cremoso.", img: "https://via.placeholder.com/300" },
    { id: 6, nombre: "Brownie", precio: 1200, descripcion: "Brownie de chocolate húmedo.", img: "https://via.placeholder.com/300" },
  ];

  const producto = productosData.find((p) => p.id === parseInt(id));

  if (!producto) return <p>Producto no encontrado</p>;

  const actualizarCantidad = (operacion) => {
    setCantidad((prev) => {
      const nueva = prev + operacion;
      return nueva > 0 ? nueva : 1;
    });
  };

  const handleAddToCart = () => {
    const carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];
    const existe = carritoActual.find((p) => p.id === producto.id);

    if (existe) {
      existe.cantidad += cantidad;
    } else {
      carritoActual.push({ ...producto, cantidad });
    }

    localStorage.setItem("carrito", JSON.stringify(carritoActual));
    navigate("/carrito");
  };

  return (
    <>
      <Navbar />
      <div className="detalle-wrapper">
        <div className="detalle-card">
          {/* Header con botón atrás */}
          <div className="detalle-header">
            <button className="detalle-back" onClick={() => navigate(-1)}>←</button>
          </div>

          {/* Imagen */}
          <img src={producto.img} className="detalle-img" />

          {/* Info alineada a la izquierda */}
          <div className="detalle-info">
            <h2 className="detalle-nombre">{producto.nombre}</h2>
            <p className="detalle-descripcion">{producto.descripcion}</p>
            <p className="detalle-precio">${producto.precio}</p>
          </div>

          {/* Cantidad + botón */}
          <div className="detalle-actions">
            <div className="detalle-cantidad">
              <button onClick={() => actualizarCantidad(-1)}>-</button>
              <span>{cantidad}</span>
              <button onClick={() => actualizarCantidad(1)}>+</button>
            </div>
            <button className="btn-add" onClick={handleAddToCart}>
              + Añadir
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductoDetalle;











