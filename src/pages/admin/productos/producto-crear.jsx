import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductoForm from "@admincomponents/producto-form/producto-form";

export default function ProductoCrear() {
  const navigate = useNavigate();
  const [producto, setProducto] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    categoria: "",
    stock: "",
    imagen: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Creando producto:", producto);
    navigate("/admin/productos");
  };

  return (
    <ProductoForm
      producto={producto}
      setProducto={setProducto}
      onSubmit={handleSubmit}
      title="Crear Producto"
    />
  );
}

