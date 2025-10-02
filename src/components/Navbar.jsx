import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

import { AiFillHome, AiOutlineClose } from "react-icons/ai";
import { FaBoxOpen, FaUserCircle } from "react-icons/fa";
import { FiShoppingBag, FiLogOut, FiMail, FiChevronDown } from "react-icons/fi";
import { MdLocalGroceryStore } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";

import Carrito from "../pages/Carrito"; // 👈 Import del carrito

const Navbar = () => {
  const [showNav, setShowNav] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Estado carrito (solo desktop)
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleNav = () => setShowNav((prev) => !prev);
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* LOGO */}
        <div className="logo">
          <a href="http://localhost:5173/home">
            <img src="/Logo-buffet.png" alt="Logo buffet UNaB" />
          </a>
        </div>


        {/* BUSCADOR */}
        <div className="search-box">
          <input type="text" placeholder=" Buscar..." />
        </div>

        {/* HAMBURGER */}
        <div className="menu-icon" onClick={toggleNav}>
          {showNav ? <AiOutlineClose size={24} /> : <GiHamburgerMenu size={24} />}
        </div>

        {/* CARRITO MOBILE (redirige a /carrito) */}
        <div className="cart-icon mobile-cart">
          <NavLink to="/carrito" onClick={() => setShowNav(false)}>
            <MdLocalGroceryStore className="nav-icon-cart" />
          </NavLink>
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
              <NavLink to="/home" className={({ isActive }) => (isActive ? "active" : "")}>
                Inicio
              </NavLink>
            </li>
            <li>
              <NavLink to="/productos" className={({ isActive }) => (isActive ? "active" : "")}>
                Productos
              </NavLink>
            </li>
            <li>
              <NavLink to="/contacto" className={({ isActive }) => (isActive ? "active" : "")}>
                Contacto
              </NavLink>
            </li>
          </ul>
          <ul className="right-icons">
            {/* Carrito Desktop:*/}
            <li onClick={() => setIsCartOpen((prev) => !prev)}>
              <MdLocalGroceryStore className="nav-icon-cart" />
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
                    <NavLink to="/pedidos" className={({ isActive }) => (isActive ? "active" : "")}>
                      <FiShoppingBag className="nav-icon" /> Mis pedidos
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/perfil" className={({ isActive }) => (isActive ? "active" : "")}>
                      <FaUserCircle className="nav-icon" /> Mi cuenta
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
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
