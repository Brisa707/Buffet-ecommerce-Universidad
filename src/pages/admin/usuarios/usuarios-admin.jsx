import { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { API_URL } from "@config/api";
import "./usuario-admin.css";

export default function UsuariosAdmin() {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioAEliminar, setUsuarioAEliminar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Estados para búsqueda y filtros
  const [busqueda, setBusqueda] = useState("");
  const [rolFiltro, setRolFiltro] = useState("all");

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token no disponible");

        const res = await fetch(`${API_URL}/usuarios`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          if (res.status === 401) {
            throw new Error("No autorizado. Iniciá sesión como admin.");
          }
          throw new Error("Error al obtener usuarios");
        }

        const data = await res.json();
        setUsuarios(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  const confirmarEliminacion = async () => {
    if (!usuarioAEliminar) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/usuarios/${usuarioAEliminar.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setUsuarios((prev) => prev.filter((u) => u.id !== usuarioAEliminar.id));
      } else {
        const errorData = await res.json();
        alert(errorData.mensaje || "No se pudo eliminar el usuario");
      }
    } catch (error) {
      alert("Error de red al intentar eliminar el usuario");
    }
    setUsuarioAEliminar(null);
  };

  const cancelarEliminacion = () => setUsuarioAEliminar(null);

  if (loading) return <p className="cargando">Cargando usuarios...</p>;
  if (error) return <p className="error">{error}</p>;

  // Aplicar búsqueda y filtros
  const usuariosFiltrados = usuarios
    .filter(
      (u) =>
        u.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        u.email.toLowerCase().includes(busqueda.toLowerCase())
    )
    .filter((u) => (rolFiltro === "all" ? true : u.rol === rolFiltro));

  return (
    <div className="admin-usuarios-container">
      <div className="admin-usuarios-header">
        <h1 className="admin-usuarios-titulo">Usuarios</h1>
        <button
          className="admin-usuarios-agregar"
          onClick={() => navigate("/admin/usuarios/agregar")}
        >
          <FaPlus /> Agregar usuario
        </button>
      </div>

      {/* Barra de búsqueda y filtros */}
      <div className="admin-filtros">
        <input
          type="text"
          placeholder="Buscar por nombre o email..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <select
          value={rolFiltro}
          onChange={(e) => setRolFiltro(e.target.value)}
        >
          <option value="all">Todos los roles</option>
          <option value="admin">admin</option>
          <option value="user">user</option>
        </select>
      </div>

      <div className="admin-usuarios-tabla-wrapper">
        <table className="admin-usuarios-tabla">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuariosFiltrados.length > 0 ? (
              usuariosFiltrados.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.email}</td>
                  <td>{usuario.rol}</td>
                  <td>
                    <button
                      className="admin-usuarios-boton editar"
                      onClick={() =>
                        navigate(`/admin/usuarios/editar/${usuario.id}`)
                      }
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="admin-usuarios-boton eliminar"
                      onClick={() => setUsuarioAEliminar(usuario)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No hay usuarios que coincidan con la búsqueda o filtros.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {usuarioAEliminar && (
        <div className="admin-popup-overlay">
          <div className="admin-popup">
            <p>
              ¿Deseás eliminar a <strong>{usuarioAEliminar.nombre}</strong>?
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
