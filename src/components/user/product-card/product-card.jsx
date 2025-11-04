import React from "react";
import { useNavigate } from "react-router-dom";
import "./product-card.css";

function ProductCard({ producto, onAddToCart }) {
  const navigate = useNavigate();

  // Evita que el clic del botón dispare el clic de la tarjeta
  const handleCardClick = (e) => {
    // Si se hizo clic en el botón, no navegar
    if (e.target.closest(".btn-add")) return;
    navigate(`/producto/${producto.id}`);
  };

  return (
    <div className="producto-card" onClick={handleCardClick}>
      <img src={producto.img} alt={producto.nombre} />
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
