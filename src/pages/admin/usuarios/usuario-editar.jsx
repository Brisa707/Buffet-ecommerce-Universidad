import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UsuarioForm from "@admincomponents/usuario-form/usuario-form";

export default function UsuarioEditar() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    // Simulación de fetch de usuarios
    const usuariosMock = [
      {
        id: "1",
        nombre: "María González",
        email: "maria.gonzalez@example.com",
        rol: "Administrador",
        activo: true,
      },
      {
        id: "2",
        nombre: "Carlos Ramírez",
        email: "carlos.ramirez@example.com",
        rol: "Empleado",
        activo: false,
      },
    ];

    const usuarioEncontrado = usuariosMock.find(
      (usuario) => usuario.id === id
    );
    setUsuario(usuarioEncontrado);
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Editando usuario:", usuario);
    navigate("/admin/usuarios");
  };

  if (!usuario) return <p>Cargando usuario...</p>;

  return (
    <UsuarioForm
      usuario={usuario}
      setUsuario={setUsuario}
      onSubmit={handleSubmit}
      title="Editar Usuario"
    />
  );
}
