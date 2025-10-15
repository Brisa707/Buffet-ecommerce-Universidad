import React from "react";
import "../../styles/Contacto.css";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { FaWhatsapp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Contacto = () => {
    const phoneNumber = "5491112345678";
    const navigate = useNavigate();

    return (
        <>
            <main className="contact-container">
                <div className="contact-header">
                    <button
                        className="back-button"
                        type="button"
                        onClick={() => navigate(-1)}
                    >
                        <AiOutlineArrowLeft size={20} />
                    </button>
                    <h2>Contacto</h2>
                </div>

                <div className="whatsapp-wrapper">
                    <a
                        href={`https://wa.me/${phoneNumber}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="whatsapp-button"
                        title="Abrir chat de WhatsApp"
                    >
                        <FaWhatsapp size={20} style={{ marginRight: "8px" }} />
                        Contactar por WhatsApp
                    </a>
                </div>


                <section className="hours">
                    <h3>Horarios de Atención</h3>
                    <p>Lunes a Viernes: 08:00 – 22:00</p>
                    <p>Sábados: 09:00 – 14:00</p>
                </section>

                <section className="address">
                    <h3>Ubicación</h3>
                    <p>Blas Parera 132, Burzaco</p>

                    <iframe
                        title="Ubicación Universidad Nacional Guillermo Brown"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52413.76922194109!2d-58.416575322294555!3d-34.80944940629944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcd5aebf3ce8ad%3A0x61e0dc504088584!2sUniversidad%20Nacional%20Guillermo%20Brown%20(UNAB)!5e0!3m2!1ses-419!2sar!4v1759077352277!5m2!1ses-419!2sar"
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </section>
            </main>
        </>
    );
};

export default Contacto;
