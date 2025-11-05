import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "@config/api";
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token"); 
      const body = {
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        precio: parseFloat(producto.precio),
        stock: parseInt(producto.stock),
        categoria: producto.categoria,
      };

      const response = await fetch(`${API_URL}/productos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.mensaje || "Error al crear producto");
      }

      const nuevoProducto = await response.json();
      console.log("Producto creado:", nuevoProducto);
      navigate("/admin/productos");
    } catch (error) {
      console.error("Error al crear producto:", error.message);
      alert(error.message);
    }
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
