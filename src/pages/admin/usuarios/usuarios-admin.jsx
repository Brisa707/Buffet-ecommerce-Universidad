import { useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./usuario-admin.css";

export default function UsuariosAdmin() {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([
    {
      id: 1,
      nombre: "Juan Pérez",
      email: "juanperez@example.com",
      telefono: "1123456789",
      direccion: "Av. Corrientes 1234",
      role: "user",
    },
    {
      id: 2,
      nombre: "María Gómez",
      email: "mariagomez@example.com",
      telefono: "1134567890",
      direccion: "Calle San Martín 567",
      role: "admin",
    },
    {
      id: 3,
      nombre: "Carlos López",
      email: "carloslopez@example.com",
      telefono: "1145678901",
      direccion: "Av. Belgrano 890",
      role: "user",
    },
  ]);

  const [usuarioAEliminar, setUsuarioAEliminar] = useState(null);

  const confirmarEliminacion = () => {
    setUsuarios((prev) =>
      prev.filter((usuario) => usuario.id !== usuarioAEliminar.id)
    );
    setUsuarioAEliminar(null);
  };

  const cancelarEliminacion = () => {
    setUsuarioAEliminar(null);
  };

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

      <div className="admin-usuarios-tabla-wrapper">
        <table className="admin-usuarios-tabla">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Dirección</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.nombre}</td>
                <td>{usuario.email}</td>
                <td>{usuario.telefono}</td>
                <td>{usuario.direccion}</td>
                <td>{usuario.role}</td>
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
            ))}
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
