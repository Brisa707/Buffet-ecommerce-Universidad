import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import Notificaciones from "@usercomponents/Notificaciones/notificaciones";

import { AiFillHome, AiOutlineClose } from "react-icons/ai";
import { FaBoxOpen, FaUserCircle } from "react-icons/fa";
import { FiShoppingBag, FiLogOut, FiMail, FiChevronDown } from "react-icons/fi";
import { MdLocalGroceryStore } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";

import Carrito from "@userpages/carrito/carrito";

const Navbar = () => {
  const [showNav, setShowNav] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [busqueda, setBusqueda] = useState("");
  const navigate = useNavigate();

  const toggleNav = () => setShowNav((prev) => !prev);
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const handleBuscar = (e) => {
    e.preventDefault();
    if (busqueda.trim()) {
      navigate(`/productos?search=${encodeURIComponent(busqueda.trim())}`);
      setShowNav(false);
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* LOGO */}
        <div className="logo">
          <NavLink to="/home">
            <img src="/Logo-buffet.png" alt="Logo buffet UNaB" />
          </NavLink>

          <div className="logo-text">
          <h2>Buffet UNaB</h2>
        </div>
      </div>

        {/* BUSCADOR */}
        <form className="search-box" onSubmit={handleBuscar}>
          <input
            type="text"
            placeholder="Buscar productos..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </form>

        {/* HAMBURGER */}
        <div className="menu-icon" onClick={toggleNav}>
          {showNav ? (
            <AiOutlineClose size={24} />
          ) : (
            <GiHamburgerMenu size={24} />
          )}
        </div>

        {/* CARRITO MOBILE */}
        <div className="cart-icon mobile-cart">
          <NavLink to="/carrito" onClick={() => setShowNav(false)}>
            <MdLocalGroceryStore className="nav-icon-cart" />
          </NavLink>

          <div className="mobile-icon">
            <Notificaciones />
          </div>
        </div>

        {/* NAV LINKS MOBILE */}
        <div className={`nav-elements ${showNav ? "active" : ""}`}>
          <ul>
            <li>
              <NavLink to="/home" onClick={() => setShowNav(false)}>
                <AiFillHome className="nav-icon" /> Inicio
              </NavLink>
            </li>
            <li>
              <NavLink to="/productos" onClick={() => setShowNav(false)}>
                <FaBoxOpen className="nav-icon" /> Productos
              </NavLink>
            </li>
            <li>
              <NavLink to="/contacto" onClick={() => setShowNav(false)}>
                <FiMail className="nav-icon" /> Contacto
              </NavLink>
            </li>
            <li>
              <NavLink to="/pedidos" onClick={() => setShowNav(false)}>
                <FiShoppingBag className="nav-icon" /> Mis pedidos
              </NavLink>
            </li>
            <li>
              <NavLink to="/perfil" onClick={() => setShowNav(false)}>
                <FaUserCircle className="nav-icon" /> Mi cuenta
              </NavLink>
            </li>
            <li>
              <NavLink to="/" onClick={() => setShowNav(false)}>
                <FiLogOut className="nav-icon" /> Cerrar Sesión
              </NavLink>
            </li>
          </ul>
        </div>

        {/* DESKTOP LINKS */}
        <div className="desktop-nav">
          <ul className="right-links">
            <li>
              <NavLink to="/home">Inicio</NavLink>
            </li>
            <li>
              <NavLink to="/productos">Productos</NavLink>
            </li>
            <li>
              <NavLink to="/contacto">Contacto</NavLink>
            </li>
          </ul>
          <ul className="right-icons">
            {/* Carrito Desktop */}
            <li onClick={() => setIsCartOpen((prev) => !prev)}>
              <MdLocalGroceryStore className="nav-icon-cart" />
            </li>

            {/* Notificaciones */}
            <li>
              <Notificaciones />
            </li>

            <li
              className={`profile-desktop ${dropdownOpen ? "active" : ""}`}
              onClick={toggleDropdown}
            >
              <FaUserCircle className="nav-icon" />
              <FiChevronDown className="dropdown-arrow" />
              {dropdownOpen && (
                <ul className="dropdown">
                  <li>
                    <NavLink to="/pedidos">
                      <FiShoppingBag className="nav-icon" /> Mis pedidos
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/perfil">
                      <FaUserCircle className="nav-icon" /> Mi cuenta
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/">
                      <FiLogOut className="nav-icon" /> Cerrar sesión
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      </div>

      {/* Carrito Desktop */}
      {isCartOpen && <Carrito onClose={() => setIsCartOpen(false)} />}
    </nav>
  );
};

export default Navbar;