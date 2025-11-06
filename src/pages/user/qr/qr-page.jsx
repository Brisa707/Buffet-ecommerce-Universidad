import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./qr-page.css";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { API_URL } from "@config/api";

function QRPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [qr, setQr] = useState(null);
  const [codigo, setCodigo] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${API_URL}/pedidos/${id}/qr`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.qr) {
          setQr(data.qr);
          setCodigo(data.numero_pedido || `Pedido-${id}`);
        } else {
          setError(data.mensaje || "No se pudo obtener el QR");
        }
      })
      .catch(() => setError("Error al cargar el QR"));
  }, [id]);

  return (
    <div className="qr-container">
      <div className="qr-card">
        <div className="qr-header">
          <button className="back-button" onClick={() => navigate(-1)}>
            <AiOutlineArrowLeft size={20} />
          </button>
          <h2 className="qr-titulo">Código QR</h2>
        </div>

        <div className="qr-content">
          {error && <p className="error">{error}</p>}
          {!error && qr && (
            <>
              <p>
                Este es el código QR para tu pedido <strong>{codigo}</strong>
              </p>
              <img src={qr} alt={`QR del pedido ${codigo}`} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default QRPage;
