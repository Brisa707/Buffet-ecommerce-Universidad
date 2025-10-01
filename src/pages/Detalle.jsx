import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/Detalle.css";

const Detalle = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const productos = [
    { id: 1, nombre: "Café + 2 medialunas", precio: 2000, cantidad: 1, img: "https://via.placeholder.com/80" },
    { id: 2, nombre: "Sándwich de jamón y queso", precio: 2500, cantidad: 2, img: "https://via.placeholder.com/80" },
  ];

  const total = productos.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

  return (
    <>
      <Navbar />
      <div className="pedidoDetalle-container">
        <div className="pedidoDetalle-card">
          <div className="pedidoDetalle-header">
            <button className="pedidoDetalle-back" onClick={() => navigate(-1)}>←</button>
            <h2 className="pedidoDetalle-title">Detalle pedido #{id}</h2>
          </div>

          {productos.map((p) => (
            <div className="pedidoDetalle-item" key={p.id}>
              <img src={p.img} />
              <div className="pedidoDetalle-info">
                <p className="pedidoDetalle-nombre">{p.nombre}</p>
                <p className="pedidoDetalle-precio">${p.precio}</p>
                <p className="pedidoDetalle-cantidad">Cantidad: {p.cantidad}</p>
              </div>
            </div>
          ))}

          <div className="pedidoDetalle-total">
            <p>Total:</p>
            <p className="pedidoDetalle-total-precio">${total}</p>
          </div>

          <button
            className="btn-qr"
            onClick={() => navigate(`/qr/${id}`)}
          >
            Ver QR
          </button>
        </div>
      </div>
    </>
  );
};

export default Detalle;




