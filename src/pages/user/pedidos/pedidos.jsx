import React from "react";
import { useNavigate } from "react-router-dom";
import './pedidos.css';
import { AiOutlineArrowLeft } from "react-icons/ai";


const Pedidos = () => {
  const navigate = useNavigate();

  const pedidos = [
    { id: 1234, estado: "Entregado", fecha: "12/09/2025", total: 1000 },
    { id: 1235, estado: "Entregado", fecha: "13/09/2025", total: 2500 },
    { id: 1236, estado: "Pendiente", fecha: "14/09/2025", total: 2000 },
  ];

  return (
    <>
      <div className="pedidos-container">
        <div className="pedidos-card">
          <div className="pedidos-header">
            <button
                          className="detalle-back"
                          type="button"
                          onClick={() => navigate(-1)}
                        >
                          <AiOutlineArrowLeft size={20} />
                        </button>
            <h2 className="pedidos-title">Mis pedidos</h2>
          </div>

          {pedidos.map((pedido) => (
            <div className="pedido-item" key={pedido.id}>
              <div className="pedido-info">
                <p className="pedido-numero">Pedido #{pedido.id}</p>
                <p className="pedido-fecha">Fecha: {pedido.fecha}</p>
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
    </>
  );
};

export default Pedidos;



