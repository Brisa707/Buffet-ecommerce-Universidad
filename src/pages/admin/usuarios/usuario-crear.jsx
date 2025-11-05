import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "@config/api";
import UsuarioForm from "@admincomponents/usuario-form/usuario-form";

export default function UsuarioCrear() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({
    nombre: "",
    email: "",
    rol: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token no disponible");

      const body = {
        nombre: usuario.nombre.trim(),
        email: usuario.email.trim(),
        rol: usuario.rol,
        password: usuario.password,
      };

      const res = await fetch(`${API_URL}/usuarios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.mensaje || "Error al crear usuario");
      }

      const nuevoUsuario = await res.json();
      console.log("Usuario creado:", nuevoUsuario);
      navigate("/admin/usuarios");
    } catch (error) {
      console.error("Error al crear usuario:", error.message);
      alert(error.message);
    }
  };

  return (
    <UsuarioForm
      usuario={usuario}
      setUsuario={setUsuario}
      onSubmit={handleSubmit}
      title="Crear Usuario"
    />
  );
}
