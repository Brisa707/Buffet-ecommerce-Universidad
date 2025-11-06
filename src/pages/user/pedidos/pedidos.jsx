import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "@config/api";
import "./pedidos.css";
import { AiOutlineArrowLeft } from "react-icons/ai";

const Pedidos = () => {
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${API_URL}/pedidos/mis-pedidos`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) {
          setError(data.mensaje || "Error al cargar pedidos");
          setPedidos([]);
        } else {
          setPedidos(data);
        }
      })
      .catch(() => setError("Error al cargar pedidos"));
  }, []);

  return (
    <div className="pedidos-container">
      <div className="pedidos-card">
        <div className="pedidos-header">
          <button className="detalle-back" onClick={() => navigate(-1)}>
            <AiOutlineArrowLeft size={20} />
          </button>
          <h2 className="pedidos-title">Mis pedidos</h2>
        </div>

        {error && <p className="error">{error}</p>}

        {pedidos.length === 0 && !error && (
          <p className="info">No tenés pedidos registrados aún.</p>
        )}

        {pedidos.map((pedido) => (
          <div className="pedido-item" key={pedido.id}>
            <div className="pedido-info">
              <p className="pedido-numero">Pedido #{pedido.numero_pedido}</p>
              <p className="pedido-fecha">
                Fecha: {new Date(pedido.fecha).toLocaleDateString()}
              </p>
              <p className="pedido-total">Total: ${pedido.total}</p>
            </div>
            <div className="pedido-right">
              <span className={`pedido-estado ${pedido.estado.toLowerCase()}`}>
                {pedido.estado}
              </span>
              <button
                className="btn-detalle"
                onClick={() => navigate(`/detalle/${pedido.id}`)}
              >
                Ver detalle →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pedidos;
