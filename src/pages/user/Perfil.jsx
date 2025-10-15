import { useNavigate } from "react-router-dom";
import "../../styles/Perfil.css";
import { AiOutlineArrowLeft } from "react-icons/ai";

function Perfil() {
  const navigate = useNavigate();

  return (
    <>
      <div className="perfil-container">
        <div className="perfil-card">
          {/* Encabezado con flecha */}
          <div className="perfil-header">
            <button className="perfil-back" onClick={() => navigate(-1)}>
            <AiOutlineArrowLeft size={20} />
          </button>
            <h2 className="perfil-titulo">Mi Cuenta</h2>
          </div>

          <div className="perfil-info">
            <div className="perfil-input-card">
              <label>Nombre</label>
              <input type="text" placeholder="Tu nombre" />
            </div>

            <div className="perfil-input-card">
              <label>Correo electrónico</label>
              <input type="email" placeholder="correo@ejemplo.com" />
            </div>

            <div className="perfil-input-card">
              <label>Contraseña</label>
              <input type="password" placeholder="********" />
            </div>
          </div>

          <div className="perfil-actions">
            <button className="perfil-boton guardar">Guardar</button>
            <button className="perfil-boton cancelar">Cancelar</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Perfil;





