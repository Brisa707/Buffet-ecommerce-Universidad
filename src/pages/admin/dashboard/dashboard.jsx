import { useEffect, useState } from "react";
import "./dashboard.css";
import { API_URL } from "@config/api";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [ordersByStatus, setOrdersByStatus] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${API_URL}/dashboard/admin`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setStats(data.stats);
        setOrdersByStatus(data.ordersByStatus);
        setTopProducts(data.topProducts);
        setRecentOrders(data.recentOrders);
      })
      .catch(err => {
        console.error("Error al cargar dashboard:", err);
      });
  }, []);

  if (!stats) {
    return (
      <div className="dashboard-loading">
        <p>Cargando panel de administración...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Panel de administración</h1>

      <div className="dashboard-stats">
        <div className="stat-card"><h3>Pedidos totales</h3><p>{stats.totalOrders}</p></div>
        <div className="stat-card"><h3>Productos</h3><p>{stats.totalProducts}</p></div>
        <div className="stat-card"><h3>Usuarios</h3><p>{stats.totalUsers}</p></div>
        <div className="stat-card"><h3>Pedidos hoy</h3><p>{stats.todayOrders}</p></div>
        <div className="stat-card"><h3>Ingresos hoy</h3><p>${stats.todayRevenue.toFixed(2)}</p></div>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-left">
          <div className="dashboard-section">
            <h2>Pedidos por estado</h2>
            <ul className="status-list">
              {ordersByStatus.map((statusItem) => (
                <li key={statusItem._id}>
                  <strong>{statusItem._id}:</strong> {statusItem.count}
                </li>
              ))}
            </ul>
          </div>

          <div className="dashboard-section">
            <h2>Top productos vendidos</h2>
            <ul className="top-products-list">
              {topProducts.map((product) => (
                <li key={product._id}>
                  <strong>{product.nombre}</strong> — {product.totalVendido} unidades
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="dashboard-section">
          <h2>Últimos pedidos</h2>
          <table className="recent-orders-table">
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Email</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order._id}>
                  <td>{order.usuario.nombre}</td>
                  <td>{order.usuario.email}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
