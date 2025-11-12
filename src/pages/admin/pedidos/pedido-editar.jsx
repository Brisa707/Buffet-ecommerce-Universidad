import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PedidoForm from "@admincomponents/pedido-form/pedido-form";
import { API_URL } from "@config/api";

export default function PedidoEditar() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [pedido, setPedido] = useState(null);
  const [productosDisponibles, setProductos] = useState([]);
  const [usuariosDisponibles, setUsuarios] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar pedido por ID
  useEffect(() => {
    const fetchPedido = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_URL}/pedidos/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Error al obtener pedido");
        const data = await res.json();
        setPedido(data);
      } catch (err) {
        setError("No se pudo cargar el pedido");
      } finally {
        setLoading(false);
      }
    };
    fetchPedido();
  }, [id]);

  // Cargar productos
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await fetch(`${API_URL}/productos`);
        if (!res.ok) throw new Error("Error al obtener productos");
        const data = await res.json();
        setProductos(data.productos || data);
      } catch (err) {
        setError("No se pudieron cargar los productos");
      }
    };
    fetchProductos();
  }, []);

  // Cargar usuarios
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_URL}/usuarios`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Error al obtener usuarios");
        const data = await res.json();
        setUsuarios(data.usuarios || data);
      } catch (err) {
        setError("No se pudieron cargar los usuarios");
      }
    };
    fetchUsuarios();
  }, []);

  // Enviar actualización al backend
  const handleSubmit = async (body) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/pedidos/admin/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Error al editar el pedido");

      const data = await res.json();
      console.log("Pedido actualizado:", data);

      navigate("/admin/pedidos");
    } catch (error) {
      console.error(error);
      alert("Hubo un problema al editar el pedido");
    }
  };

  if (loading) return <p>Cargando pedido...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!pedido) return <p>No se encontró el pedido</p>;

  return (
    <PedidoForm
      pedido={pedido}
      setPedido={setPedido}
      onSubmit={handleSubmit}
      title="Editar Pedido"
      productosDisponibles={productosDisponibles}
      usuariosDisponibles={usuariosDisponibles}
    />
  );
}
