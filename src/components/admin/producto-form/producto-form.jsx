import "./producto-form.css";

export default function ProductoForm({ producto, setProducto, onSubmit, title }) {
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
          <select
            name="categoria"
            value={producto.categoria || ""}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar</option>
            <option value="bebidas">Bebidas</option>
            <option value="golosinas">Golosinas</option>
            <option value="sandwiches">Sandwiches</option>
            <option value="snacks">Snacks</option>
            <option value="postres">Postres</option>
          </select>
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

        {/* Nuevo campo Activo */}
        <label>
          Activo:
          <input
            name="activo"
            type="checkbox"
            checked={producto.activo ?? true}
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
    </div>
  );
}
