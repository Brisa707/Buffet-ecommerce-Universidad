import React, { useState, useEffect } from "react";
import { FaBell, FaTimes } from "react-icons/fa";
import { FiCheck } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./notificaciones.css";
import { API_URL } from "@config/api"; // API_URL = process.env.VITE_API_URL

const Notificaciones = () => {
  const [notificaciones, setNotificaciones] = useState([]);
  const [open, setOpen] = useState(false);

  const notificacionesNoLeidas = notificaciones.filter((n) => !n.leida).length;

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${API_URL}/notificaciones`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error en la respuesta del servidor");
        return res.json();
      })
      .then((data) => {
        setNotificaciones(data);

        // 🔒 Control persistente de toasts ya mostrados
        const yaMostrados = new Set(
          JSON.parse(sessionStorage.getItem("toastsMostrados") || "[]")
        );
        const nuevos = [];

        data
          .filter((n) => !n.leida)
          .forEach((n) => {
            const clave = n.mensaje.trim();
            if (!yaMostrados.has(clave)) {
              toast.info(clave, {
                position: "bottom-right",
                autoClose: 4000,
                theme: "colored",
              });
              yaMostrados.add(clave);
              nuevos.push(clave);
            }
          });

        sessionStorage.setItem(
          "toastsMostrados",
          JSON.stringify(Array.from(yaMostrados))
        );
      })
      .catch((err) => console.error("Error al cargar notificaciones:", err));
  }, []);

  const marcarComoLeida = (id) => {
    const token = localStorage.getItem("token");
    fetch(`${API_URL}/notificaciones/${id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    }).then(() =>
      setNotificaciones((prev) =>
        prev.map((n) => (n.id === id ? { ...n, leida: true } : n))
      )
    );
  };

  const marcarTodasComoLeidas = () => {
    notificaciones.forEach((n) => marcarComoLeida(n.id));
  };

  const eliminarNotificacion = (id) => {
    const token = localStorage.getItem("token");
    fetch(`${API_URL}/notificaciones/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }).then(() =>
      setNotificaciones((prev) => prev.filter((n) => n.id !== id))
    );
  };

  return (
    <div className="notificaciones-container">
      <div className="icono-campana" onClick={() => setOpen(!open)}>
        <FaBell className="nav-icon" />
        {notificacionesNoLeidas > 0 && (
          <span className="contador">{notificacionesNoLeidas}</span>
        )}
      </div>

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
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default Notificaciones;
