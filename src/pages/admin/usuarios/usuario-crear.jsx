import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UsuarioForm from "@admincomponents/usuario-form/usuario-form";

export default function UsuarioCrear() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({
    nombre: "",
    email: "",
    rol: "",
    activo: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Creando usuario:", usuario);
    navigate("/admin/usuarios");
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

