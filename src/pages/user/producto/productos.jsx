import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductCard from "@usercomponents/product-card/product-card";
import './productos.css';
import { AiOutlineArrowLeft } from "react-icons/ai";
import { API_URL } from "@config/api";

function Productos() {
  const navigate = useNavigate();

  const categorias = [
    { id: "all", nombre: "Todo" },
    { id: "bebidas", nombre: "Bebidas" },
    { id: "golosinas", nombre: "Golosinas" },
    { id: "sandwiches", nombre: "Sándwiches" },
    { id: "snacks", nombre: "Snacks" },
    { id: "postres", nombre: "Postres" },
  ];

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("all");
  const [productosData, setProductosData] = useState([]);
  const [mensaje, setMensaje] = useState("");

  // Traer productos del backend
  useEffect(() => {
    const fetchProductos = async () => {
      try {
  const res = await fetch(`${API_URL}/productos`);
        const data = await res.json();
        setProductosData(data);
      } catch (error) {
        console.error("Error al traer productos:", error);
      }
    };

    fetchProductos();
  }, []);

  const productosFiltrados =
    categoriaSeleccionada === "all"
      ? productosData
      : productosData.filter((p) => p.categoria === categoriaSeleccionada);

  const handleAddToCart = (producto) => {
    const token = localStorage.getItem('token');

    if (token) {
  fetch(`${API_URL}/carrito`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id_producto: producto.id, cantidad: 1 })
      })
      .then(async res => {
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.mensaje || 'Error agregando al carrito');
        }
        return res.json();
      })
      .then(() => {
        setMensaje(`${producto.nombre} añadido al carrito`);
        // Notificar a otros componentes (ej. Carrito abierto) que el carrito cambió
        try {
          window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { id: producto.id } }));
        } catch (e) {
          // noop
        }
        setTimeout(() => setMensaje(''), 2000);
      })
      .catch(err => {
        console.error('Error agregando al carrito:', err);
        setMensaje('Error al agregar al carrito');
        setTimeout(() => setMensaje(''), 2000);
      });
    } else {
      // No hay usuarios anónimos: redirigir a login
      window.location.href = '/login';
    }
  };

  return (
    <>
      <div className="productos-layout">
        {/* Columna izquierda */}
        <aside className="productos-sidebar left">
          <div className="sidebar-card">
            <h3>Promos del día</h3>
            <ul>
              <li>Café + medialuna — $2000</li>
              <li>Hamburguesa + papas — $3500</li>
            </ul>
            <button className="btn-promo">Paga con QR y obtené 10% OFF</button>
          </div>

          <div className="sidebar-card">
            <h3>Horarios de Atención</h3>
            <p>Lun a Vie: 08:00 – 22:00</p>
            <p>Sábados: 09:00 – 14:00</p>
          </div>

          <div className="sidebar-card">
            <h3>Contacto</h3>
            <p>📍 Blas Parera 132, Burzaco</p>
            <p>WhatsApp: +54 11 1234-5678</p>
            <a href="https://maps.google.com" target="_blank" rel="noreferrer">
              Ver en mapa
            </a>
          </div>
        </aside>

        {/* Centro */}
        <div className="productos-wrapper">
          <div className="productos-header">
            <button
              className="detalle-back"
              type="button"
              onClick={() => navigate(-1)}
            >
              <AiOutlineArrowLeft size={20} />
            </button>
            <h2 className="productos-titulo">Productos</h2>
          </div>

          {mensaje && <div className="mensaje-carrito">{mensaje}</div>}

          <div className="productos-categorias">
            {categorias.map((cat) => (
              <div
                key={cat.id}
                className={`categoria-card ${
                  categoriaSeleccionada === cat.id ? "activa" : ""
                }`}
                onClick={() => setCategoriaSeleccionada(cat.id)}
              >
                {cat.nombre}
              </div>
            ))}
          </div>

          <section>
            <div className="productos-grid">
              {productosFiltrados.map((prod) => (
                <ProductCard
                  key={prod.id}
                  producto={prod}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </section>
        </div>

        {/* Columna derecha */}
        <aside className="productos-sidebar right">
          <div className="sidebar-card">
            <h3>⭐ Top Ventas</h3>
            <p>Hamburguesa + papas — $3500</p>
            <p>Café + 2 medialunas — $2000</p>
            <button className="btn-promo">+ Añadir</button>
          </div>

          <div className="sidebar-card">
            <h3>🆕 Novedades</h3>
            <p>Ensalada fresca</p>
            <p>Pizza individual</p>
          </div>

          <div className="sidebar-card">
            <h3> Oferta Relámpago</h3>
            <p>Brownie — 20% OFF</p>
            <small>Hasta las 18:00</small>
            <button className="btn-promo">Aprovechar</button>
          </div>

          <div className="sidebar-card">
            <h3> Te recomendamos</h3>
            <p>
              Si pediste <b>Hamburguesa</b>, añadí <b>Papas grandes</b>
            </p>
            <p>
              Si pediste <b>Café con medialuna</b>, probá <b>Brownie</b>
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}

export default Productos;