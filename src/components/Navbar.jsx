import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

import { AiFillHome } from "react-icons/ai";
import { FaBoxOpen, FaUserCircle } from "react-icons/fa";
import { FiShoppingBag, FiLogOut, FiChevronDown } from "react-icons/fi";
import { MdLocalGroceryStore } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiMail } from "react-icons/fi";

const Navbar = () => {
  const [showNav, setShowNav] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleNav = () => setShowNav((prev) => !prev);
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* LOGO */}
        <div className="logo">
          <img src="/Logo-buffet.png" alt="Logo buffet UNaB" className="logo" />
        </div>

        {/* BUSCADOR */}
        <div className="search-box">
          <input type="text" placeholder="Buscar..." />
        </div>

        {/* DERECHA (MOBILE) */}
        <div className="nav-right">
          {/* CARRITO */}
          <div className="cart-icon">
            <NavLink to="/carrito" onClick={() => setShowNav(false)}>
              <MdLocalGroceryStore className="nav-icon-cart" />
            </NavLink>
          </div>

          {/* HAMBURGER */}
          <div className="menu-icon" onClick={toggleNav}>
            {showNav ? <AiOutlineClose size={24} /> : <GiHamburgerMenu size={24} />}
          </div>
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
            <li>
              <NavLink to="/carrito" className={({ isActive }) => (isActive ? "active" : "")}>
                <MdLocalGroceryStore className="nav-icon-cart" />
              </NavLink>
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

      {/* SIDEBAR MENU (MOBILE) */}
      <div className={`nav-sidebar ${showNav ? "active" : ""}`}>
        <ul>
          <li>
            <NavLink to="/home" onClick={toggleNav}>
              <AiFillHome className="nav-icon" /> Inicio
            </NavLink>
          </li>
          <li>
            <NavLink to="/productos" onClick={toggleNav}>
              <FaBoxOpen className="nav-icon" /> Productos
            </NavLink>
          </li>
          <li>
            <NavLink to="/contacto" onClick={toggleNav}>
              <FiMail className="nav-icon" /> Contacto
            </NavLink>
          </li>
          <li>
            <NavLink to="/pedidos" onClick={toggleNav}>
              <FiShoppingBag className="nav-icon" /> Mis pedidos
            </NavLink>
          </li>
          <li>
            <NavLink to="/perfil" onClick={toggleNav}>
              <FaUserCircle className="nav-icon" /> Mi cuenta
            </NavLink>
          </li>
          <li>
            <NavLink to="/" onClick={toggleNav}>
              <FiLogOut className="nav-icon" /> Cerrar sesión
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
