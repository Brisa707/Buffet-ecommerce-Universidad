import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import "../styles/Productos.css";

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

  const productosData = [
    { id: 1, nombre: "Café + 2 medialunas", precio: 2000, categoria: "bebidas", img: "/assets/cafe-medialunas.png" },
    { id: 2, nombre: "Sándwich de jamón y queso", precio: 2500, categoria: "sandwiches", img: "/assets/sandwich.png" },
    { id: 3, nombre: "Hamburguesa + papas", precio: 3500, categoria: "sandwiches", img: "/assets/hamburguesa-papas.png" },
    { id: 4, nombre: "Flan con dulce", precio: 1500, categoria: "postres", img: "/assets/flan.png" },
    { id: 5, nombre: "Café con leche", precio: 1800, categoria: "bebidas", img: "/assets/cafe.png" },
    { id: 6, nombre: "Brownie", precio: 1200, categoria: "postres", img: "/assets/brownie.png" },
    { id: 7, nombre: "Té con limón", precio: 1700, categoria: "bebidas", img: "/assets/te.png" },
    { id: 8, nombre: "Pizza individual", precio: 3000, categoria: "snacks", img: "/assets/pizza.png" },
    { id: 9, nombre: "Ensalada fresca", precio: 2800, categoria: "snacks", img: "/assets/ensalada.png" },
    { id: 10, nombre: "Helado", precio: 1600, categoria: "postres", img: "/assets/helado.png" },
    { id: 11, nombre: "Chocolate", precio: 900, categoria: "golosinas", img: "/assets/chocolate.png" },
    { id: 12, nombre: "Caramelos surtidos", precio: 600, categoria: "golosinas", img: "/assets/caramelos.png" },
  ];

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("all");
  const [mensaje, setMensaje] = useState("");

  const productosFiltrados =
    categoriaSeleccionada === "all"
      ? productosData
      : productosData.filter((p) => p.categoria === categoriaSeleccionada);

  const handleAddToCart = (producto) => {
    const carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];
    const existe = carritoActual.find((p) => p.id === producto.id);

    if (existe) {
      existe.cantidad += 1;
    } else {
      carritoActual.push({ ...producto, cantidad: 1 });
    }

    localStorage.setItem("carrito", JSON.stringify(carritoActual));

    setMensaje(` ${producto.nombre} añadido al carrito`);
    setTimeout(() => setMensaje(""), 2000);
  };

  return (
    <>
      <Navbar />
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
            <a href="https://maps.google.com" target="_blank" rel="noreferrer">Ver en mapa</a>
          </div>
        </aside>

        {/* Centro */}
        <div className="productos-wrapper">
          <div className="productos-header">
            <button className="productos-back" onClick={() => navigate(-1)}>←</button>
            <h2 className="productos-titulo">Productos</h2>
          </div>

          {mensaje && <div className="mensaje-carrito">{mensaje}</div>}

          <div className="productos-categorias">
            {categorias.map((cat) => (
              <div
                key={cat.id}
                className={`categoria-card ${categoriaSeleccionada === cat.id ? "activa" : ""}`}
                onClick={() => setCategoriaSeleccionada(cat.id)} >
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
            <p>Si pediste <b>Hamburguesa</b>, añadí <b>Papas grandes</b></p>
            <p>Si pediste <b>Café con medialuna</b>, probá <b>Brownie</b></p>
          </div>
        </aside>
      </div>
      <Footer />
    </>
  );
}

export default Productos;


