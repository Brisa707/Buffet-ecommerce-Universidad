import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "@config/api";
import ProductoForm from "@admincomponents/producto-form/producto-form";

export default function ProductoEditar() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [producto, setProducto] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    categoria: "",
    activo: true,
    imagen_url: ""
  });
  const [loading, setLoading] = useState(true);

  // Traer producto por ID
  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const res = await fetch(`${API_URL}/productos/${id}`);
        if (!res.ok) throw new Error("No se pudo obtener el producto");
        const data = await res.json();

        setProducto({
          nombre: data.nombre || "",
          descripcion: data.descripcion || "",
          precio: data.precio || "",
          stock: data.stock || "",
          categoria: data.categoria || "",
          activo: data.activo ?? true,
          imagen_url: data.imagen_url || ""
        });
      } catch (error) {
        console.error("Error al cargar producto:", error.message);
        alert("Error al cargar el producto");
      } finally {
        setLoading(false);
      }
    };

    fetchProducto();
  }, [id]);

  // Guardar cambios
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      // Si hay nueva imagen seleccionada, primero subirla
      let imagen_url = producto.imagen_url;
      if (producto.imagen) {
        const formData = new FormData();
        formData.append("imagen", producto.imagen);

        const uploadRes = await fetch(`${API_URL}/upload`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });

        if (!uploadRes.ok) {
          const err = await uploadRes.json().catch(() => ({}));
          throw new Error(err.mensaje || "Error al subir imagen");
        }

        const uploadData = await uploadRes.json();
        imagen_url = uploadData.url;
      }

      const body = {
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        precio: parseFloat(producto.precio),
        stock: parseInt(producto.stock),
        categoria: producto.categoria,
        activo: producto.activo,
        imagen_url
      };

      const res = await fetch(`${API_URL}/productos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.mensaje || "Error al editar producto");
      }

      const actualizado = await res.json();
      console.log("Producto actualizado:", actualizado);
      navigate("/admin/productos");
    } catch (error) {
      console.error("Error al editar producto:", error.message);
      alert(error.message);
    }
  };

  if (loading) return <p>Cargando producto...</p>;
  if (!producto) return <p>Producto no encontrado</p>;

  return (
    <ProductoForm
      producto={producto}
      setProducto={setProducto}
      onSubmit={handleSubmit}
      title="Editar Producto"
    />
  );
}
