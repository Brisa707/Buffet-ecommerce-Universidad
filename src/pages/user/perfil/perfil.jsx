import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_URL } from "@config/api";
import "./perfil.css";
import { AiOutlineArrowLeft } from "react-icons/ai";

function Perfil() {
  const navigate = useNavigate();
  const [perfil, setPerfil] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion: ""
  });
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const res = await fetch(`${API_URL}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Error al obtener perfil");

        setPerfil(data.user);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPerfil();
  }, []);

  const handleChange = (e) => {
    setPerfil({ ...perfil, [e.target.name]: e.target.value });
  };

  const handleGuardar = async () => {
    try {
      const res = await fetch(`${API_URL}/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          nombre: perfil.nombre,
          telefono: perfil.telefono,
          direccion: perfil.direccion
        })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Error al actualizar perfil");

      setMensaje("Perfil actualizado exitosamente");
      setTimeout(() => setMensaje(""), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="perfil-container">
      <div className="perfil-card">
        <div className="perfil-header">
          <button className="perfil-back" onClick={() => navigate(-1)}>
            <AiOutlineArrowLeft size={20} />
          </button>
          <h2 className="perfil-titulo">Mi Cuenta</h2>
        </div>

        {error && <p className="error">{error}</p>}
        {mensaje && <p className="success">{mensaje}</p>}

        <div className="perfil-info">
          <div className="perfil-input-card">
            <label>Nombre</label>
            <input
              type="text"
              name="nombre"
              value={perfil.nombre}
              onChange={handleChange}
              placeholder="Tu nombre"
            />
          </div>

          <div className="perfil-input-card">
            <label>Correo electrónico</label>
            <input
              type="email"
              value={perfil.email}
              disabled
              placeholder="correo@ejemplo.com"
            />
          </div>

          <div className="perfil-input-card">
            <label>Teléfono</label>
            <input
              type="text"
              name="telefono"
              value={perfil.telefono || ""}
              onChange={handleChange}
              placeholder="Ej: 1123456789"
            />
          </div>

          <div className="perfil-input-card">
            <label>Dirección</label>
            <input
              type="text"
              name="direccion"
              value={perfil.direccion || ""}
              onChange={handleChange}
              placeholder="Ej: Av. Siempre Viva 123"
            />
          </div>
        </div>

        <div className="perfil-actions">
          <button className="perfil-boton guardar" onClick={handleGuardar}>
            Guardar
          </button>
          <button className="perfil-boton cancelar" onClick={() => navigate(-1)}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Perfil;
