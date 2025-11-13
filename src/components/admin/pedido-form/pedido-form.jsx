import { useState, useEffect } from "react";
import "./pedido-form.css";

export default function PedidoForm({
  onSubmit,
  title,
  productosDisponibles = [],
  usuariosDisponibles = [],
  pedido = null,
}) {
  const [items, setItems] = useState([{ productoId: "", cantidad: 1 }]);
  const [usuarioId, setUsuarioId] = useState("");
  const [estado, setEstado] = useState("pendiente");

  // Inicializar con datos del pedido cuando se edita
  useEffect(() => {
    if (pedido && Array.isArray(pedido.productos)) {
      setUsuarioId(pedido.usuario_id || "");
      setEstado(pedido.estado?.toLowerCase() || "pendiente");
      setItems(
        pedido.productos.map((prod) => ({
          productoId: prod.producto_id,
          cantidad: prod.cantidad,
        }))
      );
    }
  }, [pedido]);

  const agregarItem = () => {
    setItems([...items, { productoId: "", cantidad: 1 }]);
  };

  const eliminarItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const actualizarItem = (index, campo, valor) => {
    const nuevosItems = [...items];
    nuevosItems[index][campo] = valor;
    setItems(nuevosItems);
  };

  function handleSubmit(e) {
    e.preventDefault();

    const estadoMap = {
      pendiente: "Pendiente",
      listo: "Listo",
      cancelado: "Cancelado",
      entregado: "Entregado",
    };

    const productos = items.map((item) => {
      const productoSeleccionado = productosDisponibles.find(
        (p) => String(p.id) === String(item.productoId)
      );
      const cantidad = parseInt(item.cantidad, 10);
      const subtotal = productoSeleccionado
        ? productoSeleccionado.precio * cantidad
        : 0;

      return {
        id_producto: item.productoId,
        cantidad,
        subtotal,
      };
    });

    const body = {
      usuario_id: usuarioId,
      estado: estadoMap[estado],
      productos,
    };

    onSubmit(body);
  }

  // Calcular total acumulado
  const total = items.reduce((acc, item) => {
    const productoSeleccionado = productosDisponibles.find(
      (p) => String(p.id) === String(item.productoId)
    );
    const cantidad = parseInt(item.cantidad, 10);
    const subtotal = productoSeleccionado
      ? productoSeleccionado.precio * cantidad
      : 0;
    return acc + subtotal;
  }, 0);

  return (
    <div className="admin-pedidos-form-container">
      <form onSubmit={handleSubmit} className="admin-pedidos-form">
        <h2>{title}</h2>

        <label>
          Cliente:
          <select
            name="usuario"
            value={usuarioId}
            onChange={(e) => setUsuarioId(e.target.value)}
            required
          >
            <option value="">Seleccionar</option>
            {(usuariosDisponibles || []).map((usuario) => (
              <option key={usuario.id} value={usuario.id}>
                {usuario.nombre} ({usuario.email})
              </option>
            ))}
          </select>
        </label>

        <label>
          Estado:
          <select
            name="estado"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            required
          >
            <option value="pendiente">Pendiente</option>
            <option value="listo">Listo</option>
            <option value="cancelado">Cancelado</option>
            <option value="entregado">Entregado</option>
          </select>
        </label>

        <h3>Productos</h3>
        {items.map((item, index) => (
          <div key={index} className="admin-pedidos-item">
            <select
              value={item.productoId}
              onChange={(e) =>
                actualizarItem(index, "productoId", e.target.value)
              }
              required
            >
              <option value="">Seleccionar producto</option>
              {(productosDisponibles || []).map((producto) => (
                <option key={producto.id} value={producto.id}>
                  {producto.nombre}
                </option>
              ))}
            </select>
            <input
              type="number"
              min="1"
              value={item.cantidad}
              onChange={(e) =>
                actualizarItem(index, "cantidad", e.target.value)
              }
              required
            />
            <button
              type="button"
              className="eliminar-item"
              onClick={() => eliminarItem(index)}
            >
              ×
            </button>
          </div>
        ))}

        <button
          type="button"
          className="agregar-producto"
          onClick={agregarItem}
        >
          + Agregar producto
        </button>

        <h4>Total: ${total.toFixed(2)}</h4>

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
