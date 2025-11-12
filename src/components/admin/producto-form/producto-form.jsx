import { useState, useEffect } from "react";
import "./producto-form.css";
import { API_URL } from "@config/api";

export default function ProductoForm({ producto, setProducto, onSubmit, title }) {
  const [categorias, setCategorias] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevaCategoria, setNuevaCategoria] = useState("");
  const [descripcionCategoria, setDescripcionCategoria] = useState("");
  const [loading, setLoading] = useState(false);

  // Cargar categorías al montar el componente
  useEffect(() => {
    cargarCategorias();
  }, []);

  const cargarCategorias = async () => {
    try {
      const response = await fetch(`${API_URL}/categorias`);
      if (response.ok) {
        const data = await response.json();
        setCategorias(data);
      }
    } catch (error) {
      console.error("Error al cargar categorías:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    let val;

    if (type === "file") {
      val = files[0];
    } else if (type === "checkbox") {
      val = checked;
    } else {
      val = value;
    }

    setProducto((prev) => ({ ...prev, [name]: val }));
  };

  const handleAgregarCategoria = async () => {
    if (!nuevaCategoria.trim()) {
      alert("Por favor ingresa el nombre de la categoría");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/categorias`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nombre: nuevaCategoria.trim(),
          descripcion: descripcionCategoria.trim(),
        }),
      });

      if (response.ok) {
        const nuevaCat = await response.json();
        setCategorias([...categorias, nuevaCat]);
        // Guardar el id de la nueva categoría en el producto
        setProducto((prev) => ({ ...prev, categoria_id: nuevaCat.id }));
        setMostrarModal(false);
        setNuevaCategoria("");
        setDescripcionCategoria("");
        alert("Categoría agregada exitosamente");
      } else {
        const error = await response.json();
        alert(error.mensaje || "Error al agregar categoría");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al agregar categoría");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-productos-form-container">
      <form onSubmit={onSubmit} className="admin-productos-form">
        <h2>{title}</h2>

        <label>
          Nombre:
          <input
            name="nombre"
            value={producto.nombre || ""}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Descripción:
          <input
            name="descripcion"
            value={producto.descripcion || ""}
            onChange={handleChange}
          />
        </label>

        <label>
          Precio:
          <input
            name="precio"
            type="number"
            step="0.01"
            value={producto.precio || ""}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Categoría:
          <div className="categoria-select-container">
            <select
              name="categoria_id"
              value={producto.categoria_id || ""}
              onChange={handleChange}
              required
            >
              <option value="">Seleccionar</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nombre}
                </option>
              ))}
            </select>
            <button
              type="button"
              className="btn-agregar-categoria"
              onClick={() => setMostrarModal(true)}
              title="Agregar nueva categoría"
            >
              +
            </button>
          </div>
        </label>

        <label>
          Stock:
          <input
            name="stock"
            type="number"
            value={producto.stock || ""}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Imagen:
          <input
            name="imagen"
            type="file"
            accept="image/*"
            onChange={handleChange}
          />
        </label>

        <label>
          Activo:
          <input
            name="activo"
            type="checkbox"
            checked={producto.activo ?? true}
            onChange={handleChange}
          />
        </label>

        <label>
          Promoción:
          <input
            name="promocion"
            type="checkbox"
            checked={producto.promocion ?? false}
            onChange={handleChange}
          />
        </label>

        <div className="admin-productos-form-acciones">
          <button type="submit">Guardar</button>
          <button type="button" onClick={() => window.history.back()}>
            Cancelar
          </button>
        </div>
      </form>

      {/* Modal para agregar categoría */}
      {mostrarModal && (
        <div
          className="modal-overlay"
          onClick={() => !loading && setMostrarModal(false)}
        >
          <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
            <h3>Agregar Nueva Categoría</h3>

            <label>
              Nombre de la categoría:
              <input
                type="text"
                value={nuevaCategoria}
                onChange={(e) => setNuevaCategoria(e.target.value)}
                placeholder="Ej: Bebidas"
                disabled={loading}
              />
            </label>

            <label>
              Descripción (opcional):
              <textarea
                value={descripcionCategoria}
                onChange={(e) => setDescripcionCategoria(e.target.value)}
                placeholder="Descripción de la categoría"
                disabled={loading}
              />
            </label>

            <div className="modal-acciones">
              <button
                type="button"
                className="btn-guardar"
                onClick={handleAgregarCategoria}
                disabled={loading}
              >
                {loading ? "Guardando..." : "Guardar"}
              </button>
              <button
                type="button"
                className="btn-cancelar"
                onClick={() => {
                  setMostrarModal(false);
                  setNuevaCategoria("");
                  setDescripcionCategoria("");
                }}
                disabled={loading}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
