import { useState, useEffect } from "react";
import { API_URL } from "@config/api";
import "./categorias-admin.css";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function CategoriasAdmin() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [categoriaEdit, setCategoriaEdit] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    activo: true,
  });

  useEffect(() => {
    cargarCategorias();
  }, []);

  const cargarCategorias = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/categorias/admin/todas`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setCategorias(data);
      }
    } catch (error) {
      console.error("Error al cargar categorías:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAbrirModal = (categoria = null) => {
    if (categoria) {
      setCategoriaEdit(categoria);
      setFormData({
        nombre: categoria.nombre,
        descripcion: categoria.descripcion || "",
        activo: categoria.activo,
      });
    } else {
      setCategoriaEdit(null);
      setFormData({
        nombre: "",
        descripcion: "",
        activo: true,
      });
    }
    setMostrarModal(true);
  };

  const handleCerrarModal = () => {
    setMostrarModal(false);
    setCategoriaEdit(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleGuardar = async () => {
    if (!formData.nombre.trim()) {
      alert("El nombre es requerido");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const url = categoriaEdit
        ? `${API_URL}/categorias/${categoriaEdit.id}`
        : `${API_URL}/categorias`;

      const method = categoriaEdit ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(
          categoriaEdit
            ? "Categoría actualizada exitosamente"
            : "Categoría creada exitosamente"
        );
        handleCerrarModal();
        cargarCategorias();
      } else {
        const error = await response.json();
        alert(error.mensaje || "Error al guardar");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al guardar la categoría");
    }
  };

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar esta categoría?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/categorias/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        alert("Categoría eliminada exitosamente");
        cargarCategorias();
      } else {
        const error = await response.json();
        alert(error.mensaje || "Error al eliminar");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al eliminar la categoría");
    }
  };

  if (loading) {
    return <div className="categorias-loading">Cargando categorías...</div>;
  }

  return (
    <div className="categorias-admin-container">
      <div className="categorias-header">
        <h1>Gestión de Categorías</h1>
        <button
          className="btn-nueva-categoria"
          onClick={() => handleAbrirModal()}
        >
          + Nueva Categoría
        </button>
      </div>

      <div className="categorias-tabla-container">
        <table className="categorias-tabla">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((categoria) => (
              <tr key={categoria.id}>
                <td>{categoria.nombre}</td>
                <td>{categoria.descripcion || "-"}</td>
                <td>
                  <span
                    className={`estado-badge ${
                      categoria.activo ? "activo" : "inactivo"
                    }`}
                  >
                    {categoria.activo ? "Activa" : "Inactiva"}
                  </span>
                </td>
                <td className="acciones-columna">
                  <button
                    className="btn-editar"
                    onClick={() => handleAbrirModal(categoria)}
                    title="Editar"
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="btn-eliminar"
                    onClick={() => handleEliminar(categoria.id)}
                    title="Eliminar"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {mostrarModal && (
        <div
          className="modal-overlay"
          onClick={handleCerrarModal}
        >
          <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
            <h2>{categoriaEdit ? "Editar Categoría" : "Nueva Categoría"}</h2>

            <label>
              Nombre:
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                placeholder="Nombre de la categoría"
              />
            </label>

            <label>
              Descripción:
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleInputChange}
                placeholder="Descripción de la categoría"
              />
            </label>

            <label>
              <input
                type="checkbox"
                name="activo"
                checked={formData.activo}
                onChange={handleInputChange}
              />
              Activa
            </label>

            <div className="modal-acciones">
              <button className="btn-guardar" onClick={handleGuardar}>
                Guardar
              </button>
              <button className="btn-cancelar" onClick={handleCerrarModal}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
