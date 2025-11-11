import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@usercomponents/navbar/navbar";
import { AiOutlineClose } from "react-icons/ai";
import "./carrito.css";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { API_URL } from "@config/api";

function Carrito({ onClose }) {
  const navigate = useNavigate();
  const [step, setStep] = useState("carrito"); // "carrito", "confirmar", "gracias"

  const [carrito, setCarrito] = useState([]);
  const [numeroPedido, setNumeroPedido] = useState(null);

  // Cargar carrito desde backend (se requiere token)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    fetch(`${API_URL}/carrito`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("No se pudo obtener el carrito");
        return res.json();
      })
      .then((data) => {
        const mapped = data.map((item) => ({
          id: item.id_producto,
          nombre: item.nombre,
          precio: item.precio,
          cantidad: item.cantidad,
          imagen_url: item.imagen_url || "https://via.placeholder.com/80",
        }));
        setCarrito(mapped);
      })
      .catch((err) => console.error("Error cargando carrito:", err));

    // Listener para actualizaciones del carrito desde otras pestañas/componentes
    const onCartUpdated = () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      fetch(`${API_URL}/carrito`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(async (res) => {
          if (!res.ok) throw new Error("No se pudo obtener el carrito");
          return res.json();
        })
        .then((data) => {
          const mapped = data.map((item) => ({
            id: item.id_producto,
            nombre: item.nombre,
            precio: item.precio,
            cantidad: item.cantidad,
            imagen_url: item.imagen_url || "https://via.placeholder.com/80",
          }));
          setCarrito(mapped);
        })
        .catch((err) => console.error("Error cargando carrito (evento):", err));
    };

    window.addEventListener("cartUpdated", onCartUpdated);
    return () => window.removeEventListener("cartUpdated", onCartUpdated);
  }, []);

  const actualizarCantidad = (id, operacion) => {
    const token = localStorage.getItem("token");
    if (token) {
      const item = carrito.find((i) => i.id === id);
      if (!item) return;
      const nuevaCantidad = item.cantidad + operacion;

      if (nuevaCantidad <= 0) {
        // eliminar en backend
        fetch(`${API_URL}/carrito/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        })
          .then(async (res) => {
            if (!res.ok) throw new Error("Error eliminando");
            setCarrito((prev) => prev.filter((p) => p.id !== id));
          })
          .catch((err) => console.error("Error eliminando del carrito:", err));
        return;
      }

      fetch(`${API_URL}/carrito/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ cantidad: nuevaCantidad }),
      })
        .then(async (res) => {
          if (!res.ok) {
            const e = await res.json().catch(() => ({}));
            throw new Error(e.mensaje || "Error actualizando cantidad");
          }
          setCarrito((prev) =>
            prev.map((p) =>
              p.id === id ? { ...p, cantidad: nuevaCantidad } : p
            )
          );
          try {
            window.dispatchEvent(new CustomEvent("cartUpdated"));
          } catch (e) {}
        })
        .catch((err) => console.error("Error actualizando cantidad:", err));
    } else {
      setCarrito((prev) => {
        const updated = prev
          .map((item) =>
            item.id === id
              ? { ...item, cantidad: item.cantidad + operacion }
              : item
          )
          .filter((item) => item.cantidad > 0);
        localStorage.setItem("carrito", JSON.stringify(updated));
        return updated;
      });
    }
  };

  const eliminarProducto = (id) => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${API_URL}/carrito/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(async (res) => {
          if (!res.ok) {
            const e = await res.json().catch(() => ({}));
            throw new Error(e.mensaje || "Error eliminando");
          }
          setCarrito((prev) => prev.filter((item) => item.id !== id));
          try {
            window.dispatchEvent(new CustomEvent("cartUpdated"));
          } catch (e) {}
        })
        .catch((err) => console.error("Error eliminando del carrito:", err));
    } else {
      setCarrito((prev) => {
        const updated = prev.filter((item) => item.id !== id);
        localStorage.setItem("carrito", JSON.stringify(updated));
        try {
          window.dispatchEvent(new CustomEvent("cartUpdated"));
        } catch (e) {}
        return updated;
      });
    }
  };

  const total = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  // Generar pedido: intenta llamar al backend, si falla crea pedido local en localStorage
  const handleConfirmarPedido = async () => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    try {
      const res = await fetch(`${API_URL}/pedidos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({}),
      });

      if (!res.ok) {
        const e = await res.json().catch(() => ({}));
        throw new Error(e.mensaje || "Error al crear el pedido en backend");
      }

      const data = await res.json().catch(() => ({}));
      const numero = data.numero_pedido || `BACK-${Date.now()}`;
      // Limpiar carrito local y notificar
      localStorage.removeItem("carrito");
      setCarrito([]);
      try {
        window.dispatchEvent(new CustomEvent("cartUpdated"));
      } catch (e) {}
      // Mostrar pantalla de gracias con número de pedido
      setNumeroPedido(numero);
      setStep("gracias");
    } catch (err) {
      console.error("Error creando pedido en backend:", err);
      // Mostrar error al usuario
      alert(
        "No se pudo generar el pedido. Intenta de nuevo o contacta al administrador."
      );
    }
  };

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
                <button
                  className="carrito-back"
                  type="button"
                  onClick={() => navigate(-1)}
                >
                  <AiOutlineArrowLeft size={20} />
                </button>
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
                  <button
                    className="btn-checkout vacio-boton"
                    onClick={() => navigate("/productos")}
                  >
                    Ver productos
                  </button>
                </div>
              ) : (
                <>
                  {carrito.map((item) => (
                    <div className="carrito-item" key={item.id}>
                      <button
                        className="btn-remove"
                        onClick={() => eliminarProducto(item.id)}
                      >
                        ✕
                      </button>
                      <img
                        src={
                          item.imagen_url || "https://via.placeholder.com/80"
                        }
                        alt={item.nombre}
                      />
                      <div className="carrito-info">
                        <p className="carrito-nombre">{item.nombre}</p>
                        <div className="carrito-precio-cantidad">
                          <p className="carrito-precio">${item.precio}</p>
                          <div className="carrito-cantidad">
                            <button
                              onClick={() => actualizarCantidad(item.id, -1)}
                            >
                              -
                            </button>
                            <span>{item.cantidad}</span>
                            <button
                              onClick={() => actualizarCantidad(item.id, 1)}
                            >
                              +
                            </button>
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
                    <button
                      className="btn-checkout"
                      onClick={() => setStep("confirmar")}
                    >
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
                <button
                  className="carrito-back"
                  onClick={() => setStep("carrito")}
                >
                  <AiOutlineArrowLeft size={20} />
                </button>

                <button
                  className="carrito-back-desktop"
                  onClick={() => setStep("carrito")}
                >
                  <AiOutlineArrowLeft size={20} />
                </button>
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
                    <button
                      className="btn-remove"
                      onClick={() => eliminarProducto(item.id)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              <div className="confirmar-total">
                <p>Total a pagar:</p>
                <p>${total}</p>
              </div>

              <button className="btn-checkout" onClick={handleConfirmarPedido}>
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
                {numeroPedido && (
                  <>
                    <br />
                    Pedido creado: <strong>{numeroPedido}</strong>
                  </>
                )}
                <br />
                Te avisaremos cuando esté listo.
              </p>
              <div className="gracias-botones">
                <button
                  className="btn-checkout"
                  onClick={() => navigate("/home")}
                >
                  Volver a inicio
                </button>
                <button
                  className="btn-checkout"
                  onClick={() => navigate("/pedidos")}
                >
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
