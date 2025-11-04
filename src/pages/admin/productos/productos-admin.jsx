import { useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./productos-admin.css";

export default function ProductosAdmin() {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([
    {
      id: 1,
      imagen: "https://via.placeholder.com/60",
      nombre: "Hambuerguesa Clásica",
      stock: 12,
      precio: 10,
    },
    {
      id: 2,
      imagen: "https://via.placeholder.com/60",
      nombre: "Sandwich de Pollo",
      stock: 5,
      precio: 50,
    },
    {
      id: 3,
      imagen: "https://via.placeholder.com/60",
      nombre: "Ensalada César",
      stock: 5,
      precio: 10,
    },
  ]);

  const [productoAEliminar, setProductoAEliminar] = useState(null);

  const confirmarEliminacion = () => {
    setProductos((prev) =>
      prev.filter((producto) => producto.id !== productoAEliminar.id)
    );
    setProductoAEliminar(null);
  };

  const cancelarEliminacion = () => {
    setProductoAEliminar(null);
  };

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
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Stock</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id}>
                <td>
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="admin-productos-imagen"
                  />
                </td>
                <td>{producto.nombre}</td>
                <td>{producto.stock}</td>
                <td>${producto.precio.toFixed(2)}</td>
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
            ))}
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

