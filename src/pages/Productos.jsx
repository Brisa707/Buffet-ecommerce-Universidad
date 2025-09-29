import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
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

  // Datos simulados
  const productosData = [
    { id: 1, nombre: "Café + 2 medialunas", precio: 2000, categoria: "bebidas", img: "/assets/cafe-medialunas.png" },
    { id: 2, nombre: "Sándwich de jamón y queso", precio: 2500, categoria: "sandwiches", img: "/assets/sandwich.png" },
    { id: 3, nombre: "Hamburguesa + papas", precio: 3500, categoria: "sandwiches", img: "/assets/hamburguesa-papas.png" },
    { id: 4, nombre: "Flan con dulce", precio: 1500, categoria: "postres", img: "/assets/flan.png" },
    { id: 5, nombre: "Café con leche", precio: 1800, categoria: "bebidas", img: "/assets/cafe.png" },
    { id: 6, nombre: "Brownie", precio: 1200, categoria: "postres", img: "/assets/brownie.png" },

    /* Segunda fila */
    { id: 7, nombre: "Té con limón", precio: 1700, categoria: "bebidas", img: "/assets/te.png" },
    { id: 8, nombre: "Pizza individual", precio: 3000, categoria: "snacks", img: "/assets/pizza.png" },
    { id: 9, nombre: "Ensalada fresca", precio: 2800, categoria: "snacks", img: "/assets/ensalada.png" },
    { id: 10, nombre: "Helado", precio: 1600, categoria: "postres", img: "/assets/helado.png" },
    { id: 11, nombre: "Chocolate", precio: 900, categoria: "golosinas", img: "/assets/chocolate.png" },
    { id: 12, nombre: "Caramelos surtidos", precio: 600, categoria: "golosinas", img: "/assets/caramelos.png" },
  ];

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("all");

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
    navigate("/carrito");
  };

  return (
    <>
      <Navbar />
      <div className="productos-wrapper">
        {/* Header */}
        <div className="productos-header">
          <button className="productos-back" onClick={() => navigate(-1)}>←</button>
          <h2 className="productos-titulo">Productos</h2>
        </div>

        {/* Categorías */}
        <div className="productos-categorias">
          {categorias.map((cat) => (
            <div
              key={cat.id}
              className={`categoria-card ${categoriaSeleccionada === cat.id ? "activa" : ""}`}
              onClick={() => setCategoriaSeleccionada(cat.id)}
            >
              {cat.nombre}
            </div>
          ))}
        </div>

        {/* Lista de productos */}
        <section>
          <div className="productos-grid">
            {productosFiltrados.map((prod) => (
              <div key={prod.id} className="producto-card">
                <img src={prod.img} onClick={() => navigate(`/producto/${prod.id}`)} />
                <h3>{prod.nombre}</h3>
                <p className="producto-precio">${prod.precio.toLocaleString()}</p>
                <button className="btn-add" onClick={() => handleAddToCart(prod)}>+ Añadir</button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

export default Productos;







