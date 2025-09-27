import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import Logo from "../assets/Logo-buffet.png";

function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/home");
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
            />
          </div>

          <button type="submit" className="login-btn">
            Iniciar Sesión
          </button>
        </form>

        {/* Extras */}
        <div className="extras">
          <button
            className="forgot-password"
            type="button"
          >
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