import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PedidoForm from "@admincomponents/pedido-form/pedido-form";
import { API_URL } from "@config/api";

export default function PedidoCrear() {
  const navigate = useNavigate();
  const [productosDisponibles, setProductos] = useState([]);
  const [usuariosDisponibles, setUsuarios] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar productos (endpoint público)
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await fetch(`${API_URL}/productos`);
        if (!res.ok) throw new Error("Error al obtener productos");
        const data = await res.json();
        setProductos(data.productos || data);
      } catch (err) {
        setError("No se pudieron cargar los productos");
      } finally {
        setLoading(false);
      }
    };
    fetchProductos();
  }, []);

  // Cargar usuarios (requiere token admin)
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token no disponible");

        const res = await fetch(`${API_URL}/usuarios`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          if (res.status === 401) {
            throw new Error("No autorizado. Iniciá sesión como admin.");
          }
          throw new Error("Error al obtener usuarios");
        }

        const data = await res.json();
        setUsuarios(data.usuarios || data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  // Enviar pedido al backend
  const handleSubmit = async (body) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/pedidos/admin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        throw new Error("Error al crear el pedido");
      }

      const data = await res.json();
      console.log("Pedido creado:", data);

      navigate("/admin/pedidos");
    } catch (error) {
      console.error(error);
      alert("Hubo un problema al crear el pedido");
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <PedidoForm
      onSubmit={handleSubmit}
      title="Crear Pedido"
      productosDisponibles={productosDisponibles}
      usuariosDisponibles={usuariosDisponibles}
    />
  );
}
