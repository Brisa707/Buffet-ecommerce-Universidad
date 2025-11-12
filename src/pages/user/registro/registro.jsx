import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./registro.css";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Logo from "@assets/Logo-buffet.png";
import { API_URL } from "@config/api";

function Register() {
  const navigate = useNavigate();

  // Estados para los inputs, error y éxito
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch(`${API_URL}/usuarios/registro`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Usuario registrado correctamente"); 
        setTimeout(() => {
          navigate("/"); // Redirigir a login después de 1 segundo
        }, 1000);
      } else {
        setError(data.mensaje || "Error al registrar usuario");
      }
    } catch (err) {
      console.error(err);
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        {/* Flecha de volver atrás */}
        <button 
          className="back-button" 
          type="button" 
          onClick={() => navigate(-1)}
        >
          <AiOutlineArrowLeft size={20} />
        </button>

        {/* Logo */}
        <div className="register-logo-container">
          <img src={Logo} alt="Logo buffet UNaB" className="register-logo" />
        </div>

        {/* Título */}
        <h4 className="register-title">Registrarse</h4>

        {/* Formulario */}
        <form onSubmit={handleSubmit}>
          <div className="register-input-group">
            <label>Nombre</label>
            <input
              type="text"
              placeholder="Tu nombre"
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <div className="register-input-group">
            <label>Correo electrónico</label>
            <input
              type="email"
              placeholder="ejemplo@email.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="register-input-group">
            <label>Contraseña</label>
            <input
              type="password"
              placeholder="********"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Mensajes */}
          {error && <p className="register-error">{error}</p>}
          {success && <p className="register-success">{success}</p>}

          <button type="submit" className="register-btn">
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
