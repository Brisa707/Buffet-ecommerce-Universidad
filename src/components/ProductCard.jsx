import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ProductCard.css";

function ProductCard({ producto, onAddToCart }) {
  const navigate = useNavigate();

  return (
    <div className="producto-card">
      <img
        src={producto.img}
        alt={producto.nombre}
        onClick={() => navigate(`/producto/${producto.id}`)}
      />
      <h3>{producto.nombre}</h3>
      <p className="producto-precio">${producto.precio.toLocaleString()}</p>
      <button className="btn-add" onClick={() => onAddToCart(producto)}>
        + Añadir
      </button>
    </div>
  );
}

export default ProductCard;
