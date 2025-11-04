import { useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./pedidos-admin.css";

export default function PedidosAdmin() {
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState([
    {
      id: 1,
      numeroPedido: "PED0001",
      usuario: { nombre: "Juan Pérez", email: "juanperez@example.com" },
      total: 4500,
      estado: "pendiente",
      metodoPago: "efectivo",
      creado: "2025-10-25",
    },
    {
      id: 2,
      numeroPedido: "PED0002",
      usuario: { nombre: "María Gómez", email: "mariagomez@example.com" },
      total: 3200,
      estado: "entregado",
      metodoPago: "tarjeta",
      creado: "2025-10-26",
    },
  ]);

  const [pedidoAEliminar, setPedidoAEliminar] = useState(null);

  const confirmarEliminacion = () => {
    setPedidos((prev) => prev.filter((pedido) => pedido.id !== pedidoAEliminar.id));
    setPedidoAEliminar(null);
  };

  const cancelarEliminacion = () => {
    setPedidoAEliminar(null);
  };

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

      <div className="admin-pedidos-tabla-wrapper">
        <table className="admin-pedidos-tabla">
          <thead>
            <tr>
              <th>N° Pedido</th>
              <th>Cliente</th>
              <th>Email</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Pago</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => (
              <tr key={pedido.id}>
                <td>{pedido.numeroPedido}</td>
                <td>{pedido.usuario.nombre}</td>
                <td>{pedido.usuario.email}</td>
                <td>${pedido.total}</td>
                <td>{pedido.estado}</td>
                <td>{pedido.metodoPago}</td>
                <td>{pedido.creado}</td>
                <td>
                  <button
                    className="admin-pedidos-boton editar"
                    onClick={() => navigate(`/admin/pedidos/editar/${pedido.id}`)}
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
              ¿Deseás eliminar el pedido <strong>{pedidoAEliminar.numeroPedido}</strong>?
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
