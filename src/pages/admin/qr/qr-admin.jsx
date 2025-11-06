import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import "./qr-admin.css";
import { API_URL } from "@config/api";


export default function QRAdmin() {
  const qrRef = useRef(null);
  const html5QrCodeRef = useRef(null);
  const [codigo, setCodigo] = useState("");
  const [resultado, setResultado] = useState("");
  const [scannerActivo, setScannerActivo] = useState(false);

  useEffect(() => {
    let isMounted = true;

    if (!qrRef.current) return;

    const html5QrCode = new Html5Qrcode(qrRef.current.id);
    html5QrCodeRef.current = html5QrCode;

    Html5Qrcode.getCameras()
      .then((devices) => {
        if (!isMounted) return;
        if (devices && devices.length) {
          const cameraId = devices[0].id;

          html5QrCode
            .start(
              cameraId,
              { fps: 10, qrbox: { width: 250, height: 250 } },
              (decodedText) => {
                setCodigo(decodedText);
                setResultado(`Código detectado: ${decodedText}`);
                html5QrCode
                  .stop()
                  .then(() => setScannerActivo(false))
                  .catch(() => {});
              },
              () => {}
            )
            .then(() => setScannerActivo(true))
            .catch((err) => {
              setResultado("Error al iniciar la cámara");
              console.error(err);
            });
        }
      })
      .catch(() => setResultado("No se detectó ninguna cámara"));

    return () => {
      isMounted = false;
      if (html5QrCodeRef.current && scannerActivo) {
        html5QrCodeRef.current.stop().catch(() => {});
      }
    };
  }, [scannerActivo]);

  const handleSubmit = (e) => {
  e.preventDefault();
  setResultado(`Verificando código: ${codigo}`);

  const token = localStorage.getItem("token");

  fetch(`${API_URL}/pedidos/verificar-entrega`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ codigo }),
  })
    .then((res) => res.json())
    .then((data) => {
      setResultado(data.mensaje || "Verificación completada");
    })
    .catch(() => {
      setResultado("Error al verificar el código");
    });
};


  return (
    <div className="admin-qr-container">
      <div className="admin-qr-header">
        <h1 className="admin-qr-titulo">Escaneo de QR</h1>
        <p className="admin-qr-descripcion">
          Escaneá códigos o ingresá un código manualmente.
        </p>
      </div>

      <div className="admin-qr-scanner-wrapper">
        <div
          id="qr-reader"
          className="admin-qr-scanner"
          ref={qrRef}
        ></div>
      </div>

      <form className="admin-qr-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="admin-qr-input"
          placeholder="Ingresar código"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
        />
        <button type="submit" className="admin-qr-boton">
          Escanear / Verificar
        </button>
      </form>

      {resultado && <p className="admin-qr-resultado">{resultado}</p>}
    </div>
  );
}
