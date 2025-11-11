import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "@config/api";
import "./detalle-pedido.css";
import { AiOutlineArrowLeft } from "react-icons/ai";

const Detalle = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${API_URL}/pedidos/${id}/productos`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (!Array.isArray(data)) {
          setError(data.mensaje || "Error al obtener productos");
          setProductos([]);
        } else {
          setProductos(data);
        }
      })
      .catch(() => setError("Error al cargar productos del pedido"));
  }, [id]);

  const total = productos.reduce((acc, p) => acc + Number(p.subtotal), 0);

  return (
    <div className="pedidoDetalle-container">
      <div className="pedidoDetalle-card">
        <div className="pedidoDetalle-header">
          <button className="back-button" type="button" onClick={() => navigate(-1)}>
            <AiOutlineArrowLeft size={20} />
          </button>
          <h2 className="pedidoDetalle-title">Detalle pedido #{id}</h2>
        </div>

        {error && <p className="error">{error}</p>}

        {productos.length === 0 && !error && (
          <p className="info">Este pedido no tiene productos.</p>
        )}

        {productos.map((p) => (
          <div className="pedidoDetalle-item" key={p.id}>
            <img
              src={p.imagen_url || "https://via.placeholder.com/80"}
              alt={p.nombre}
              className="pedidoDetalle-img"
            />
            <div className="pedidoDetalle-info">
              <p className="pedidoDetalle-nombre">{p.nombre}</p>
              <p className="pedidoDetalle-precio">
                ${Number(p.precio).toLocaleString("es-AR", { minimumFractionDigits: 2 })}
              </p>
              <p className="pedidoDetalle-cantidad">Cantidad: {p.cantidad}</p>
            </div>
          </div>
        ))}

        <div className="pedidoDetalle-total">
          <p>Total:</p>
          <p className="pedidoDetalle-total-precio">
            ${total.toLocaleString("es-AR", { minimumFractionDigits: 2 })}
          </p>
        </div>

        <button className="btn-qr" onClick={() => navigate(`/qr/${id}`)}>
          Ver QR
        </button>
      </div>
    </div>
  );
};

export default Detalle;
