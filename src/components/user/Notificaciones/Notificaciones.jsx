import React, { useState } from "react";
import { FaBell, FaTimes } from "react-icons/fa";
import { FiCheck } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Notificaciones.css";

const Notificaciones = () => {
  const [notificaciones, setNotificaciones] = useState([
    { id: 1, mensaje: "Tu pedido #103 esta pendiente", leida: false },
    { id: 2, mensaje: "Tu pedido #102 fue entregado", leida: true },
  ]);

  const [open, setOpen] = useState(false);
  const notificacionesNoLeidas = notificaciones.filter((n) => !n.leida).length;

  // Agregar nueva notificación + toast
  const agregarNotificacion = (mensaje) => {
    const nueva = { id: Date.now(), mensaje, leida: false };
    setNotificaciones((prev) => [nueva, ...prev]);
    toast.info(mensaje, {
      position: "bottom-right",
      autoClose: 4000,
      theme: "colored",
    });
  };

  const marcarComoLeida = (id) => {
    setNotificaciones((prev) =>
      prev.map((n) => (n.id === id ? { ...n, leida: true } : n))
    );
  };

  const marcarTodasComoLeidas = () => {
    setNotificaciones((prev) => prev.map((n) => ({ ...n, leida: true })));
  };

  const eliminarNotificacion = (id) => {
    setNotificaciones((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="notificaciones-container">
      {/* Icono campana */}
      <div className="icono-campana" onClick={() => setOpen(!open)}>
        <FaBell className="nav-icon" />
        {notificacionesNoLeidas > 0 && (
          <span className="contador">{notificacionesNoLeidas}</span>
        )}
      </div>

      {/* Panel de notificaciones */}
      {open && (
        <div className="lista-notificaciones">
          <div className="notificaciones-header">
            <h4>Notificaciones</h4>
            <FiCheck
              className="icono-marcar-todo"
              title="Marcar todas como leídas"
              onClick={marcarTodasComoLeidas}
            />
          </div>

          {notificaciones.length === 0 ? (
            <p className="sin-notificaciones">No hay notificaciones nuevas</p>
          ) : (
            notificaciones.map((n) => (
              <div
                key={n.id}
                className={`notificacion-item ${n.leida ? "leida" : ""}`}
                onClick={() => marcarComoLeida(n.id)}
              >
                <span>{n.mensaje}</span>
                <FaTimes
                  className="icono-eliminar"
                  title="Eliminar notificación"
                  onClick={(e) => {
                    e.stopPropagation();
                    eliminarNotificacion(n.id);
                  }}
                />
              </div>
            ))
          )}

          <button
            className="btn-simular"
            onClick={() =>
              agregarNotificacion(
                "Te avisaremos por WhatsApp cuando tu pedido esté listo"
              )
            }
          >
            Simular nueva notificación
          </button>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default Notificaciones;

