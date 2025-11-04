import { useEffect, useState } from "react";
import "./Dashboard.css";

export default  function Dashboard() {
  const [stats, setStats] = useState(null);
  const [ordersByStatus, setOrdersByStatus] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    // Simular datos como si vinieran del backend
    const simulatedStats = {
      totalOrders: 128,
      totalProducts: 42,
      totalUsers: 87,
      todayOrders: 6,
      todayRevenue: 15400.75,
    };

    const simulatedOrdersByStatus = [
      { _id: "Pendiente", count: 5 },
      { _id: "En preparación", count: 3 },
      { _id: "Entregado", count: 110 },
      { _id: "Cancelado", count: 10 },
    ];

    const simulatedTopProducts = [
      { _id: "1", nombre: "Hamburguesa Clásica", totalVendido: 120 },
      { _id: "2", nombre: "Empanada de Carne", totalVendido: 95 },
      { _id: "3", nombre: "Pizza Muzarella", totalVendido: 80 },
      { _id: "4", nombre: "Tarta de Verdura", totalVendido: 60 },
      { _id: "5", nombre: "Gaseosa 500ml", totalVendido: 55 },
    ];

    const simulatedRecentOrders = [
      {
        _id: "a1",
        usuario: { nombre: "Lucía Gómez", email: "lucia@example.com" },
        createdAt: new Date(),
      },
      {
        _id: "a2",
        usuario: { nombre: "Martín Pérez", email: "martin@example.com" },
        createdAt: new Date(),
      },
      {
        _id: "a3",
        usuario: { nombre: "Sofía Díaz", email: "sofia@example.com" },
        createdAt: new Date(),
      },
    ];

    setTimeout(() => {
      setStats(simulatedStats);
      setOrdersByStatus(simulatedOrdersByStatus);
      setTopProducts(simulatedTopProducts);
      setRecentOrders(simulatedRecentOrders);
    }, 500);
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
        <div className="stat-card">
          <h3>Pedidos totales</h3>
          <p>{stats.totalOrders}</p>
        </div>
        <div className="stat-card">
          <h3>Productos</h3>
          <p>{stats.totalProducts}</p>
        </div>
        <div className="stat-card">
          <h3>Usuarios</h3>
          <p>{stats.totalUsers}</p>
        </div>
        <div className="stat-card">
          <h3>Pedidos hoy</h3>
          <p>{stats.todayOrders}</p>
        </div>
        <div className="stat-card">
          <h3>Ingresos hoy</h3>
          <p>${stats.todayRevenue.toFixed(2)}</p>
        </div>
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
                  <strong>{product.nombre}</strong> — {product.totalVendido}{" "}
                  unidades
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

