import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PedidoForm from "@admincomponents/pedido-form/pedido-form";

export default function PedidoEditar() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [pedido, setPedido] = useState(null);

  useEffect(() => {
    // Simulación de fetch
    const pedidosMock = [
      {
        id: "1",
        numeroPedido: "PED0001",
        usuario: "123",
        metodoPago: "efectivo",
        estado: "pendiente",
        notas: "Entregar sin cebolla",
        items: [
          { producto: "abc", cantidad: 2 },
        ],
      },
    ];

    const pedidoEncontrado = pedidosMock.find(
      (pedido) => pedido.id === id
    );
    setPedido(pedidoEncontrado);
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Editando pedido:", pedido);
    navigate("/admin/pedidos");
  };

  if (!pedido) return <p>Cargando pedido...</p>;

  return (
    <PedidoForm
      pedido={pedido}
      setPedido={setPedido}
      onSubmit={handleSubmit}
      title="Editar Pedido"
      productosDisponibles={[]}
      usuariosDisponibles={[]}
    />
  );
}
