import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductoForm from "@admincomponents/producto-form/producto-form";

export default function ProductoEditar() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    // Simulación de fetch de productos
    const productosMock = [
      {
        id: "1",
        nombre: "Hamburguesa Clásica",
        descripcion: "Hamburguesa con queso, lechuga y tomate",
        precio: 10,
        categoria: "sandwiches",
        imagen: "",
        stock: 12,
      },
      {
        id: "2",
        nombre: "Sandwich de Pollo",
        descripcion: "Pollo grillado con lechuga y tomate",
        precio: 50,
        categoria: "sandwiches",
        imagen: "",
        stock: 5,
      },
    ];

    const productoEncontrado = productosMock.find(
      (producto) => producto.id === id
    );
    setProducto(productoEncontrado);
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Editando producto:", producto);
    navigate("/admin/productos");
  };

  if (!producto) return <p>Cargando producto...</p>;

  return (
    <ProductoForm
      producto={producto}
      setProducto={setProducto}
      onSubmit={handleSubmit}
      title="Editar Producto"
    />
  );
}
