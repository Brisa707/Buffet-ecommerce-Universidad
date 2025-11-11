import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_URL } from "@config/api";
import "./producto-detalle.css";
import { AiOutlineArrowLeft } from "react-icons/ai";

function ProductoDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const fetchProducto = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/productos/${id}`);
        if (!res.ok) throw new Error("Producto no encontrado");
        const data = await res.json();
        setProducto(data);
        setError("");
      } catch (err) {
        setError("No se pudo cargar el producto");
      } finally {
        setLoading(false);
      }
    };

    fetchProducto();
  }, [id]);

  const actualizarCantidad = (operacion) => {
    setCantidad((prev) => {
      const nueva = prev + operacion;
      return nueva > 0 ? nueva : 1;
    });
  };

  const handleAddToCart = () => {
    const token = localStorage.getItem("token");

    if (token) {
      fetch(`${API_URL}/carrito`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id_producto: producto.id, cantidad }),
      })
        .then(async (res) => {
          if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            throw new Error(err.mensaje || "Error agregando al carrito");
          }
          return res.json();
        })
        .then(() => {
          setMensaje(`${producto.nombre} añadido al carrito`);
          try {
            window.dispatchEvent(
              new CustomEvent("cartUpdated", { detail: { id: producto.id } })
            );
          } catch (e) {
            // noop
          }
          setTimeout(() => {
            setMensaje("");
            navigate("/carrito");
          }, 1500);
        })
        .catch((err) => {
          console.error("Error agregando al carrito:", err);
          setMensaje("Error al agregar al carrito");
          setTimeout(() => setMensaje(""), 2000);
        });
    } else {
      window.location.href = "/login";
    }
  };

  if (loading) return <p>Cargando producto...</p>;
  if (error || !producto) return <p>{error || "Producto no encontrado"}</p>;

  return (
    <div className="detalle-wrapper">
      <div className="detalle-card">
        <div className="detalle-header">
          <button
            className="detalle-back"
            type="button"
            onClick={() => navigate(-1)}
          >
            <AiOutlineArrowLeft size={20} />
          </button>
        </div>

        <img
          src={producto.imagen_url || "https://via.placeholder.com/300"}
          alt={producto.nombre}
          className="detalle-img"
        />

        <div className="detalle-info">
          <h2 className="detalle-nombre">{producto.nombre}</h2>
          <p className="detalle-descripcion">{producto.descripcion}</p>
          <p className="detalle-precio">${producto.precio}</p>
        </div>

        <div className="detalle-actions">
          <div className="detalle-cantidad">
            <button onClick={() => actualizarCantidad(-1)}>-</button>
            <span>{cantidad}</span>
            <button onClick={() => actualizarCantidad(1)}>+</button>
          </div>
          <button className="detalle-btn-add" onClick={handleAddToCart}>
            + Añadir
          </button>
        </div>

        {mensaje && <div className="mensaje-carrito">{mensaje}</div>}
      </div>
    </div>
  );
}

export default ProductoDetalle;
