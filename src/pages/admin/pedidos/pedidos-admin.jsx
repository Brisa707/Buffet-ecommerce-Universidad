import { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaBan  } from "react-icons/fa"; 
import { useNavigate } from "react-router-dom";
import { API_URL } from "@config/api";
import "./pedidos-admin.css";

export default function PedidosAdmin() {
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState([]);
  const [pedidoAEliminar, setPedidoAEliminar] = useState(null);

  // Estados para búsqueda y filtros
  const [busqueda, setBusqueda] = useState("");
  const [estadoFiltro, setEstadoFiltro] = useState("all");

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
    fetch(`${API_URL}/pedidos/${pedidoAEliminar.id}/cancelar`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ estado: "Cancelado" }),
    })
      .then((res) => res.json())
      .then(() => {
        setPedidos((prev) =>
          prev.map((pedido) =>
            pedido.id === pedidoAEliminar.id
              ? { ...pedido, estado: "Cancelado" }
              : pedido
          )
        );
        setPedidoAEliminar(null);
      })
      .catch(() => console.error("Error al cancelar pedido"));
  };

  const cancelarEliminacion = () => setPedidoAEliminar(null);

  // Aplicar búsqueda y filtros
  const pedidosFiltrados = pedidos
    .filter((p) =>
      p.numero_pedido.toString().includes(busqueda) ||
      p.usuario_id.toString().includes(busqueda)
    )
    .filter((p) =>
      estadoFiltro === "all"
        ? true
        : p.estado?.toLowerCase() === estadoFiltro.toLowerCase()
    );

  return (
    <div className="admin-pedidos-container">
      <div className="admin-pedidos-header">
        <h1 className="admin-pedidos-titulo">Pedidos</h1>
        <button
          className="admin-pedidos-agregar"
          onClick={() => navigate("/admin/pedidos/agregar")}
        >
          <FaPlus /> Agregar pedido
        </button>
      </div>

      {/* Barra de búsqueda y filtros */}
      <div className="admin-filtros">
        <input
          type="text"
          placeholder="Buscar por N° pedido o usuario..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <select
          value={estadoFiltro}
          onChange={(e) => setEstadoFiltro(e.target.value)}
        >
          <option value="all">Todos los estados</option>
          <option value="pendiente">Pendiente</option>
          <option value="enviado">Enviado</option>
          <option value="cancelado">Cancelado</option>
        </select>
      </div>

      {/* Tabla de pedidos */}
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
            {pedidosFiltrados.length > 0 ? (
              pedidosFiltrados.map((pedido) => (
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
                      <FaBan  />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No hay pedidos que coincidan con la búsqueda o filtros.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {pedidoAEliminar && (
        <div className="admin-popup-overlay">
          <div className="admin-popup">
            <p>
              ¿Deseás cancelar el pedido{" "}
              <strong>{pedidoAEliminar.numero_pedido}</strong>?
            </p>
            <div className="admin-popup-acciones">
              <button className="confirmar" onClick={confirmarEliminacion}>
                Cancelar pedido
              </button>
              <button className="cancelar" onClick={cancelarEliminacion}>
                Volver
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
