import React from "react";
import { useNavigate } from "react-router-dom";
import "./product-card.css";

function ProductCard({ producto, onAddToCart }) {
  const navigate = useNavigate();

  // Evita que el clic del botón dispare el clic de la tarjeta
  const handleCardClick = (e) => {
    if (e.target.closest(".btn-add")) return;
    navigate(`/producto/${producto.id}`);
  };

  return (
    <div className="producto-card" onClick={handleCardClick}>
      <img src={producto.imagen_url} alt={producto.nombre} className="producto-card-img" />
      <h3>{producto.nombre}</h3>
      <p className="producto-precio">${producto.precio.toLocaleString()}</p>
      {onAddToCart && (
        <button className="btn-add" onClick={() => onAddToCart(producto)}>
          + Añadir
        </button>
      )}
    </div>
  );
}

export default ProductCard;
