import { useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { MdLocalGroceryStore } from "react-icons/md";
import { FiShoppingBag, FiLogOut } from "react-icons/fi";
import { FaUserCircle, FaBoxOpen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "@assets/Logo-buffet.png";
import "./admin-sidebar.css";

export default function AdminSidebar() {
  const navigate = useNavigate();
  const [sidebarVisible, setSidebarVisible] = useState(false);

  function handleLogout() {
    navigate("/");
    setSidebarVisible(false);
  }

  function toggleSidebar() {
    setSidebarVisible((prev) => !prev);
  }

  function goTo(path) {
    navigate(path);
    setSidebarVisible(false);
  }

  return (
    <>
      {/* ☰ Botón hamburguesa visible solo cuando sidebar está cerrado */}
      {!sidebarVisible && (
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          ☰
        </button>
      )}

      {/* Sidebar */}
      <div className={`sidebar ${sidebarVisible ? "visible" : ""}`}>
        {/* ✕ Botón de cierre dentro del sidebar */}
        <button className="sidebar-close" onClick={toggleSidebar}>
          ✕
        </button>

        <div className="sidebar-header">
          <img src={logo} alt="Logo Buffet UNaB" className="sidebar-logo" />
          <span className="sidebar-title">Buffet UNaB</span>
        </div>

        <ul className="sidebar-list">
          <li className="sidebar-item" onClick={() => goTo("/admin/")}>
            <AiFillHome className="sidebar-icon" />
            <span>Dashboard</span>
          </li>
          <li className="sidebar-item" onClick={() => goTo("/admin/productos")}>
            <MdLocalGroceryStore className="sidebar-icon" />
            <span>Productos</span>
          </li>
          <li className="sidebar-item" onClick={() => goTo("/admin/pedidos")}>
            <FiShoppingBag className="sidebar-icon" />
            <span>Pedidos</span>
          </li>
          <li className="sidebar-item" onClick={() => goTo("/admin/usuarios")}>
            <FaUserCircle className="sidebar-icon" />
            <span>Usuarios</span>
          </li>
          <li className="sidebar-item" onClick={() => goTo("/admin/qr")}>
            <FaBoxOpen className="sidebar-icon" />
            <span>Escanear QR</span>
          </li>
          <li className="sidebar-item" onClick={handleLogout}>
            <FiLogOut className="sidebar-icon" />
            <span>Cerrar sesión</span>
          </li>
        </ul>
      </div>
    </>
  );
}
