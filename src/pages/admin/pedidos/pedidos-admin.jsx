import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { API_URL } from "@config/api";
import "./pedidos-admin.css";

export default function PedidosAdmin() {
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState([]);
  const [pedidoAEliminar, setPedidoAEliminar] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${API_URL}/pedidos`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setPedidos(data))
      .catch(() => console.error("Error al cargar pedidos"));
  }, []);

  const confirmarEliminacion = () => {
    const token = localStorage.getItem("token");

    fetch(`${API_URL}/pedidos/${pedidoAEliminar.id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(() => {
        setPedidos((prev) =>
          prev.filter((pedido) => pedido.id !== pedidoAEliminar.id)
        );
        setPedidoAEliminar(null);
      })
      .catch(() => console.error("Error al eliminar pedido"));
  };

  const cancelarEliminacion = () => {
    setPedidoAEliminar(null);
  };

  return (
    <div className="admin-pedidos-container">
      <div className="admin-pedidos-header">
        <h1 className="admin-pedidos-titulo">Pedidos</h1>
      </div>

      <div className="admin-pedidos-tabla-wrapper">
        <table className="admin-pedidos-tabla">
          <thead>
            <tr>
              <th>N° Pedido</th>
              <th>ID Usuario</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => (
              <tr key={pedido.id}>
                <td>{pedido.numero_pedido}</td>
                <td>{pedido.usuario_id}</td>
                <td>
                  $
                  {Number(pedido.total || 0).toLocaleString("es-AR", {
                    minimumFractionDigits: 2,
                  })}
                </td>
                <td>{pedido.estado}</td>
                <td>
                  {pedido.fecha
                    ? new Date(pedido.fecha).toLocaleDateString()
                    : "—"}
                </td>
                <td>
                  <button
                    className="admin-pedidos-boton editar"
                    onClick={() =>
                      navigate(`/admin/pedidos/editar/${pedido.id}`)
                    }
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="admin-pedidos-boton eliminar"
                    onClick={() => setPedidoAEliminar(pedido)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pedidoAEliminar && (
        <div className="admin-popup-overlay">
          <div className="admin-popup">
            <p>
              ¿Deseás eliminar el pedido{" "}
              <strong>{pedidoAEliminar.numero_pedido}</strong>?
            </p>
            <div className="admin-popup-acciones">
              <button className="confirmar" onClick={confirmarEliminacion}>
                Eliminar
              </button>
              <button className="cancelar" onClick={cancelarEliminacion}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
