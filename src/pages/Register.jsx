import { useNavigate } from "react-router-dom";
import "../styles/register.css";
import { AiOutlineArrowLeft } from "react-icons/ai"; 
import Logo from "../assets/Logo-buffet.png";

function Register() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); 
    navigate("/"); 
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
          <img
            src={Logo}
            alt="Logo buffet UNaB"
            className="register-logo"
          />
        </div>

        {/* Título */}
        <h4 className="register-title">Registrarse</h4>

        {/* Formulario */}
        <form onSubmit={handleSubmit}>
          <div className="register-input-group">
            <label>Nombre</label>
            <input type="text" placeholder="Tu nombre" required />
          </div>

          <div className="register-input-group">
            <label>Correo electrónico</label>
            <input type="email" placeholder="ejemplo@email.com" required />
          </div>

          <div className="register-input-group">
            <label>Contraseña</label>
            <input type="password" placeholder="********" required />
          </div>

          <button type="submit" className="register-btn">
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;