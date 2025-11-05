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
    password: ""
  });
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const res = await fetch(`${API_URL}/usuarios/perfil`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.mensaje || "Error al obtener perfil");

        setPerfil({ ...data, password: "" });
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
      const body = {
        nombre: perfil.nombre,
        email: perfil.email
      };

      if (perfil.password && perfil.password.trim() !== "") {
        body.password = perfil.password;
      }

      const res = await fetch(`${API_URL}/usuarios/perfil`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.mensaje || "Error al actualizar perfil");

      setMensaje("Perfil actualizado exitosamente");
      setTimeout(() => setMensaje(""), 3000);

      const usuario = JSON.parse(localStorage.getItem("usuario"));
      localStorage.setItem("usuario", JSON.stringify({ ...usuario, nombre: perfil.nombre }));
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
              name="email"
              value={perfil.email}
              disabled
              placeholder="correo@ejemplo.com"
            />
          </div>

          <div className="perfil-input-card">
            <label>Contraseña nueva</label>
            <input
              type="password"
              name="password"
              value={perfil.password}
              onChange={handleChange}
              placeholder="********"
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
