import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PedidoForm from "@admincomponents/pedido-form/pedido-form";

export default function PedidoCrear() {
  const navigate = useNavigate();
  const [pedido, setPedido] = useState({
    usuario: "",
    metodoPago: "",
    estado: "pendiente",
    notas: "",
    items: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Creando pedido:", pedido);
    navigate("/admin/pedidos");
  };

  return (
    <PedidoForm
      pedido={pedido}
      setPedido={setPedido}
      onSubmit={handleSubmit}
      title="Crear Pedido"
      productosDisponibles={[]} // cargar desde API 
      usuariosDisponibles={[]} // cargar desde API
    />
  );
}

