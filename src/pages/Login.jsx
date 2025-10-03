import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import Logo from "../assets/Logo-buffet.png";

function Login() {
  const navigate = useNavigate();

  // Estados para inputs, error y éxito
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");   // Limpiar mensajes anteriores
    setSuccess("");

    try {
      const response = await fetch("http://localhost:3000/api/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Login exitoso"); 
        localStorage.setItem("token", data.token);
        setTimeout(() => {
          navigate("/home");
        }, 1000); // Espera 1 segundo antes de redirigir
      } else {
        setError(data.mensaje || "Error al iniciar sesión");
      }
    } catch (err) {
      console.error(err);
      setError("Error de conexión con el servidor");
    }
  };

  const goToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Logo */}
        <div className="login-logo-container">
          <img src={Logo} alt="Logo buffet UNaB" className="login-logo" />
        </div>

        {/* Título */}
        <h4 className="login-title">Iniciar Sesión</h4>

        {/* Formulario */}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="ejemplo@email.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="********"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Mensajes */}
          {error && <p className="login-error">{error}</p>}
          {success && <p className="login-success">{success}</p>}

          <button type="submit" className="login-btn">
            Iniciar Sesión
          </button>
        </form>

        {/* Extras */}
        <div className="extras">
          <button className="forgot-password" type="button">
            ¿Olvidaste tu contraseña?
          </button>
          <button className="create-account" type="button" onClick={goToRegister}>
            Crear cuenta
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
