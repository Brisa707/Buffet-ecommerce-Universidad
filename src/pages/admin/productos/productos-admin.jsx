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

  // Cargar productos desde el backend
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

  // Confirmar eliminación
  const confirmarEliminacion = async () => {
    if (!productoAEliminar) return;

    try {
      const res = await fetch(`${API_URL}/productos/${productoAEliminar.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setProductos((prev) =>
          prev.filter((p) => p.id !== productoAEliminar.id)
        );
      } else {
        console.error("Error al eliminar el producto");
      }
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }

    setProductoAEliminar(null);
  };

  const cancelarEliminacion = () => setProductoAEliminar(null);

  if (loading) {
    return <p className="cargando">Cargando productos...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

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

      <div className="admin-productos-tabla-wrapper">
        <table className="admin-productos-tabla">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Stock</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.length > 0 ? (
              productos.map((producto) => (
                <tr key={producto.id}>
                  <td>{producto.nombre}</td>
                  <td>{producto.descripcion || "—"}</td>
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
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No hay productos disponibles.
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
