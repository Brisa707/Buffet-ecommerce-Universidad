import "./pedido-form.css";

export default function PedidoForm({
  onSubmit,
  title,
  productosDisponibles,
  usuariosDisponibles,
}) {
  return (
    <div className="admin-pedidos-form-container">
      <form onSubmit={onSubmit} className="admin-pedidos-form">
        <h2>{title}</h2>

        <label>
          Cliente:
          <select name="usuario" required>
            <option value="">Seleccionar</option>
            {usuariosDisponibles.map((usuario) => (
              <option key={usuario._id} value={usuario._id}>
                {usuario.nombre} ({usuario.email})
              </option>
            ))}
          </select>
        </label>

        <label>
          Método de pago:
          <select name="metodoPago" required>
            <option value="">Seleccionar</option>
            <option value="efectivo">Efectivo</option>
            <option value="billetera-virtual">Billetera virtual</option>
          </select>
        </label>

        <label>
          Estado:
          <select name="estado" required>
            <option value="">Seleccionar</option>
            <option value="pendiente">Pendiente</option>
            <option value="listo">Listo</option>
            <option value="entregado">Entregado</option>
            <option value="cancelado">Cancelado</option>
          </select>
        </label>

        <label>
          Notas:
          <textarea name="notas" />
        </label>

        <h3>Productos</h3>
        <div className="admin-pedidos-item">
          <select name="producto" required>
            <option value="">Seleccionar producto</option>
            {productosDisponibles.map((producto) => (
              <option key={producto._id} value={producto._id}>
                {producto.nombre}
              </option>
            ))}
          </select>
          <input
            type="number"
            name="cantidad"
            min="1"
            defaultValue="1"
            required
          />
        </div>

        <div className="admin-pedidos-form-acciones">
          <button type="submit">Guardar</button>
          <button type="button" onClick={() => window.history.back()}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
