import { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { API_URL } from "@config/api";
import "./productos-admin.css";

export default function ProductosAdmin() {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [productoAEliminar, setProductoAEliminar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  const [busqueda, setBusqueda] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("all");
  const [filtros, setFiltros] = useState({
    stockBajo: false,
    maxPrecio: 10000,
  });

  // Cargar productos activos
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await fetch(`${API_URL}/productos`);
        if (!res.ok) throw new Error("Error al obtener productos");
        const data = await res.json();
        setProductos(data);
      } catch (err) {
        setError("No se pudieron cargar los productos");
      } finally {
        setLoading(false);
      }
    };
    fetchProductos();
  }, []);

  // Confirmar eliminación lógica
  const confirmarEliminacion = async () => {
    if (!productoAEliminar) return;
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Debes iniciar sesión como administrador");
      return;
    }
    try {
      const res = await fetch(`${API_URL}/productos/${productoAEliminar.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        setProductos((prev) =>
          prev.filter((p) => p.id !== productoAEliminar.id)
        );
        setMensaje("Producto eliminado correctamente");
        setTimeout(() => setMensaje(""), 2000);
      } else {
        const err = await res.json().catch(() => ({}));
        setError(err.mensaje || "Error al eliminar el producto");
      }
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      setError("Error al eliminar producto");
    }
    setProductoAEliminar(null);
  };

  const cancelarEliminacion = () => setProductoAEliminar(null);

  if (loading) return <p className="cargando">Cargando productos...</p>;
  if (error) return <p className="error">{error}</p>;

  // Búsqueda y filtros
  const productosFiltrados = productos
    .filter((p) =>
      p.nombre.toLowerCase().includes(busqueda.toLowerCase())
    )
    .filter((p) =>
      categoriaFiltro === "all" ? true : p.categoria === categoriaFiltro
    )
    .filter((p) => p.precio <= filtros.maxPrecio)
    .filter((p) => (filtros.stockBajo ? p.stock < 10 : true));

  return (
    <div className="admin-productos-container">
      <div className="admin-productos-header">
        <h1 className="admin-productos-titulo">Productos</h1>
        <button
          className="admin-productos-agregar"
          onClick={() => navigate("/admin/productos/agregar")}
        >
          <FaPlus /> Agregar producto
        </button>
      </div>

      {mensaje && <div className="mensaje-exito">{mensaje}</div>}

      {/* Barra de búsqueda y filtros */}
      <div className="admin-filtros">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <select
          value={categoriaFiltro}
          onChange={(e) => setCategoriaFiltro(e.target.value)}
        >
          <option value="all">Todas las categorías</option>
          <option value="bebidas">Bebidas</option>
          <option value="golosinas">Golosinas</option>
          <option value="sandwiches">Sándwiches</option>
          <option value="snacks">Snacks</option>
          <option value="postres">Postres</option>
        </select>

        <label>
          <input
            type="checkbox"
            checked={filtros.stockBajo}
            onChange={(e) =>
              setFiltros((prev) => ({ ...prev, stockBajo: e.target.checked }))
            }
          />
          Stock bajo
        </label>
      </div>

      <div className="admin-productos-tabla-wrapper">
        <table className="admin-productos-tabla">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Categoría</th>
              <th>Stock</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productosFiltrados.length > 0 ? (
              productosFiltrados.map((producto) => (
                <tr key={producto.id}>
                  <td>{producto.nombre}</td>
                  <td>{producto.descripcion || "—"}</td>
                  <td>{producto.categoria || "—"}</td>
                  <td>{producto.stock}</td>
                  <td>${Number(producto.precio).toFixed(2)}</td>
                  <td>
                    <button
                      className="admin-productos-boton editar"
                      onClick={() =>
                        navigate(`/admin/productos/editar/${producto.id}`)
                      }
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="admin-productos-boton eliminar"
                      onClick={() => setProductoAEliminar(producto)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No hay productos que coincidan con la búsqueda o filtros.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {productoAEliminar && (
        <div className="admin-popup-overlay">
          <div className="admin-popup">
            <p>
              ¿Deseás eliminar <strong>{productoAEliminar.nombre}</strong>?
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
