import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "@config/api";
import UsuarioForm from "@admincomponents/usuario-form/usuario-form";

export default function UsuarioEditar() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token no disponible");

        const res = await fetch(`${API_URL}/usuarios/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          if (res.status === 401) throw new Error("No autorizado");
          throw new Error("No se pudo obtener el usuario");
        }

        const data = await res.json();
        setUsuario({ ...data, password: "" }); // inicializa password vacío
      } catch (error) {
        console.error("Error al cargar usuario:", error.message);
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuario();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const body = {
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
      };

      if (usuario.password && usuario.password.trim() !== "") {
        body.password = usuario.password;
      }

      const res = await fetch(`${API_URL}/usuarios/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.mensaje || "Error al editar usuario");
      }

      const actualizado = await res.json();
      console.log("Usuario actualizado:", actualizado);
      navigate("/admin/usuarios");
    } catch (error) {
      console.error("Error al editar usuario:", error.message);
      alert(error.message);
    }
  };

  if (loading) return <p>Cargando usuario...</p>;
  if (!usuario) return <p>Usuario no encontrado</p>;

  return (
    <UsuarioForm
      usuario={usuario}
      setUsuario={setUsuario}
      onSubmit={handleSubmit}
      title="Editar Usuario"
    />
  );
}
