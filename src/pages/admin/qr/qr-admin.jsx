import "./qr-admin.css";

export default function QRAdmin() {
  return (
    <div className="admin-qr-container">
      <div className="admin-qr-header">
        <h1 className="admin-qr-titulo">Escaneo de QR</h1>
        <p className="admin-qr-descripcion">
          Escaneá códigos o ingresá un código manualmente.
        </p>
      </div>

      {/* Sección del lector */}
      <div className="admin-qr-scanner-wrapper">
        <div className="admin-qr-scanner">
          {/* Aquí se mostrará la cámara o lector de QR */}
        </div>
      </div>

      {/* Input manual */}
      <form className="admin-qr-form">
        <input
          type="text"
          className="admin-qr-input"
          placeholder="Ingresar código"
        />
        <button type="submit" className="admin-qr-boton">
          Escanear / Verificar
        </button>
      </form>
    </div>
  );
}

