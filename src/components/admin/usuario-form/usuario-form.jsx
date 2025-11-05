import "./usuario-form.css";

export default function UsuarioForm({ usuario, setUsuario, onSubmit, title }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prev) => ({ ...prev, [name]: value }));
  };

  const esCreacion = title.toLowerCase().includes("crear");

  return (
    <div className="admin-usuarios-form-container">
      <form onSubmit={onSubmit} className="admin-usuarios-form">
        <h2>{title}</h2>

        <label>
          Nombre:
          <input
            name="nombre"
            value={usuario.nombre || ""}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email:
          <input
            name="email"
            type="email"
            value={usuario.email || ""}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Rol:
          <select
            name="rol"
            value={usuario.rol || ""}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar</option>
            <option value="user">Usuario</option>
            <option value="admin">Administrador</option>
          </select>
        </label>

        <label>
          Contraseña:
          <input
            name="password"
            type="password"
            value={usuario.password || ""}
            onChange={handleChange}
            placeholder={
              esCreacion
                ? "Ingresá una contraseña"
                : "Dejar en blanco para no cambiar"
            }
            required={esCreacion}
          />
        </label>

        <div className="admin-usuarios-form-acciones">
          <button type="submit">Guardar</button>
          <button type="button" onClick={() => window.history.back()}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
