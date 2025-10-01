import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { AiOutlineClose } from "react-icons/ai";
import "../styles/Carrito.css";

function Carrito({ onClose }) {
  const navigate = useNavigate();
  const [step, setStep] = useState("carrito"); // "carrito", "confirmar", "gracias"

// Datos simulados
const [carrito, setCarrito] = useState([
    { id: 1, nombre: "Café + 2 medialunas", precio: 2000, img: "https://via.placeholder.com/80", cantidad: 1 },
    { id: 2, nombre: "Sándwich de jamón y queso", precio: 2500, img: "https://via.placeholder.com/80", cantidad: 1 },
    { id: 3, nombre: "Hamburguesa + papas", precio: 3500, img: "https://via.placeholder.com/80", cantidad: 1 }
  ]);

const actualizarCantidad = (id, operacion) => {
    setCarrito((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, cantidad: item.cantidad + operacion }
            : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };

  const eliminarProducto = (id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  };

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  return (
    <>
      {/* Navbar solo para mobile */}
      <div className="mobile-only">
        <Navbar />
      </div>

      <div className="carrito-container">
        <div className="carrito-card">
          <button className="carrito-close-desktop" onClick={onClose}>
            <AiOutlineClose size={22} />
          </button>

          {/* Carrito */}
          {step === "carrito" && (
            <>
              <div className="carrito-header">
                {/* Flecha solo mobile */}
                <button className="carrito-back" onClick={() => navigate(-1)}>←</button>
                <h2 className="carrito-titulo">Carrito</h2>
              </div>

              {carrito.length === 0 ? (
                <div className="carrito-vacio-wrapper">
                  <div className="carrito-vacio-content">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="carrito-vacio-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="9" cy="21" r="1"></circle>
                      <circle cx="20" cy="21" r="1"></circle>
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                    <p className="carrito-vacio-texto">Tu carrito está vacío</p>
                  </div>
                  <button className="btn-checkout vacio-boton" onClick={() => navigate("/productos")}>
                    Ver productos
                  </button>
                </div>
              ) : (
                <>
                  {carrito.map((item) => (
                    <div className="carrito-item" key={item.id}>
                      <button className="btn-remove" onClick={() => eliminarProducto(item.id)}>✕</button>
                      <img src={item.img} />
                      <div className="carrito-info">
                        <p className="carrito-nombre">{item.nombre}</p>
                        <div className="carrito-precio-cantidad">
                          <p className="carrito-precio">${item.precio}</p>
                          <div className="carrito-cantidad">
                            <button onClick={() => actualizarCantidad(item.id, -1)}>-</button>
                            <span>{item.cantidad}</span>
                            <button onClick={() => actualizarCantidad(item.id, 1)}>+</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="carrito-total-container">
                    <p className="carrito-total-texto">Total:</p>
                    <p className="carrito-total-precio">${total}</p>
                  </div>

                  <div className="carrito-botones">
                    <button className="btn-checkout" onClick={() => setStep("confirmar")}>
                      Finalizar Compra
                    </button>
                  </div>
                </>
              )}
            </>
          )}

          {/* Confirmar */}
          {step === "confirmar" && (
            <>
              <div className="carrito-header">
                <button className="carrito-back" onClick={() => setStep("carrito")}>←</button>
                <button className="carrito-back-desktop"  onClick={() => setStep("carrito")}>←</button>
                <h2 className="carrito-titulo">Confirmar Compra</h2>
              </div>

              <p className="confirmar-texto">
                Revisa tu pedido antes de finalizar la compra.
              </p>

              <div className="confirmar-items">
                {carrito.map((item) => (
                  <div className="confirmar-card" key={item.id}>
                    <span>{item.nombre}</span>
                    <span>${item.precio}</span>
                    <button className="btn-remove" onClick={() => eliminarProducto(item.id)}>✕</button>
                  </div>
                ))}
              </div>

              <div className="confirmar-total">
                <p>Total a pagar:</p>
                <p>${total}</p>
              </div>

              <button className="btn-checkout" onClick={() => setStep("gracias")}>
                Confirmar Pedido
              </button>
            </>
          )}

          {/* Gracias */}
          {step === "gracias" && (
            <div className="gracias-content-nuevo">
              <h2 className="gracias-titulo">¡Gracias por tu compra!</h2>
              <p className="gracias-texto">
                Tu pedido está siendo procesado.
                Te avisaremos cuando esté listo.
              </p>
              <div className="gracias-botones">
                <button className="btn-checkout" onClick={() => navigate("/home")}>
                  Volver a inicio
                </button>
                <button className="btn-checkout" onClick={() => navigate("/pedidos")}>
                  Ver pedido
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Carrito;